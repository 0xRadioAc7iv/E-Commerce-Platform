import { Request, Response } from "express";
import pool from "../db";

type Product = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
};

type OrderStatus = "pending" | "shipped" | "delivered";

type Order = {};

export const getAllProducts = async (request: Request, response: Response) => {
  try {
    const result = await pool.query("SELECT * FROM products;");
    const data = result.rows;
    response.status(200).send(data);
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};

export const createNewProduct = async (
  request: Request,
  response: Response
) => {
  const { title, price, description, category, image, rating }: Product =
    request.body;

  if (!title || !price || !description || !category || !image || !rating) {
    response.status(400).send({ msg: "Enter all the Product details!" });
    return;
  }

  try {
    await pool.query(
      "INSERT INTO products (title, price, description, category, image, rating) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, price, description, category, image, rating]
    );
    response.status(201).send({ msg: "Product created Successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};

export const editProductDetails = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  const { title, price, description, category, image, rating }: Product =
    request.body;

  if (!id) {
    response.status(400).send({ msg: "Product ID is required!" });
    return;
  }

  try {
    const result = await pool.query("SELECT * FROM PRODUCTS WHERE id = $1", [
      id,
    ]);
    const data = result.rows;

    if (data.length === 0) {
      response
        .status(404)
        .send({ msg: "Product with given ID does not exist!" });
      return;
    }
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }

  if (!title || !price || !description || !category || !image || !rating) {
    response.status(400).send({ msg: "Enter all the Product details!" });
    return;
  }

  try {
    await pool.query(
      "UPDATE products SET title = $2, price = $3, description = $4, category = $5, image = $6, rating = $7 WHERE id = $1;",
      [id, title, price, description, category, image, rating]
    );
    response.status(201).send({ msg: "Product edited Successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};

export const deleteProduct = async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!id) {
    response.status(400).send({ msg: "Product ID is required!" });
    return;
  }

  try {
    const result = await pool.query("SELECT * FROM PRODUCTS WHERE id = $1", [
      id,
    ]);
    const data = result.rows;

    if (data.length === 0) {
      response
        .status(404)
        .send({ msg: "Product with given ID does not exist!" });
      return;
    }
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }

  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    response.status(201).send({ msg: "Product deleted Successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};

export const getAllOrders = async (request: Request, response: Response) => {
  try {
    const result = await pool.query("SELECT * FROM orders;");
    const data = result.rows;
    response.status(200).send(data);
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};

export const editOrderStatus = (request: Request, response: Response) => {
  response.sendStatus(200);
};
