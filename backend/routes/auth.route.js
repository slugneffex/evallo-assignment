import express from "express";
const router = express.Router();
import { gAuth, logOut } from "../controllers/auth.controller.js";
import { validateReq } from "../middleware/validate.js";
import { validateEmail } from "../utils/custom-validator.js";

router.post(
  "/login/google",

  gAuth
);

router.get("/logout", logOut);

export default router;
