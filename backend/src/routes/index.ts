import { Router } from "express";
import authRouter from "./auth/routes";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use("/auth", authRouter);

router.use(authMiddleware);

export default router;
