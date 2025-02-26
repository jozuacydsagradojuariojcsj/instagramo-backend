import express  from "express";
import { loginController, refreshTokenController, registerController } from "../controllers/authController";
import { loginUserValidation, registerUserValidation } from "../middleware/authMiddleware/authValidationMiddleware";
import { loginUserSchema, registerUserSchema } from "../schema/authSchema";


const router = express.Router();

router.post('/login', loginUserValidation(loginUserSchema), loginController);
router.post('/register', registerUserValidation(registerUserSchema), registerController);
router.post('/refresh', refreshTokenController);


export default router;