import { Router } from "express";
import {
  addToWishlist,
  editWishlist,
  getUserWishlist,
  removeFromWishlist,
} from "../../../controllers/userControllers";

const router = Router();

router.get("/", getUserWishlist);

router.post("/", addToWishlist);

router.put("/", editWishlist);

router.delete("/", removeFromWishlist);

export default router;
