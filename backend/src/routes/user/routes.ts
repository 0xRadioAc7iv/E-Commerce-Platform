import { Router } from "express";
import wishlistRouter from "./wishlist/routes";
import cartRouter from "./cart/routes";
import { getOrderHistory } from "../../controllers/userControllers";

const router = Router();

router.get("/order-history", getOrderHistory);

router.use("/wishlist", wishlistRouter);
router.use("/shopping-cart", cartRouter);

export default router;
