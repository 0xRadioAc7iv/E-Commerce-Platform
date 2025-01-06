import { Router } from "express";
import authRouter from "./auth/routes";
import { authMiddleware } from "../middlewares/auth";
import productsRouter from "./products/routes";

const router = Router();

router.use("/auth", authRouter);

router.use("/products", productsRouter);

router.use(authMiddleware);

export default router;
