import KnowledgeBase from "models/KnowledgeBase";

interface CreateKnowledgeBaseInput {
  name: string;
  description?: string;
  ownerId: string;
}

interface UpdateKnowledgeBaseInput {
  name?: string;
  description?: string;
}

const createKnowledgeBase = async ({
  name,
  description,
  ownerId,
}: CreateKnowledgeBaseInput) => {
  return KnowledgeBase.create({
    name,
    description,
    owner: ownerId,
  });
};

const getKnowledgeBases = async (userId: string) => {
  return KnowledgeBase.find({
    owner: userId,
  });
};

const getKnowledgeBaseById = async (
  knowledgeBaseId: string,
  ownerId: string,
) => {
  return KnowledgeBase.findOne({
    _id: knowledgeBaseId,
    owner: ownerId,
  });
};

const updateKnowledgeBase = async (
  knowledgeBaseId: string,
  ownerId: string,
  data: UpdateKnowledgeBaseInput,
) => {
  return KnowledgeBase.findOneAndUpdate(
    {
      _id: knowledgeBaseId,
      owner: ownerId,
    },
    {
      $set: data,
    },
    {
      new: true,
    },
  );
};

export {
  createKnowledgeBase,
  getKnowledgeBases,
  getKnowledgeBaseById,
  updateKnowledgeBase,
};
