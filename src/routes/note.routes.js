import express from "express";
import * as noteController from "../controllers/note.controller.js";
import { checkUser } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/add", checkUser, noteController.add);
router.get("/all-notes", checkUser, noteController.getAll);
router.delete("/remove/:id", checkUser, noteController.remove);
router.patch("/update/:id", checkUser, noteController.update);

export default router;
