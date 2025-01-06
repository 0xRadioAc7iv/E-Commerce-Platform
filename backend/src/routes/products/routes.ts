import { Router } from "express";
import { fetchPoductsController } from "../../controllers/products";

const router = Router();

router.get("/", fetchPoductsController);

export default router;
