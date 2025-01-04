import { configDotenv } from "dotenv";
import { Pool } from "pg";
import TABLE_QUERIES from "../queries/tables";

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

export const connectDatabase = async () => {
  try {
    await pool.connect();
  } catch (error: any) {
    console.log("Error connecting to the database:", error.message);
  }
};

export const createTablesIfNotExists = async () => {
  for (const [key, query] of Object.entries(TABLE_QUERIES)) {
    console.log(`\nExecuting: ${key}`);
    try {
      await pool.query(query);
      console.log(`Successfully executed: ${key}`);
    } catch (error: any) {
      console.error(`Error executing ${key}:`, error.message);
    }
  }
};

export default pool;
