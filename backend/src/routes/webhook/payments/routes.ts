import { Router } from "express";
import { stripeWebhookController } from "../../../controllers/webhook/payments";

const router = Router();

router.post("/", stripeWebhookController);

export default router;
