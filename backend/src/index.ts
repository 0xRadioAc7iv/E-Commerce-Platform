import express, { urlencoded } from "express";
import { configDotenv } from "dotenv";
import apiRouter from "./routes/api";
import webhookRouter from "./routes/webhook";
import { connectDatabase, createTablesIfNotExists } from "./utils/db";
import cookieParser from "cookie-parser";
import cors from "cors";

configDotenv();

const app = express();

// Defining Routes
app.use(
  "/api",
  cors({
    origin: process.env.FRONTEND_ORIGIN_URL || "*",
    credentials: true,
  }),
  cookieParser(),
  express.json(),
  urlencoded({ extended: false }),
  apiRouter
);

app.use("/webhook", express.raw({ type: "application/json" }), webhookRouter);

async function startServer() {
  try {
    await connectDatabase();
    await createTablesIfNotExists();
    console.log("Connected to Database");

    app.listen(3000, () => console.log("Server is running on port 3000"));
  } catch (error) {
    console.log(error);
  }
}

startServer();
