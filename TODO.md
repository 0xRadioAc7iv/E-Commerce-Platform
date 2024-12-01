## MVP

### Features

- User Auth
  - Email and Password
  - Forgot Password
- Product
  - Search
    - Filter
      - By Price
      - Category
  - Explore (Returns a predetermined list of Products for now)
- Shopping Cart
- Payments (Stripe)
- Wishlist
- User Order History
  - View Order Status (e.g., Processing, Shipped, Delivered)
- Admin Interface (for development)
  - Products Management
    - Add/Edit/Delete Products
  - Order Management
    - Confirm/Ship/Deliver Orders

### Planning

- Frontend

  - [ ] Get Design
  - [ ] Build for Desktop
  - [ ] Make it Responsive (Mobile-first design)
  - [ ] API Integration

- Backend

  - [x] Design APIs
    - [x] Auth
    - [ ] User
      - [ ] Order History (with Status)
      - [ ] Shopping Cart
      - [ ] Wishlist
    - [ ] Products
    - [ ] Payments
    - [x] Admin
      - [x] Products
      - [ ] Orders
  - [x] Design DB Schemas
    - [x] Users
    - [x] Products
    - [x] Payments
    - [x] Orders
  - [ ] Stripe Integration
  - [ ] API Testing (Postman/Thunder Client/Automated)

- Deployment
  - [ ] Frontend
  - [ ] Backend
  - [ ] Set up CI/CD Pipeline
