import mongoose, { Document, Types, Schema, Model } from "mongoose";

export type DocumentStatus = "uploading" | "processing" | "ready" | "failed";

export interface IDocument extends Document {
  name: string;
  knowledgeBase: Types.ObjectId;
  owner: Types.ObjectId;
  fileType: string;
  fileUrl: string;
  fileSize: number;
  status: DocumentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new Schema<IDocument>(
  {
    name: {
      type: String,
      required: [true, "Document is required"],
      trim: true,
    },
    knowledgeBase: {
      type: Schema.Types.ObjectId,
      ref: "knowledgeBase",
      required: [true, "Knowledge base is required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    fileType: {
      type: String,
      required: [true, "File type is required"],
      trim: true,
    },

    fileUrl: {
      type: String,
      required: [true, "File URL is required"],
      trim: true,
    },

    fileSize: {
      type: Number,
      required: [true, "File size is required"],
    },
    status: {
      type: String,
      enum: {
        values: ["uploading", "processing", "ready", "failed"],
        message: "Invalid document status",
      },
      default: "uploading",
    },
  },
  {
    timestamps: true,
  },
);

const DocumentModel: Model<IDocument> = mongoose.model<IDocument>(
  "Document",
  documentSchema,
);

export default DocumentModel;
