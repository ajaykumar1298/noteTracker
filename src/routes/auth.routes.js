import express from "express";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
// router.post("/logout", authController.logout);
// router.delete("/remove-user", authController.remove);
// router.patch("/update-user",authController.update)

export default router;
