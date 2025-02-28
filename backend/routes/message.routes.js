import express from "express";
import { sendMessage, getMessages, hideMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.patch("/hide/:id", protectRoute, hideMessage);

export default router;