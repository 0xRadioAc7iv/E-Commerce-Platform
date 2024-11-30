import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerNewUser,
  requestPasswordReset,
  resetPassword,
} from "../../controllers/authControllers";
import passport from "passport";
import "../../strategies/local-strategy";

const router = Router();

router.post("/register", registerNewUser);

router.post("/login", passport.authenticate("local"), loginUser);

router.post("/logout", logoutUser);

router.post("/request-password-reset", requestPasswordReset);

router.post("/reset-password", resetPassword);

export default router;
