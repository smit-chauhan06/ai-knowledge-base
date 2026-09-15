import {
  createDocument,
  getDocumentsByKnowledgeBase,
} from "services/document.service";
import { Request, Response } from "express";

export const uploadDocument = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }

    if (!req.file) {
      res.status(400).json({
        error: "No File uploaded",
      });
      return;
    }
    const { id: knowledgeBaseId } = req.params;

    if (typeof knowledgeBaseId !== "string") {
      res.status(400).json({
        error: "Invalid knowledge base ID",
      });
      return;
    }

    const document = await createDocument({
      name: req.file.originalname,
      knowledgeBaseId,
      ownerId: req.user.id,
      fileType: req.file.mimetype,
      fileUrl: req.file.path,
      fileSize: req.file.size,
    });

    if (!document) {
      res.status(404).json({
        error: "Knowledge base not found",
      });
      return;
    }

    res.status(201).json(document);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "File upload failed";
  }
};

export const getDocuments = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }

    const { id } = req.params;

    const documents = await getDocumentsByKnowledgeBase(id, req.user.id);

    if (!documents) {
      res.status(404).json({
        error: "Knowledge base not found",
      });
      return;
    }

    res.status(200).json(documents);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch documents";
    res.status(500).json({
      error: message,
    });
  }
};
