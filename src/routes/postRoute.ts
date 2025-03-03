import express from "express";
import { createPostController, getAllPostController } from "../controllers/postController";
import { authenticateJWT } from "../middleware/authMiddleware/jwtVerify";
import { createPostValidation } from "../middleware/postMiddleware/postValidationMiddleware";
import { createPostsSchema } from "../schema/postSchema";
import { postsUpload } from "../config/multerConfig";

const router = express.Router();

router.post('/create', authenticateJWT, postsUpload.fields([{name:"file_path",maxCount:5}]),createPostValidation(createPostsSchema),  createPostController)
router.get('/get',getAllPostController)
export default router;
