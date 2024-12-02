import { Router } from "express";
import {
  getFilteredProducts,
  getProductById,
  getRecommendedProducts,
} from "../../controllers/productControllers";

const router = Router();

router.get("/recommended", getRecommendedProducts);

router.get("/search", getFilteredProducts);

router.get("/:id", getProductById);

export default router;
