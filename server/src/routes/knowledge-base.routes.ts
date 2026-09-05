import { Router } from "express";
import {
  addKnowledgeBase,
  getAllKnowledgeBases,
} from "controllers/knowledge-base.controller";
import { authMiddleware } from "middleware/auth";

const router = Router();

router.post("/", authMiddleware, addKnowledgeBase);
router.get("/", authMiddleware, getAllKnowledgeBases);

export default router;
