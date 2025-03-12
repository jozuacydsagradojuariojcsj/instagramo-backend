import express from "express";
import { storyUpload } from "../config/multerConfig";
import { createStoryController } from "../controllers/storyController";
import { authenticateJWT } from "../middleware/authMiddleware/jwtVerify";
import { createStoryValidation } from "../middleware/storyMiddleware/storyValidationMiddleware";
import { createStorySchema } from "../schema/storySchema";


const router = express.Router();

router.post('/create',authenticateJWT, storyUpload.fields([{name:"file_path", maxCount:1}]), createStoryValidation(createStorySchema), createStoryController)

export default router;