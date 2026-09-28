import fs from "fs/promises";
import pdf from "pdf-parse";
import mammoth from "mammoth";

const extractText = async (
  filePath: string,
  fileType: string,
): Promise<string> => {
  switch (fileType) {
    case "application/pdf": {
      const buffer = await fs.readFile(filePath);
      const data = await pdf(buffer);
      return data.text;
    }

    case "text/plan": {
      return await fs.readFile(filePath, "utf-8");
    }

    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      return result.value;
    }

    default:
      throw new Error(`Unsupported file type: ${fileType}`);
  }
};

export { extractText };
