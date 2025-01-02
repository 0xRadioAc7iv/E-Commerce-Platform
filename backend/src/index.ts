import express, { urlencoded } from "express";
import { configDotenv } from "dotenv";
import router from "./routes";
import pool from "./db";

configDotenv();

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Basic setup done!");
});

app.use("/api", router);

async function startServer() {
  try {
    await pool.connect();

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
