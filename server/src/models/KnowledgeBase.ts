import mongoose, { Document, Model, Schema, Types } from "mongoose";

export interface IKnowledgeBase extends Document {
  name: string;
  description?: string;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const knowledgeBaseSchema = new Schema<IKnowledgeBase>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
  },
  {
    timestamps: true,
  },
);

const KnowledgeBase: Model<IKnowledgeBase> = mongoose.model<IKnowledgeBase>(
  "KnowledgeBase",
  knowledgeBaseSchema,
);

export default KnowledgeBase;
