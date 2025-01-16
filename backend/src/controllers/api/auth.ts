import { RequestHandler } from "express";
import pool from "../../utils/db";
import { hashPassword } from "../../utils/password";
import { compare } from "bcrypt";
import { generateJsonWebToken } from "../../utils/auth";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest, AuthenticatedUserJWT } from "../../types/auth";
import validator from "validator";
import {
  USER_QUERIES,
  TOKEN_QUERIES,
  PASSWORD_RESET_QUERIES,
} from "../../queries/auth";
import { sendEmail } from "../../utils/mail";

const {
  GET_USERS_BY_USERNAME_OR_EMAIL,
  GET_USER_BY_USERNAME_OR_EMAIL,
  GET_USER_EMAIL,
  CREATE_NEW_USER,
  DELETE_REFRESH_TOKEN,
  DELETE_ALL_REFRESH_TOKENS,
  DELETE_USER_ACCOUNT,
} = USER_QUERIES;

const { CREATE_NEW_REFRESH_TOKEN, GET_USER_BY_REFRESH_TOKEN } = TOKEN_QUERIES;

const {
  SET_PASSWORD_RESET_OTP,
  GET_PASSWORD_RESET_OTP,
  RESET_PASSWORD_AND_CLEAR_OTP,
} = PASSWORD_RESET_QUERIES;

export const signupController: RequestHandler = async (request, response) => {
  const { email, username, password } = request.body;

  if (!email || !username || !password) {
    response
      .status(400)
      .json({ message: "Email, Username and password are required" });
    return;
  }

  if (!validator.isEmail(email)) {
    response.status(400).json({ message: "Invalid email format." });
    return;
  }

  if (!/^[a-zA-Z0-9_]{3,26}$/.test(username)) {
    response.status(400).json({
      message:
        "Username must be 3-26 characters long and contain only letters, numbers, and underscores.",
    });
    return;
  }

  if (password.length < 8) {
    response
      .status(400)
      .json({ message: "Password must be of at least 8 characters." });
    return;
  }

  try {
    const queryResult = await pool.query(GET_USERS_BY_USERNAME_OR_EMAIL, [
      username,
      email,
    ]);

    if (queryResult.rows.length > 0) {
      const existingUser = queryResult.rows[0];
      if (existingUser.email === email) {
        response.status(409).json({ message: "Email is already in use!" });
      } else if (existingUser.username === username) {
        response.status(409).json({ message: "Username is already taken!" });
      }
      return;
    }

    const hashedPassword = await hashPassword(password);
    await pool.query(CREATE_NEW_USER, [username, email, hashedPassword]);
    response.sendStatus(201);
  } catch (error) {
    response.sendStatus(500);
  }
};

export const signinController: RequestHandler = async (request, response) => {
  const { email, username, password } = request.body;

  if (!email && !username) {
    response.status(400).json({ message: "Email/Username is required" });
    return;
  }

  if (!password) {
    response.status(400).json({ message: "Password is required" });
    return;
  }

  try {
    const queryResult = await pool.query(GET_USER_BY_USERNAME_OR_EMAIL, [
      username || null,
      email || null,
    ]);

    if (queryResult.rows.length == 0) {
      response.status(401).json({ message: "Invalid Email/Username" });
      return;
    }

    const user = queryResult.rows[0];
    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      response.status(401).json({ message: "Invalid Password" });
      return;
    }

    const payload = { id: user.user_id, email: user.email };
    const accessToken = generateJsonWebToken({ user: payload, isAccess: true });
    const refreshToken = generateJsonWebToken({
      user: payload,
      isAccess: false,
    });

    await pool.query(CREATE_NEW_REFRESH_TOKEN, [user.user_id, refreshToken]);

    response
      .cookie("access", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refresh", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .sendStatus(200);
  } catch (error) {
    response.sendStatus(500);
  }
};

export const refreshAccessTokenController: RequestHandler = async (
  request,
  response
) => {
  const refreshToken = request.cookies["refresh"];

  if (!refreshToken) {
    response.status(400).json({ message: "Refresh token is required" });
    return;
  }

  try {
    const queryResult = await pool.query(GET_USER_BY_REFRESH_TOKEN, [
      refreshToken,
    ]);

    if (queryResult.rows.length === 0) {
      response.status(403).json({ message: "Invalid refresh token" });
      return;
    }

    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          response.status(403).json({ message: "Invalid refresh token" });
          return;
        }

        const newAccessToken = jwt.sign(
          { id: decoded.id, email: decoded.email },
          process.env.JWT_ACCESS_TOKEN_SECRET as string,
          { expiresIn: "15m" }
        );

        response
          .cookie("access", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
          })
          .sendStatus(200);
      }
    );
  } catch (error) {
    response.sendStatus(500);
  }
};

export const logoutController: RequestHandler = async (request, response) => {
  const refreshToken = request.cookies["refresh"];

  if (!refreshToken) {
    response.status(400);
    return;
  }

  try {
    await pool.query(DELETE_REFRESH_TOKEN, [refreshToken]);
    response.clearCookie("access").clearCookie("refresh").sendStatus(204);
  } catch (error) {
    response.sendStatus(500);
  }
};

export const logoutAllController: RequestHandler = async (
  request: AuthenticatedRequest,
  response
) => {
  const { id } = request.user as AuthenticatedUserJWT;

  if (!id) {
    response.status(400).json({ message: "User ID required" });
    return;
  }

  try {
    await pool.query(DELETE_ALL_REFRESH_TOKENS, [id]);
    response.clearCookie("access").clearCookie("refresh").sendStatus(204);
  } catch (error) {
    response.sendStatus(500);
  }
};

export const requestPasswordResetController: RequestHandler = async (
  request,
  response
) => {
  const { email } = request.body;

  if (!email) {
    response.status(400).json({ message: "Email is required." });
    return;
  }

  try {
    const queryResult = await pool.query(GET_USER_EMAIL, [email]);

    if (queryResult.rows.length === 0) {
      response
        .status(200)
        .json({ message: "If the email exists, an OTP will be sent." });
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await hashPassword(otp);
    const expiration = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(SET_PASSWORD_RESET_OTP, [email, hashedOtp, expiration]);
    await sendEmail(email, "Password Reset OTP", `Your OTP is: ${otp}`);

    response
      .status(200)
      .json({ message: "If the email exists, an OTP will be sent." });
  } catch (error) {
    response.status(500).json({ message: "Internal server error." });
  }
};

export const resetPasswordController: RequestHandler = async (
  request,
  response
) => {
  const { email, otp, newPassword } = request.body;

  if (!email || !otp || !newPassword) {
    response
      .status(400)
      .json({ message: "Email, OTP, and new password are required." });
    return;
  }

  if (newPassword.length < 8) {
    response
      .status(400)
      .json({ message: "Password must be at least 8 characters long." });
    return;
  }

  try {
    const queryResult = await pool.query(GET_PASSWORD_RESET_OTP, [email]);

    if (queryResult.rows.length === 0) {
      response.status(400).json({ message: "Invalid or expired OTP." });
      return;
    }

    const data = queryResult.rows[0];
    const isOtpValid = await compare(otp, data.otp);

    if (!isOtpValid || new Date(data.otp_expiry) < new Date()) {
      response.status(400).json({ message: "Invalid or expired OTP." });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);
    await pool.query(RESET_PASSWORD_AND_CLEAR_OTP, [hashedPassword, email]);
    await sendEmail(
      email,
      "Password Reset Successful",
      "Your Password is reset successfully."
    );

    response
      .status(200)
      .json({ message: "Password has been reset successfully." });
  } catch (error) {
    response.status(500).json({ message: "Internal server error." });
  }
};

export const deleteAccountController: RequestHandler = async (
  request: AuthenticatedRequest,
  response
) => {
  const { id } = request.user as AuthenticatedUserJWT;

  if (!id) {
    response.sendStatus(400);
    return;
  }

  try {
    await pool.query(DELETE_USER_ACCOUNT, [id]);
    response.clearCookie("access").clearCookie("refresh").sendStatus(204);
  } catch (error) {
    response.sendStatus(500);
  }
};
