import express from "express";
const router = express.Router();
import { gAuth, logOut } from "../controllers/auth.controller.js";

router.post("/login/google", gAuth);

router.get("/logout", logOut);
export default router;
