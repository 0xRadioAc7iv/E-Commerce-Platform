import Stripe from "stripe";
import { ProductData, StripeCheckoutData } from "../types/payments";

export const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string);

export const buildLineItemsArray = ({
  products,
}: ProductData): Array<StripeCheckoutData> => {
  const lineItems = products.map((product) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          metadata: {
            id: product.id,
          },
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };
  });

  return lineItems;
};
