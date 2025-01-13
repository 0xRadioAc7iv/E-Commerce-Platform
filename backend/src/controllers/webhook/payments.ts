import { RequestHandler } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string);

export const stripeWebhookController: RequestHandler = async (
  request,
  response
) => {
  const sig: any = request.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    switch (event.type) {
      case "checkout.session.completed":
        console.log("Payment successful:", event.data.object);
        // TODO: Create Order & Payment
        break;
      case "payment_intent.payment_failed":
        console.log("Payment failed:", event.data.object);
        break;
    }

    response.status(200).send("Webhook received!");
  } catch (err) {
    console.error("Webhook error:", err);
    response.status(400).send("Webhook error!");
  }
};
