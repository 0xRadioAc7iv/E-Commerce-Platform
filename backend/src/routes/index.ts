import { Router } from "express";
import authRouter from "./auth/routes";
import adminRouter from "./admin/routes";
import { configDotenv } from "dotenv";

configDotenv();

const router = Router();

router.use("/auth", authRouter);

if (process.env.NODE_ENV === "development") {
  router.use("/admin", adminRouter);
}

export default router;
