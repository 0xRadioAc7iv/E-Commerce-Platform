import express, { urlencoded } from "express";
import { configDotenv } from "dotenv";
import router from "./routes";
import { connectDatabase, createTablesIfNotExists } from "./utils/db";
import cookieParser from "cookie-parser";
import cors from "cors";

configDotenv();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN_URL || "*",
    methods: ["*"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use("/api", router);

async function startServer() {
  try {
    await connectDatabase();
    await createTablesIfNotExists();
    console.log("Connected to Database");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
