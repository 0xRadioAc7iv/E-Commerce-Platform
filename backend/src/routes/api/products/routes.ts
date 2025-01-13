import { Router } from "express";
import { fetchPoductsController } from "../../../controllers/api/products";

const router = Router();

router.get("/", fetchPoductsController);

export default router;
