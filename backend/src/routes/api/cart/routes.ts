import { Router } from "express";
import {
  addItemToCartController,
  deleteItemFromCartController,
  getAllCartItemsController,
  updateItemQuantityToCartController,
} from "../../../controllers/api/cart";

const router = Router();

router.get("/", getAllCartItemsController);

router.post("/", addItemToCartController);

router.patch("/", updateItemQuantityToCartController);

router.delete("/", deleteItemFromCartController);

export default router;
