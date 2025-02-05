# E-Commerce Platform

A feature-rich e-commerce backend with authentication, payment integration, and wishlist/cart functionalities.

## Features

- JWT Authentication w/ Password Reset via Email OTP
- Stripe payment gateway integration
- Shopping cart functionality
- Wishlist management

## Setup

```bash
git clone https://github.com/0xRadioAc7iv/E-Commerce-Platform.git
cd E-Commerce-Platform
```

```bash
# Backend
cd backend
npm i
```

```bash
# Frontend
cd frontend
npm i
```

## Configuration

Create a `.env` file and set the following environment variables:

```bash
NODE_ENV="ENVIRONMENT GOES HERE - development or production"
DATABASE_HOST="DATABASE HOST GOES HERE"
DATABASE_USER="DATABASE USER GOES HERE"
DATABASE_PASSWORD="DATABASE PASSWORD GOES HERE"
DATABASE_NAME="DATABASE NAME GOES HERE"
JWT_ACCESS_TOKEN_SECRET="JWT SECRET FOR GENERATING ACCESS TOKENS GOES HERE"
JWT_REFRESH_TOKEN_SECRET="JWT SECRET FOR GENERATING REFRESH TOKENS GOES HERE"
SENDGRID_API_KEY="YOUR SENDGRID API KEY GOES HERE"
SENDGRID_SENDER_EMAIL_ADDRESS="YOUR SENDGRID SENDER EMAIL ADDRESS GOES HERE"
FRONTEND_ORIGIN_URL="FRONTEND ORIGIN URL GOES HERE"
STRIPE_PRIVATE_KEY="STRIPE PRIVATE KEY GOES HERE"
STRIPE_WEBHOOK_SECRET="STRIPE WEBHOOK SECRET GOES HERE"
```

## Usage

Run the development server:

```bash
npm run dev
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](./LICENSE).
