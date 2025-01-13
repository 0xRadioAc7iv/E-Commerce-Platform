import { ProductData } from "../types/payments";

export const buildLineItemsArray = ({ products }: ProductData) => {
  const lineItems = products.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });

  return lineItems;
};
