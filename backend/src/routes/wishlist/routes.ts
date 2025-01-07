import { Router } from "express";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
  getAllWishlistedProducts,
} from "../../controllers/wishlist";

const router = Router();

router.get("/", getAllWishlistedProducts);

router.post("/", addProductToWishlist);

router.delete("/", deleteProductFromWishlist);

export default router;
