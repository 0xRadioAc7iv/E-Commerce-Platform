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
  - Explore (Hardcoded Products for now)
- Shopping Cart
- Payments (Stripe)
- Wishlist
  - Saved for logged-in users
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
    - [ ] Auth
    - [ ] User
      - [ ] Order History (with Status)
      - [ ] Shopping Cart
      - [ ] Wishlist
    - [ ] Products
    - [ ] Payments
    - [ ] Admin
      - [ ] Products
      - [ ] Orders
  - [ ] Design DB Schemas
    - [ ] Users
    - [ ] Products
    - [ ] Payments
    - [ ] Orders
  - [ ] Stripe Integration
  - [ ] API Testing (Postman/Thunder Client/Automated)

- Deployment
  - [ ] Frontend
  - [ ] Backend
  - [ ] Set up CI/CD Pipeline
