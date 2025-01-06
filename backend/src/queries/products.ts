const PRODUCT_QUERIES = {
  GET_ALL_PRODUCTS: `SELECT product_id, name, description, price, stock, category FROM products`,
  GET_PRODUCT_BY_ID: `SELECT product_id, name, description, price, stock, category FROM products WHERE product_id = $1;`,
};

export default PRODUCT_QUERIES;
