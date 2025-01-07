const WISHLIST_QUERIES = {
  GET_ALL_WISHLIST_PRODUCTS:
    "SELECT P.product_id, P.name, P.description, P.price, P.stock, P.category FROM products P JOIN wishlist W ON P.product_id = W.product_id WHERE user_id = $1;",
  GET_WISHLIST_PRODUCT_BY_ID: `SELECT product_id FROM wishlist WHERE user_id = $1 AND product_id = $2;`,
  ADD_PRODUCT_TO_WISHLIST: `INSERT INTO wishlist (user_id, product_id) VALUES($1, $2) ON CONFLICT (user_id, product_id) DO NOTHING`,
  DELETE_PRODUCT_FROM_WISHLIST: `DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2;`,
};

export default WISHLIST_QUERIES;
