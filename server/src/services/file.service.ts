import fs from "fs/promises";

const deleteFile = async (filePath: string) => {
  await fs.unlink(filePath);
};

export { deleteFile };
