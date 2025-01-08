import { RequestHandler } from "express";
import { CART_QUERIES } from "../queries/user";
import { AuthenticatedRequest, AuthenticatedUserJWT } from "../types/auth";
import pool from "../utils/db";

const {
  GET_ALL_CART_PRODUCTS,
  GET_CART_PRODUCT_BY_ID,
  ADD_PRODUCT_TO_CART,
  UPDATE_PRODUCT_QUANTITY_TO_CART,
  DELETE_PRODUCT_FROM_CART,
} = CART_QUERIES;

export const getAllCartItemsController: RequestHandler = async (
  request: AuthenticatedRequest,
  response
) => {
  const { id } = request.user as AuthenticatedUserJWT;

  try {
    const queryResult = await pool.query(GET_ALL_CART_PRODUCTS, [id]);
    const data = queryResult.rows;

    if (data.length == 0) response.sendStatus(404);
    else response.status(200).json({ products: data, length: data.length });
  } catch (error) {
    response.sendStatus(500);
  }
};

export const addItemToCartController: RequestHandler = async (
  request: AuthenticatedRequest,
  response
) => {
  const { id } = request.user as AuthenticatedUserJWT;
  const { productId, productQuantity } = request.body;

  if (!productId) {
    response.status(400).send({ error: "Product ID is required!" });
    return;
  }

  if (!productQuantity) {
    response
      .status(400)
      .send({ error: "Product Quantity must be greater than 0" });
    return;
  }

  try {
    await pool.query(ADD_PRODUCT_TO_CART, [id, productId, productQuantity]);
    response.sendStatus(201);
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
};

export const updateItemQuantityToCartController: RequestHandler = async (
  request: AuthenticatedRequest,
  response
) => {
  const { id } = request.user as AuthenticatedUserJWT;
  const { productId, productQuantity } = request.body;

  if (!productId) {
    response.status(400).send({ error: "Product ID is required!" });
    return;
  }

  if (!productQuantity) {
    response
      .status(400)
      .send({ error: "Product Quantity must be greater than 0" });
    return;
  }

  try {
    await pool.query(UPDATE_PRODUCT_QUANTITY_TO_CART, [
      id,
      productId,
      productQuantity,
    ]);
    response.sendStatus(201);
  } catch (error) {
    response.sendStatus(500);
  }
};

export const deleteItemFromCartController: RequestHandler = async (
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
    const queryResult = await pool.query(GET_CART_PRODUCT_BY_ID, [
      id,
      productId,
    ]);
    const data = queryResult.rows;

    if (data.length == 0) {
      response.status(400).json({ error: "Product not found in the wishlist" });
      return;
    }

    await pool.query(DELETE_PRODUCT_FROM_CART, [id, productId]);
    response.sendStatus(204);
  } catch (error) {
    response.sendStatus(500);
  }
};
