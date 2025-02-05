import { RequestHandler } from "express";
import pool, { buildFilterQuery } from "../../utils/db";
import PRODUCT_QUERIES from "../../queries/products";

const { GET_PRODUCT_BY_ID } = PRODUCT_QUERIES;

export const fetchProductsController: RequestHandler = async (
  request,
  response
) => {
  const { id, category, priceLow, priceHigh, search } = request.query;

  if (id) {
    if (typeof id === "string" && id.length === 36) {
      try {
        const queryResult = await pool.query(GET_PRODUCT_BY_ID, [id]);
        const data = queryResult.rows;

        if (data.length === 0) {
          response
            .status(404)
            .json({ error: "Invalid Product ID or does not exist" });
          return;
        }

        response.status(200).json(data);
        return;
      } catch (error) {
        response
          .status(500)
          .json({ error: "Error Fetching Requested Product Details" });
        return;
      }
    }
    response.status(400).json({ error: "Invalid Product ID format" });
    return;
  }

  try {
    const { query, values } = buildFilterQuery(
      category as string,
      priceLow as string,
      priceHigh as string,
      search as string
    );

    const queryResult = await pool.query(query, values);
    const data = queryResult.rows;
    response.status(200).json({ products: data, length: data.length });
  } catch (error) {
    response.status(500).json({ error: "Error Fetching Products Data" });
  }
};
