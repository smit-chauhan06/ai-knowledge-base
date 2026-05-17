import cors from "cors";
import { Application, Request, Response } from "express";
import express from "express";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "AI Knowledge Base API is running" });
});

export default app;
