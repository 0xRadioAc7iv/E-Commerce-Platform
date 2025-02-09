# TODO

- [ ] Setup Github Actions Workflow
- [ ] Testing

## Frontend

- [ ] UI Enhancement
- [ ] Responsive
- [ ] Lazy Loading

## Backend

#### Databases

- [ ] PostgreSQL (per Service)

  - [ ] User Management Service
  - [ ] Order Processing Service
  - [ ] Payments Management Service
  - [ ] Notifications Service

- [ ] PostgreSQL (Shared)

  - [ ] Cart Service
  - [ ] Wishlist Service

- [ ] MongoDB (per Service)

  - [ ] Product Service (+ ElasticSearch)
  - [ ] Recommendation Service

#### APIs

- [ ] RESTful for Frontend consumption
- [ ] GraphQL for Product Search/Filter
- [ ] gRPC for Inter Service Communication

#### Integrations

- [ ] Stripe (Payments)
- [ ] Google OAuth2 (Auth)
- [ ] Sendgrid (Email)

#### Migrating to Microservices

- [ ] API Gateway

  - [ ] Route Requests to Services
  - [ ] Rate Limiting
  - [ ] Send Cached Webpages/Data

- [ ] Create Services

  - [ ] User Management Service

    - [ ] Authentication

      - [ ] Multi-factor Auth
      - [ ] Basic Auth (Username/Password)
      - [ ] Passkeys
      - [ ] OAuth2
        - [ ] Google

    - [ ] Profile Management

      - [ ] Manage Premium Subscription
      - [ ] Delete Account
      - [ ] Add/Update Profile Details
        - [ ] Email
        - [ ] Username
        - [ ] Password
        - [ ] Address
        - [ ] Phone Number
        - [ ] Recovery Email

  - [ ] Product Service

    - [ ] Track Product Inventory
    - [ ] Search Products
    - [ ] Add/Update/Delete Products

  - [ ] Order Processing Service

    - [ ] Create Order
    - [ ] Cancel Order
    - [ ] Track/Manage Orders
    - [ ] Order History

  - [ ] Payments Management Service

    - [ ] Stripe Checkout
    - [ ] Stripe Subscription
    - [ ] Refund

  - [ ] Cart Management Service

    - [ ] Add/Update/Delete Items
    - [ ] Fetch Cart Items

  - [ ] Wishlist Management Service

    - [ ] Add/Delete Items
    - [ ] Fetch Wishlist Items

  - [ ] Email/Notification Service (Webhooks)

    - [ ] Order Confirmation
    - [ ] New Sign-in
    - [ ] Update Profile
    - [ ] Order Tracking
    - [ ] Payments
    - [ ] Account Reset
    - [ ] Account Delete
    - [ ] Multi-Factor Auth
    - [ ] Subscription
    - [ ] Sale Alerts

  - [ ] Recommendation Service
    - [ ] Recently Viewed
    - [ ] Trending
    - [ ] Profile based
    - [ ] Category based

### Features to Add/Improve

- [ ] JWT Blacklisting (in Redis Cache)
- [ ] Premium Subscriptions (for Discounts & Free/Faster Deliveries)
- [ ] Improved User Onboarding
  - [ ] Add Phone Number (Required)
  - [ ] Address (Required)
  - [ ] Recovery Email (Optional but Recommended for User)
- [ ] Forgot Password
  - [ ] Sign in w/ Magic Link
  - [ ] Better OTP Generation
- [ ] Search Bar Recommendations
- [ ] Redis Caching
  - [ ] Products
  - [ ] Webpages
- [ ] Product Details Enhancement
  - [ ] Reviews
  - [ ] Ratings
  - [ ] Additional Info (Ref. Amazon)
- [ ] User Activity Logging (Account Tracking purposes for User)
- [ ] Admin Dashboard (Full Control over Users & Products)
