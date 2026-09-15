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

const getDocumentsByKnowledgeBase = async (
  knowledgeBaseId: string,
  ownerId: string,
) => {
  const knowledgeBase = KnowledgeBase.findOne({
    _id: knowledgeBaseId,
    owner: ownerId,
  });

  if (!knowledgeBase) {
    return null;
  }

  return DocumentModel.find({
    knowledgeBase: knowledgeBaseId,
    owner: ownerId,
  });
};

const getDocumentById = async (
  knowledgeBaseId: string,
  documentId: string,
  ownerId: string,
) => {
  const knowledgeBase = await KnowledgeBase.findOne({
    _id: knowledgeBaseId,
    owner: ownerId,
  });

  if (!knowledgeBase) {
    return null;
  }

  return DocumentModel.findOne({
    _id: documentId,
    knowledgeBase: knowledgeBaseId,
    owner: ownerId,
  });
};

const deleteDocument = async (
  knowledgeBaseId: string,
  documentId: string,
  ownerId: string,
) => {
  return DocumentModel.findOneAndDelete({
    _id: documentId,
    knowledgeBase: knowledgeBaseId,
    owner: ownerId,
  });
};

export {
  createDocument,
  getDocumentsByKnowledgeBase,
  getDocumentById,
  deleteDocument,
};
