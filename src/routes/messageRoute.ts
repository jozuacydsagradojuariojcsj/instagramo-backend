import express from "express";
import { messageController } from "../controllers/messageController";
import { authenticateJWT } from "../middleware/authMiddleware/jwtVerify";
import { sendMessageValidationMiddleware } from "../middleware/messagesMiddleware/messagesValidationMiddleware";
import { createMessageSchema } from "../schema/messageSchema";

const router = express.Router();

router.post('/send/:id?', sendMessageValidationMiddleware(createMessageSchema), messageController)

export default router;