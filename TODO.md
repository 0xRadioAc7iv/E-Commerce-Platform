## MVP

- [ ] Tests
- [ ] Hosting
  - [ ] Frontend
  - [ ] Backend
- [ ] Set up CI/CD Pipeline

### Frontend

- [ ] Build for Desktop
- [ ] Make it Responsive
- [ ] Backend Integration

### Backend

- [x] Databases
  - [x] Setup
  - [x] Design Schemas
  - [x] Generate Mock Data
- [ ] APIs
  - [x] Design
  - [ ] Develop
    - [x] Product Catalog
      - [x] All Products
      - [x] Get by ID
      - [x] Search (based on name & description)
      - [x] Filter by Price
      - [x] Filter by Category
    - [x] Wishlist
    - [x] Cart
    - [ ] Payments (Stripe Integration)
- [x] User Authentication (JWT)
  - [x] Signup/Login
    - [x] Validate Request Data
  - [x] Reset Password w/ Email
  - [x] Logout
    - [x] Current Device
    - [x] All Devices

#### Chores

- [x] Create Query Strings

#### Fix

- [x] `/logout` API does not logout the User instantly
- [x] `/logout/all` - Internal Server Error
