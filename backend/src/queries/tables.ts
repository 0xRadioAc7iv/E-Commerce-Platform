const TABLE_QUERIES = {
  CREATE_TABLE_IF_NOT_EXISTS_USERS: `
        CREATE TABLE IF NOT EXISTS users (
            user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            username VARCHAR(26) NOT NULL UNIQUE,
            email VARCHAR(100) NOT NULL UNIQUE,
            password TEXT NOT NULL,
            stripe_customer_id TEXT UNIQUE
        );`,
  CREATE_TABLE_IF_NOT_EXISTS_REFRESH_TOKENS: `
          CREATE TABLE IF NOT EXISTS refresh_tokens (
            user_id UUID NOT NULL,
            token TEXT NOT NULL,
            PRIMARY KEY (user_id, token),
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
          );`,
  CREATE_TABLE_IF_NOT_EXISTS_CART: `
            CREATE TABLE IF NOT EXISTS cart (
                cart_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL,
                product_id UUID NOT NULL,
                quantity INT DEFAULT 1 CHECK (quantity > 0),
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
            );`,
  CREATE_TABLE_IF_NOT_EXISTS_WISHLIST: `
          CREATE TABLE IF NOT EXISTS wishlist (
                wishlist_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL,
                product_id UUID NOT NULL,
                added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
                FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
                CONSTRAINT unique_user_product UNIQUE (user_id, product_id)
            );`,
  CREATE_TABLE_IF_NOT_EXISTS_ORDERS: `
          CREATE TABLE IF NOT EXISTS orders (
              order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              user_id UUID NOT NULL,
              total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
              status VARCHAR(20) DEFAULT 'Pending',
              payment_status VARCHAR(20) DEFAULT 'Pending',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
          );`,
  CREATE_TABLE_IF_NOT_EXISTS_ORDER_ITEMS: `
          CREATE TABLE IF NOT EXISTS order_items (
              order_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              order_id UUID NOT NULL,
              product_id UUID NOT NULL,
              quantity INT NOT NULL CHECK (quantity > 0),
              price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
              FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
              FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
          );`,
  CREATE_TABLE_IF_NOT_EXISTS_PAYMENTS: `
            CREATE TABLE IF NOT EXISTS payments (
              payment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              user_id UUID NOT NULL,
              order_id UUID NOT NULL,
              stripe_payment_id TEXT NOT NULL,
              amount DECIMAL(10, 2) NOT NULL CHECK (amount >= 0),
              currency VARCHAR(3) DEFAULT 'INR',
              status VARCHAR(20) DEFAULT 'Pending',
              FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
              FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
          );`,
  CREATE_TABLE_IF_NOT_EXISTS_PRODUCTS: `
          CREATE TABLE IF NOT EXISTS products (
              product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              name VARCHAR(100) NOT NULL,
              description TEXT,
              price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
              stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
              category VARCHAR(50)
          );`,
};

export default TABLE_QUERIES;
