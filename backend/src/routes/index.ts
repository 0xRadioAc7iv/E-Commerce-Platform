import { Router } from "express";
import authRouter from "./auth/routes";
import { authMiddleware } from "../middlewares/auth";
import productsRouter from "./products/routes";
import wishlistRouter from "./wishlist/routes";
import cartRouter from "./cart/routes";

const router = Router();

router.use("/auth", authRouter);

router.use("/products", productsRouter);

router.use(authMiddleware);

router.use("/wishlist", wishlistRouter);

router.use("/cart", cartRouter);

export default router;
