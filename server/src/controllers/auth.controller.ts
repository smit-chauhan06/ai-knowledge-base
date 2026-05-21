import { Request, Response } from "express";
import { loginUser, registerUser } from "services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Email, password, and name are required" });
    }
    const result = await registerUser({ email, password, name });
    res.status(201).json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Registration failed";
    res.status(400).json({ error: message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }
    const result = await loginUser({ email, password });
    res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    res.status(401).json({ error: message });
  }
};
