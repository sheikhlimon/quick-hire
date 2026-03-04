import { Router } from "express";
import { signup, login } from "../controllers/authController";
import { validate, authSchema } from "../middleware/validation";

const router = Router();

router.post("/signup", validate(authSchema), signup);

router.post("/login", login);

export default router;
