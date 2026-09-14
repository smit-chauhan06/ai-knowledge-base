import DocumentModel from "models/Document";
import KnowledgeBase from "models/KnowledgeBase";

interface CreateDocumentInput {
  name: string;
  knowledgeBaseId: string;
  ownerId: string;
  fileType: string;
  fileUrl: string;
  fileSize: number;
}

const createDocument = async ({
  name,
  knowledgeBaseId,
  ownerId,
  fileType,
  fileUrl,
  fileSize,
}: CreateDocumentInput) => {
  const knowledgeBase = await KnowledgeBase.findOne({
    _id: knowledgeBaseId,
    owner: ownerId,
  });

  if (!knowledgeBase) {
    return null;
  }

  return DocumentModel.create({
    name,
    knowledgeBase: knowledgeBaseId,
    owner: ownerId,
    fileType,
    fileUrl,
    fileSize,
    status: "uploading",
  });
};

export { createDocument };
