import { Router } from "express";
import pool from "../../utils/db";
import { hashPassword } from "../../utils/password";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/auth";
import { AuthenticatedRequest } from "../../types/auth";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/signup", async (request, response) => {
  const {
    body: { email, password },
  } = request;

  if (!email || !password) {
    response.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const queryResult = await pool.query(
      `SELECT email FROM users WHERE email = $1`,
      [email]
    );

    if (queryResult.rows.length > 0) {
      response.status(409).json({ message: "Email is already in use!" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    await pool.query(`INSERT INTO users (email, password) VALUES ($1, $2)`, [
      email,
      hashedPassword,
    ]);

    response.sendStatus(201);
  } catch (error) {
    response.sendStatus(500);
  }
});

router.post("/signin", async (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    response.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const queryResult = await pool.query(
      `SELECT user_id, email, password FROM users WHERE email = $1`,
      [email]
    );

    if (queryResult.rows.length == 0) {
      response.status(401).json({ message: "Email not registered" });
      return;
    }

    const user = queryResult.rows[0];
    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      response.status(401).json({ message: "Invalid Email or Password" });
      return;
    }

    const payload = { id: user.user_id, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await pool.query(
      `INSERT INTO refresh_tokens (user_id, tokens) VALUES ($1, $2)`,
      [user.user_id, refreshToken]
    );

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
});

router.post("/token", async (request, response) => {
  const { refreshToken } = request.cookies;

  if (!refreshToken) {
    response.status(400).json({ message: "Refresh token required" });
    return;
  }

  try {
    const queryResult = await pool.query(
      `SELECT user_id FROM refresh_tokens WHERE tokens = $1`,
      [refreshToken]
    );

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

        response.status(200).json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    response.sendStatus(500);
  }
});

router.post("/logout", authMiddleware, async (request, response) => {
  const refreshToken = request.cookies["refresh"];

  if (!refreshToken) {
    response.status(400).json({ message: "Refresh token required" });
    return;
  }

  try {
    await pool.query(`DELETE FROM refresh_tokens WHERE tokens = $1`, [
      refreshToken,
    ]);
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(500);
  }
});

router.post(
  "/logout/all",
  authMiddleware,
  async (request: AuthenticatedRequest, response) => {
    const user = request.user;

    if (!user) {
      response.status(400).json({ message: "User ID required" });
      return;
    }

    try {
      await pool.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [user]);
      response.sendStatus(204);
    } catch (error) {
      response.sendStatus(500);
    }
  }
);

export default router;
