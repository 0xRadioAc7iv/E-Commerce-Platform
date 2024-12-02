import express, { urlencoded } from "express";
import { configDotenv } from "dotenv";
import router from "./routes";
import { logger } from "./middlewares/logger";
import passport from "passport";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./db";

configDotenv();

const app = express();
const PGStore = connectPgSimple(session);

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: false }));

// Auth Middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 604800,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    store: new PGStore({
      pool: pool,
      tableName: "user_sessions",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares (for development)
if (process.env.NODE_ENV === "development") {
  app.use(logger);
}

app.use("/api", router);

try {
  app.listen(3000);
  console.log("Server started on port:3000");
} catch (error) {
  console.error(error);
}
