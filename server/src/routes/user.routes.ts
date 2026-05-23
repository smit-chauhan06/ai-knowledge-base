import { getMe } from "controllers/user.controller";
import { Router } from "express";
import { authMiddleware } from "middleware/auth";

const router = Router();

router.get("/me", authMiddleware, getMe);

export default router;
