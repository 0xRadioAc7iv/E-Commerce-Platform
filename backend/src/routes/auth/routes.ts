import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import {
  logoutAllController,
  logoutController,
  refreshAccessTokenController,
  signinController,
  signupController,
} from "../../controllers/auth";

const router = Router();

router.post("/signup", signupController);

router.post("/signin", signinController);

router.post("/token", refreshAccessTokenController);

router.post("/logout", authMiddleware, logoutController);

router.post("/logout/all", authMiddleware, logoutAllController);

export default router;
