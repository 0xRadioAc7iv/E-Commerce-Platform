import { Request, Response } from "express";
import pool from "../db";
import { hashText } from "../lib/hashing";
import { sendEmail } from "../lib/emails";

type RegisterRequestBody = {
  email: string;
  password: string;
};

type User = {
  id: number;
  email: string;
};

export const registerNewUser = async (request: Request, response: Response) => {
  const { email, password }: RegisterRequestBody = request.body;

  if (!email || !password) {
    response.status(400).send("Email and password are required.");
    return;
  }

  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    if (result.rows.length > 0) {
      response
        .status(400)
        .send("Email already in use. Please use a different email.");
      return;
    }
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO users (email, password) VALUES ($1, $2)`,
      [email, hashText(password)]
    );

    response.status(201).send(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};

export const loginUser = (request: Request, response: Response) => {
  if (request.user) {
    response.status(200).json({
      message: "Login successful",
      userId: (request.user as User).id,
    });
  } else {
    response.status(500).json({ message: "Something went wrong" });
  }
};

export const logoutUser = (request: Request, response: Response) => {
  if (request.user) {
    request.session.destroy((err) => {
      if (err) {
        return response.status(500).send("Failed to log out.");
      }
      response.status(200).send({ msg: "Successfully logged out." });
    });
  } else {
    response.status(200).send({ msg: "Already logged out!" });
  }
};

export const requestPasswordReset = async (
  request: Request,
  response: Response
) => {
  const {
    body: { email },
  } = request;

  if (!email) {
    response
      .status(400)
      .send({ msg: "Email is required to reset the password" });
    return;
  }

  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      response.status(400).send("User with the given email does not exist");
      return;
    }
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
    return;
  }

  // Generate OTP and it's expiration time (valid for 10 mins)
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  try {
    await pool.query(
      `UPDATE users
       SET reset_token = $1, reset_token_expires = $2
       WHERE email = $3`,
      [otp, otpExpires, email]
    );
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
    return;
  }

  await sendEmail(email, "Your Password Reset Code", `Your OTP is: ${otp}`);
  response.sendStatus(200);
};

export const resetPassword = async (request: Request, response: Response) => {
  const {
    body: { email, otp, newPassword },
  } = request;

  const result = await pool.query(
    `SELECT * FROM users
     WHERE email = $1 AND reset_token = $2 AND reset_token_expires > NOW()`,
    [email, otp]
  );

  const user = result.rows[0];
  if (!user) {
    response.status(400).send({ msg: "Given OTP is expired" });
    return;
  }

  const hashedPassword = hashText(newPassword);

  await pool.query(
    `UPDATE users
     SET password = $1, reset_token = NULL, reset_token_expires = NULL
     WHERE email = $2`,
    [hashedPassword, email]
  );

  await sendEmail(
    email,
    "Password Reset Successful",
    "Your password has been updated."
  );

  response.sendStatus(200);
};
