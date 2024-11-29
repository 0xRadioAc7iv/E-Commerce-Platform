import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerNewUser,
  status,
} from "../../controllers/authControllers";
import passport from "passport";
import "../../strategies/local-strategy";

const router = Router();

router.get("/status", status);

router.post("/register", registerNewUser);

router.post("/login", passport.authenticate("local"), loginUser);

router.post("/logout", logoutUser);

router.post("/reset", (request, response) => {});

export default router;
