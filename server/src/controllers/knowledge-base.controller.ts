import { Request, Response } from "express";
import {
  createKnowledgeBase,
  getKnowledgeBaseById,
  getKnowledgeBases,
} from "services/knowledge-base.service";

export const addKnowledgeBase = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!req.user) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }

    const knowledgeBase = await createKnowledgeBase({
      name,
      description,
      ownerId: req.user.id,
    });

    res.status(201).json(knowledgeBase);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Knowledge Base creation failed";

    res.status(400).json({ error: message });
  }
};

export const getAllKnowledgeBases = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }

    const knowledgeBases = await getKnowledgeBases(req.user.id);

    res.status(200).json(knowledgeBases);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch knowledge bases";

    res.status(500).json({ error: message });
  }
};

export const getKnowledgeBaseDataById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!req.user) {
      res.status(401).json({
        error: "Unauthorized",
      });
      return;
    }

    const knowledgeBase = await getKnowledgeBaseById(id, req.user.id);
    if (!knowledgeBase) {
      res.status(404).json({
        error: "Knowldge base not found",
      });
      return;
    }

    res.status(200).json(knowledgeBase);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch knowledge base";

    res.status(500).json({ error: message });
  }
};
