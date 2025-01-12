import { Router } from "express";
import { generatePaymentLink } from "../../controllers/payments";

const router = Router();

router.post("/", generatePaymentLink);

export default router;
