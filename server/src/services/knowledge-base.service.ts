import KnowledgeBase from "models/KnowledgeBase";

interface CreateKnowledgeBaseInput {
  name: string;
  description?: string;
  ownerId: string;
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

export { createKnowledgeBase, getKnowledgeBases };
