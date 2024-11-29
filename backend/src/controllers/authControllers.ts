import { Request, Response } from "express";
import pool from "../db";
import { hashPassword } from "../lib/passwordHelpers";

type RegisterRequestBody = {
  email: string;
  password: string;
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
      [email, hashPassword(password)]
    );

    response.status(201).send(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};

export const loginUser = (request: Request, response: Response) => {
  response.sendStatus(200);
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

export const status = (request: Request, response: Response) => {
  request.user
    ? response.status(200).send({ user: request.user })
    : response.sendStatus(401);
};
