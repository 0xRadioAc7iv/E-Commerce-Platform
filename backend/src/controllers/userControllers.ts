import { Request, Response } from "express";
import pool from "../db";
import { Session } from "express-session";

interface UserSession extends Session {
  passport: {
    user: number;
  };
}

export const getOrderHistory = async (request: Request, response: Response) => {
  const {
    passport: { user },
  } = request.session as UserSession;

  try {
    const result = await pool.query(
      `SELECT * FROM user_orders WHERE user_id = ${user}`
    );
    const data = result.rows;

    response.status(200).send(data);
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};

export const getUserCart = async (request: Request, response: Response) => {
  const {
    passport: { user },
  } = request.session as UserSession;

  try {
    const result = await pool.query(
      `SELECT * FROM shopping_cart WHERE user_id = ${user}`
    );
    const data = result.rows;

    response.status(200).send(data);
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};

export const addToCart = async (request: Request, response: Response) => {};

export const editCart = async (request: Request, response: Response) => {};

export const removeFromCart = async (
  request: Request,
  response: Response
) => {};

export const getUserWishlist = async (request: Request, response: Response) => {
  const {
    passport: { user },
  } = request.session as UserSession;

  try {
    const result = await pool.query(
      `SELECT * FROM wishlist WHERE user_id = ${user}`
    );
    const data = result.rows;

    response.status(200).send(data);
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};

export const addToWishlist = async (request: Request, response: Response) => {};

export const editWishlist = async (request: Request, response: Response) => {};

export const removeFromWishlist = async (
  request: Request,
  response: Response
) => {};
