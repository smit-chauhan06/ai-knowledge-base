import { Router } from "express";
import {
  addKnowledgeBase,
  deleteKnowledgeBaseData,
  getAllKnowledgeBases,
  getKnowledgeBaseDataById,
  updateKnowledgeBaseData,
  uploadDocument,
} from "controllers/knowledge-base.controller";
import { authMiddleware } from "middleware/auth";
import {
  knowledgeBaseIdSchema,
  knowledgeBaseSchema,
  updateKnowledgeBaseSchema,
} from "validators/knowledge-base.validator";
import { validate } from "middleware/validate";
import { upload } from "middleware/upload";

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

router.delete(
  "/:id",
  authMiddleware,
  validate(knowledgeBaseIdSchema),
  deleteKnowledgeBaseData,
);

router.post(
  "/:id/documents",
  authMiddleware,
  validate(knowledgeBaseIdSchema),
  upload.single("file"),
  uploadDocument,
);

export default router;
