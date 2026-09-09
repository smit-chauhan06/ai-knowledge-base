import { Router } from "express";
import {
  addKnowledgeBase,
  getAllKnowledgeBases,
  getKnowledgeBaseDataById,
  updateKnowledgeBaseData,
} from "controllers/knowledge-base.controller";
import { authMiddleware } from "middleware/auth";
import {
  knowledgeBaseIdSchema,
  knowledgeBaseSchema,
  updateKnowledgeBaseSchema,
} from "validators/knowledge-base.validator";
import { validate } from "middleware/validate";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(knowledgeBaseSchema),
  addKnowledgeBase,
);
router.get("/", authMiddleware, getAllKnowledgeBases);
router.get(
  "/:id",
  authMiddleware,
  validate(knowledgeBaseIdSchema),
  getKnowledgeBaseDataById,
);

router.patch(
  "/:id",
  authMiddleware,
  validate(updateKnowledgeBaseSchema),
  updateKnowledgeBaseData,
);

export default router;
