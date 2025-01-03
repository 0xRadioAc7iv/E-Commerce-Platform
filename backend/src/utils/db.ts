import { configDotenv } from "dotenv";
import { Pool } from "pg";

configDotenv();

const pool = new Pool({
  host: process.env.DATABASE_HOST as string,
  port: parseInt(process.env.DATABASE_PORT || "5432"),
  user: process.env.DATABASE_USER as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export default pool;
