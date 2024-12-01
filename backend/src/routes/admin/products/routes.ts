import { Router } from "express";
import {
  createNewProduct,
  deleteProduct,
  editProductDetails,
  getAllProducts,
} from "../../../controllers/adminControllers";

const router = Router();

router.get("/", getAllProducts);

router.post("/", createNewProduct);

router.put("/:id", editProductDetails);

router.delete("/:id", deleteProduct);

export default router;
