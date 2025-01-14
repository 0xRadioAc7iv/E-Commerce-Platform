const PAYMENT_QUERIES = {
  CREATE_AND_RETURN_ORDER_ID:
    "INSERT INTO orders(user_id, total_amount) VALUES($1, $2) RETURNING order_id",
  CREATE_ORDER_PAYMENT:
    "INSERT INTO payments(user_id, order_id, stripe_payment_id, amount) VALUES($1, $2, $3, $4);",
};

export default PAYMENT_QUERIES;
