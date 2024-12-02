import { Request, Response } from "express";
import pool from "../db";

export const getRecommendedProducts = async (
  request: Request,
  response: Response
) => {
  try {
    const result = await pool.query("SELECT * FROM products;");
    const data = result.rows;
    response.status(200).send(data);
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};

export const getFilteredProducts = async (
  request: Request,
  response: Response
) => {
  try {
    const { title, price, category } = request.query;

    let query = "SELECT * FROM products WHERE 1=1";
    const params: any[] = [];

    if (title) {
      params.push(`%${title}%`);
      query += ` AND title ILIKE $${params.length}`;
    }

    if (price) {
      params.push(price);
      query += ` AND price <= $${params.length}`;
    }

    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    const result = await pool.query(query, params);
    response.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    response.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (request: Request, response: Response) => {
  const { id } = request.params;

  if (!id) {
    response.status(400).send({ msg: "Product ID is required!" });
    return;
  }

  try {
    const result = await pool.query(`SELECT * FROM products WHERE id = ${id};`);
    const data = result.rows;

    if (data.length > 0) {
      response.status(200).send(data);
      return;
    }

    response.status(404).send({ msg: "Product with given ID does not exist!" });
  } catch (error) {
    console.error("Database error:", error);
    response.status(500).send("Internal server error");
  }
};
