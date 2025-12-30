import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

const router = Router();
 // must be before validate middleware


router.post("/register", validate(registerSchema), register);
router.post("/login",login);

export default router;
