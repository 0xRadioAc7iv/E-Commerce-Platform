import { RequestHandler } from "express";
import pool, { buildFilterQuery } from "../../utils/db";
import PRODUCT_QUERIES from "../../queries/products";

const { GET_PRODUCT_BY_ID } = PRODUCT_QUERIES;

export const fetchPoductsController: RequestHandler = async (
  request,
  response
) => {
  const { id, category, priceLow, priceHigh, search } = request.query;

  if (id) {
    if (id.length == 36) {
      try {
        const queryResult = await pool.query(GET_PRODUCT_BY_ID, [id]);
        const data = queryResult.rows;

        if (data.length == 0) {
          response
            .status(404)
            .json({ error: "Invalid Product ID or does not exist" });
        } else {
          response.status(200).json(data);
        }
      } catch (error) {
        response.sendStatus(500);
      }
    } else {
      response
        .status(404)
        .json({ error: "Invalid Product ID or does not exist" });
    }
    return;
  }

  const filteredProductsQuery = buildFilterQuery(
    category as string,
    priceLow as string,
    priceHigh as string,
    search as string
  );

  try {
    const queryResult = await pool.query(filteredProductsQuery);
    const data = queryResult.rows;
    response.status(200).json({ products: data, length: data.length });
  } catch (error) {
    response.sendStatus(500);
  }
};
