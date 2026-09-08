import { Router } from "express";
import {
  addKnowledgeBase,
  getAllKnowledgeBases,
  getKnowledgeBaseDataById,
} from "controllers/knowledge-base.controller";
import { authMiddleware } from "middleware/auth";
import { knowledgeBaseIdSchema, knowledgeBaseSchema } from "validators/knowledge-base.validator";
import { validate } from "middleware/validate";

const router = Router();

router.post("/", authMiddleware,validate(knowledgeBaseSchema), addKnowledgeBase);
router.get("/", authMiddleware, getAllKnowledgeBases);
router.get("/:id", authMiddleware, validate(knowledgeBaseIdSchema), getKnowledgeBaseDataById)

export default router;
