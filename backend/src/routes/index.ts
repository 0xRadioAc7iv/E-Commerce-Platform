import { Router } from "express";
import authRouter from "./auth/routes";
import { authMiddleware } from "../middlewares/auth";
import productsRouter from "./products/routes";
import wishlistRouter from "./wishlist/routes";
import cartRouter from "./cart/routes";
import paymentRouter from "./payments/routes";

const router = Router();

router.use("/auth", authRouter);

router.use("/products", productsRouter);

// authMiddleware will be used for all of the below routes (protected routes)
router.use(authMiddleware);

router.use("/wishlist", wishlistRouter);

router.use("/cart", cartRouter);

router.use("/payments", paymentRouter);

export default router;
