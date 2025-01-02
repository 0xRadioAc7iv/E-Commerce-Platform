import { Router } from "express";
import pool from "../../db";
import { hashPassword } from "../../utils/password";

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
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (queryResult.rows.length > 0) {
      response.sendStatus(409).json({ message: "Email is already in use!" });
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
  const {
    body: { email, password },
  } = request;

  if (!email || !password) {
    response.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const queryResult = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (queryResult.rows.length > 0) {
      response.sendStatus(200);
      return;
    }

    response.sendStatus(401).json({ message: "Email not registered" });
  } catch (error) {
    response.sendStatus(500);
  }
});

export default router;
