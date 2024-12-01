import { Router } from "express";
import productsRouter from "./products/routes";
import ordersRouter from "./orders/routes";

const router = Router();

router.use("/products", productsRouter);
router.use("/orders", ordersRouter);

export default router;
