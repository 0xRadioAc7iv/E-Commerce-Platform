import { Router } from "express";
import {
  addToCart,
  editCart,
  getUserCart,
  removeFromCart,
} from "../../../controllers/userControllers";

const router = Router();

router.get("/", getUserCart);

router.post("/", addToCart);

router.put("/", editCart);

router.delete("/", removeFromCart);

export default router;
