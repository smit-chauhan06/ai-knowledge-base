import { Router } from "express";
import {
  uploadDocument,
  getDocuments,
  deleteKBDocument,
} from "controllers/document.controller";
import { authMiddleware } from "middleware/auth";
import {
  knowledgeBaseDocumentIdSchema,
  knowledgeBaseIdSchema,
} from "validators/knowledge-base.validator";
import { validate } from "middleware/validate";
import { upload } from "middleware/upload";

const router = Router();

router.post(
  "/knowledge-bases/:id/documents",
  authMiddleware,
  validate(knowledgeBaseIdSchema),
  upload.single("file"),
  uploadDocument,
);

router.get(
  "/knowledge-bases/:id/documents/:doc_id",
  authMiddleware,
  validate(knowledgeBaseDocumentIdSchema),
  getDocuments,
);

router.delete(
  "/knowledge-bases/:id/documents/:doc_id",
  authMiddleware,
  validate(knowledgeBaseDocumentIdSchema),
  deleteKBDocument,
);

export default router;
