import { RequestHandler } from "express";
import { stripe } from "../../utils/payments";
import { ProductData } from "../../types/payments";
import { buildLineItemsArray } from "../../utils/payments";
import { AuthenticatedRequest, AuthenticatedUserJWT } from "../../types/auth";

export const generatePaymentLink: RequestHandler = async (
  request: AuthenticatedRequest,
  response
) => {
  const { products }: ProductData = request.body;
  const { id } = request.user as AuthenticatedUserJWT;
  const cancelUrl = request.headers.referer;

  if (!id) {
    response.sendStatus(401);
    return;
  }

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
      metadata: {
        userId: id,
        orderItems: JSON.stringify(lineItems),
      },
      success_url: `${process.env.FRONTEND_ORIGIN_URL}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
    });

    response.status(201).send({ paymentLink: session.url });
  } catch (error) {
    response.status(500).send({ error: "Error Generating Payment Link" });
  }
};
