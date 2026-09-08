import mongoose from "mongoose";
import { z } from "zod";

const knowledgeBaseIdSchema = z.object({
  params: z.object({
    id: z.string().refine(
      (id) => mongoose.isValidObjectId(id),
      {
        message: "Invalid knowledge base ID",
      },
    ),
  }),
});

const knowledgeBaseSchema=z.object({
    body:z.object({
        name:z.string().min(1,"Name is required").max(100),
        description:z.string().max(500).optional()
    })
})

export {knowledgeBaseIdSchema, knowledgeBaseSchema}