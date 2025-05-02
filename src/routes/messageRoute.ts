import express from "express";
import { createMessageController, getMessageController } from "../controllers/messageController";
import { authenticateJWT } from "../middleware/authMiddleware/jwtVerify";
import { sendMessageValidationMiddleware } from "../middleware/messagesMiddleware/messagesValidationMiddleware";
import { createMessageSchema } from "../schema/messageSchema";

const router = express.Router();

router.post('/send',authenticateJWT ,sendMessageValidationMiddleware(createMessageSchema), createMessageController)
router.get('/getmessage/:receiverId',authenticateJWT, getMessageController);
export default router;