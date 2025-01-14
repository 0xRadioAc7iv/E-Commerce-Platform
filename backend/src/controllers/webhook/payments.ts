import { RequestHandler } from "express";
import { stripe } from "../../utils/payments";
import pool from "../../utils/db";
import { StripeCheckoutData } from "../../types/payments";
import PAYMENT_QUERIES from "../../queries/payments";
import { sendEmail } from "../../utils/mail";

const { CREATE_AND_RETURN_ORDER_ID, CREATE_ORDER_PAYMENT } = PAYMENT_QUERIES;

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
        const session = event.data.object;

        const paymentId = session.payment_intent;
        const userId = session.metadata?.userId;
        const userEmail = session.customer_details?.email as string;
        const amountTotal = (session.amount_total as number) / 100;
        const orderItems = JSON.parse(
          session.metadata?.orderItems as string
        ) as StripeCheckoutData[];

        const { rows } = await pool.query(CREATE_AND_RETURN_ORDER_ID, [
          userId,
          amountTotal,
        ]);
        const orderId = rows[0].order_id;

        const ORDER_ITEMS_INSERTION_QUERY = `
          INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ${orderItems
            .map(
              (_: any, i: number) =>
                `('${orderId}', $${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`
            )
            .join(", ")};
          `.trim();

        const values = orderItems.flatMap((item) => [
          item.price_data.product_data.metadata.id,
          item.quantity,
          item.price_data.unit_amount / 100,
        ]);

        // Inserts Order Items
        await pool.query(ORDER_ITEMS_INSERTION_QUERY, values);

        // Inserts Payment
        await pool.query(CREATE_ORDER_PAYMENT, [
          userId,
          orderId,
          paymentId,
          amountTotal,
        ]);

        await sendEmail(
          userEmail,
          "Your Order & Stripe Payment Confirmed!",
          `We have received your Order and your Payment is Confirmed.`
        );

        break;
    }

    response.status(200);
  } catch (err) {
    response.status(400);
  }
};
