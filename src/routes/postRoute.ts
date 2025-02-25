import express from "express";
import { createPostController } from "../controllers/postController";
import { authenticateJWT } from "../middleware/authMiddleware/jwtVerify";
import { createPostValidation } from "../middleware/postMiddleware/postValidationMiddleware";
import { createPostsSchema } from "../schema/postSchema";

const router = express.Router();

router.post('/create', authenticateJWT, createPostValidation(createPostsSchema), createPostController)

export default router;
