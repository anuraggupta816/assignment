import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { requireAuth } from "../security/requireAuth";

import { registerSchema, loginSchema } from "../validation/schemas";
import { validate } from "../security/validate";

const router = Router();

router.post("/register", validate(registerSchema), authController.registerUser);
router.post("/login", validate(loginSchema), authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/me", requireAuth, authController.getCurrentUser);

export default router;
