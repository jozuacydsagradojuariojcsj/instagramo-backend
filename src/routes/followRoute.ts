import express from "express";
import { followerController, unfollowController } from "../controllers/followController";
import { authenticateJWT } from "../middleware/authMiddleware/jwtVerify";
import { followerValidationMiddleware } from "../middleware/followMiddleware/followMiddleware";
import { followerSchema } from "../schema/followSchema";


const router = express.Router();

router.post('/follow', authenticateJWT, followerValidationMiddleware(followerSchema), followerController);
router.delete('/unfollow',authenticateJWT, followerValidationMiddleware(followerSchema), unfollowController);

export default router;