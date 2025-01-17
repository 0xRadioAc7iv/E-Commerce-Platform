import { Router } from "express";
import { authMiddleware } from "../../../middlewares/auth";
import {
  checkAuthStatusController,
  deleteAccountController,
  editAccountController,
  logoutAllController,
  logoutController,
  refreshAccessTokenController,
  requestPasswordResetController,
  resetPasswordController,
  signinController,
  signupController,
} from "../../../controllers/api/auth";
import { limiter } from "../../../utils/limiter";

const router = Router();

router.post("/check", authMiddleware, checkAuthStatusController);

router.post("/signup", signupController);

router.post("/signin", signinController);

router.post("/token", refreshAccessTokenController);

router.post("/logout", authMiddleware, logoutController);

router.post("/logout/all", authMiddleware, logoutAllController);

router.post("/password/request-reset", limiter, requestPasswordResetController);

router.post("/password/reset", resetPasswordController);

router.put("/account", authMiddleware, editAccountController);

router.delete("/account", authMiddleware, deleteAccountController);

export default router;
