import { RequestHandler } from "express";
import Stripe from "stripe";
import { ProductData } from "../../types/payments";
import { buildLineItemsArray } from "../../utils/payments";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string);

export const generatePaymentLink: RequestHandler = async (
  request,
  response
) => {
  const { products }: ProductData = request.body;

  if (!products) {
    response.status(400).send({ error: "No Products given" });
    return;
  }

  const lineItems = buildLineItemsArray({ products: products });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
    });

    response.status(201).send({ paymentLink: session.url });
  } catch (error) {
    response.sendStatus(500);
  }
};
