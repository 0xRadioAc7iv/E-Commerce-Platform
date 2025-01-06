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

- [ ] Databases
  - [x] Setup
  - [x] Design Schemas
  - [ ] Generate Mock Data
- [ ] APIs
  - [x] Design
  - [ ] Develop
    - [x] Product Catalog
      - [x] All Products
      - [x] Get by ID
      - [x] Search (based on name & description)
      - [x] Filter by Price
      - [x] Filter by Category
    - [ ] Cart & Checkout
    - [ ] Orders
- [ ] User Authentication (JWT)
  - [x] Signup/Login
    - [ ] Validate Request Data (use express-validator OR zod maybe?)
  - [ ] Reset Password w/ Email
  - [x] Logout
    - [x] Current Device
    - [x] All Devices
  - [ ] Login with Google
- [ ] Integrate Stripe

#### Chores

- [ ] Create Query Strings

#### Fix

- [ ] `/logout` API does not logout the User instantly
- [ ] `/logout/all` - Internal Server Error
