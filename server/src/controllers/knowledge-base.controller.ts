import { Request, Response } from "express";
import { createKnowledgeBase } from "services/knowledge-base.service";

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
