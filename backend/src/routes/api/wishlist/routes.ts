import { Router } from "express";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
  getAllWishlistedProducts,
} from "../../../controllers/api/wishlist";

const router = Router();

router.get("/", getAllWishlistedProducts);

router.post("/", addProductToWishlist);

router.delete("/", deleteProductFromWishlist);

export default router;
