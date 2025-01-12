import { RequestHandler } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string);

export const generatePaymentLink: RequestHandler = async (
  request,
  response
) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Item A",
            },
            unit_amount: 10000,
          },
          quantity: 3,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Item A",
            },
            unit_amount: 20000,
          },
          quantity: 1,
        },
      ],
      success_url: "https://google.com",
      cancel_url: "https://google.com",
    });

    response.status(201).send({ paymentLink: session.url });
  } catch (error) {
    response.sendStatus(500);
  }
};
