import { Router } from "express";
import { generatePaymentLink } from "../../../controllers/api/payments";

const router = Router();

router.post("/", generatePaymentLink);

export default router;
