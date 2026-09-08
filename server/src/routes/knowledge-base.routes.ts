import { Router } from "express";
import {
  addKnowledgeBase,
  getAllKnowledgeBases,
  getKnowledgeBaseDataById,
} from "controllers/knowledge-base.controller";
import { authMiddleware } from "middleware/auth";
import { knowledgeBaseIdSchema } from "validators/knowledge-base.validator";

const router = Router();

router.post("/", authMiddleware, addKnowledgeBase);
router.get("/", authMiddleware, getAllKnowledgeBases);
router.get("/:id", authMiddleware, validate(knowledgeBaseIdSchema), getKnowledgeBaseDataById)

export default router;
