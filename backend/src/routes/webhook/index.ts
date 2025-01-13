import { Router } from "express";
import stripeWebhookRouter from "./payments/routes";

const router = Router();

router.use("/payments", stripeWebhookRouter);

export default router;
