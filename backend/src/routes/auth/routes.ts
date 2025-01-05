import { Router } from "express";
import pool from "../../utils/db";
import { hashPassword } from "../../utils/password";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { generateJsonWebToken } from "../../utils/auth";
import { AuthenticatedRequest } from "../../types/auth";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/signup", async (request, response) => {
  const { email, username, password } = request.body;

  if (!email || !username || !password) {
    response
      .status(400)
      .json({ message: "Email, Username and password are required" });
    return;
  }

  try {
    const queryResult = await pool.query(
      `SELECT username, email FROM users WHERE username = $1 OR email = $2`,
      [username, email]
    );

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
    await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
      [username, email, hashedPassword]
    );

    response.sendStatus(201);
  } catch (error) {
    response.sendStatus(500);
  }
});

router.post("/signin", async (request, response) => {
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
    const queryResult = await pool.query(
      `SELECT user_id, username, email, password FROM users WHERE username = $1 OR email = $2`,
      [username || null, email || null]
    );

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

    await pool.query(
      `INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)`,
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
  const refreshToken = request.cookies["refresh"];

  if (!refreshToken) {
    response.status(400).json({ message: "Refresh token is required" });
    return;
  }

  try {
    const queryResult = await pool.query(
      `SELECT user_id FROM refresh_tokens WHERE token = $1`,
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
});

router.post("/logout", authMiddleware, async (request, response) => {
  const refreshToken = request.cookies["refresh"];

  if (!refreshToken) {
    response.status(400).json({ message: "Refresh token is required" });
    return;
  }

  try {
    await pool.query(`DELETE FROM refresh_tokens WHERE token = $1`, [
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

    console.log(user);

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
