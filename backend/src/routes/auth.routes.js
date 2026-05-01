import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { checkUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.delete("/remove-user", checkUser, authController.remove);
router.patch("/update-user", checkUser, authController.update);

export default router;
