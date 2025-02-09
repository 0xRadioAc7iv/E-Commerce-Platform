import { Router } from "express";
import { fetchProductsController } from "../../../controllers/api/products";

const router = Router();

router.get("/", fetchProductsController);

export default router;
