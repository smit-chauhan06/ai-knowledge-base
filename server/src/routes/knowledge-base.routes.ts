import { Router } from "express";
import { addKnowledgeBase } from "controllers/knowledge-base.controller";
import { authMiddleware } from "middleware/auth";

const router = Router();

router.post("/", authMiddleware, addKnowledgeBase);

export default router;
