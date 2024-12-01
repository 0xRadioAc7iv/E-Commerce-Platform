import { Router } from "express";
import {
  editOrderStatus,
  getAllOrders,
} from "../../../controllers/adminControllers";

const router = Router();

router.get("/", getAllOrders);

router.put("/:id", editOrderStatus);

export default router;
