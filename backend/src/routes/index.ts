import { Router } from "express";
import authRouter from "./auth/routes";
import adminRouter from "./admin/routes";
import productRouter from "./products/routes";
import userRouter from "./user/routes";
import passport from "passport";
import "../strategies/local-strategy";
import { configDotenv } from "dotenv";

configDotenv();

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/user", passport.authenticate("local"), userRouter);

if (process.env.NODE_ENV === "development") {
  router.use("/admin", adminRouter);
}

export default router;
