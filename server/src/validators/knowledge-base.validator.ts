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

export {knowledgeBaseIdSchema}