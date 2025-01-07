import { Router } from "express";
import authRouter from "./auth/routes";
import { authMiddleware } from "../middlewares/auth";
import productsRouter from "./products/routes";
import wishlistRouter from "./wishlist/routes";

const router = Router();

router.use("/auth", authRouter);

router.use("/products", productsRouter);

router.use(authMiddleware);

router.use("/wishlist", wishlistRouter);

export default router;
