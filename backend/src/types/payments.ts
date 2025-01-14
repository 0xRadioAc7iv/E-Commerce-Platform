export type ProductData = {
  products: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
};

export type StripeCheckoutData = {
  price_data: {
    currency: string;
    product_data: {
      name: string;
      metadata: {
        id: string;
      };
    };
    unit_amount: number;
  };
  quantity: number;
};
