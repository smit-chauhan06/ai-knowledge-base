import cors from "cors";
import { Application, Request, Response } from "express";
import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "AI Knowledge Base API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
