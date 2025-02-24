import { RequestHandler } from "express";
import { AuthenticatedRequest, AuthenticatedUserJWT } from "../../types/auth";
import pool from "../../utils/db";
import { WISHLIST_QUERIES } from "../../queries/user";

const {
  GET_ALL_WISHLIST_PRODUCTS,
  GET_WISHLIST_PRODUCT_BY_ID,
  ADD_PRODUCT_TO_WISHLIST,
  DELETE_PRODUCT_FROM_WISHLIST,
} = WISHLIST_QUERIES;

export const getAllWishlistedProducts: RequestHandler = async (
  request: AuthenticatedRequest,
  response
) => {
  const { id } = request.user as AuthenticatedUserJWT;

  try {
    const queryResult = await pool.query(GET_ALL_WISHLIST_PRODUCTS, [id]);
    const data = queryResult.rows;

    if (data.length == 0) response.sendStatus(404);
    else response.status(200).json({ products: data, length: data.length });
  } catch (error) {
    response.status(500).send({ error: "Error Fetching Wishlist Data" });
  }
};

export const addProductToWishlist: RequestHandler = async (
  request: AuthenticatedRequest,
  response
) => {
  const { id } = request.user as AuthenticatedUserJWT;
  const { productId } = request.body;

  if (!productId) {
    response.status(400).send({ error: "Product ID is required!" });
    return;
  }

  try {
    await pool.query(ADD_PRODUCT_TO_WISHLIST, [id, productId]);
    response.sendStatus(201);
  } catch (error) {
    response.status(500).send({ error: "Error Adding Product to Wishlist" });
  }
};

export const deleteProductFromWishlist: RequestHandler = async (
  request: AuthenticatedRequest,
  response
) => {
  const { id } = request.user as AuthenticatedUserJWT;
  const { productId } = request.body;

  if (!productId) {
    response.status(400).send({ error: "Product ID is required!" });
    return;
  }

  try {
    const queryResult = await pool.query(GET_WISHLIST_PRODUCT_BY_ID, [
      id,
      productId,
    ]);
    const data = queryResult.rows;

    if (data.length == 0) {
      response.status(400).json({ error: "Product not found in the wishlist" });
      return;
    }

    await pool.query(DELETE_PRODUCT_FROM_WISHLIST, [id, productId]);
    response.sendStatus(204);
  } catch (error) {
    response
      .status(500)
      .send({ error: "Error Deleting Product from Wishlist" });
  }
};
