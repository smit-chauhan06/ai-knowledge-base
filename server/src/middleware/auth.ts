import { Request, Response, NextFunction } from "express";
import User from "models/User";
import { error } from "node:console";
import { verifyToken } from "utils/jwt";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      res.status(401).json({
        error: "No token provided",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);

    const user = await User.findById(payload.userId);
    if (!user) {
      res.status(401).json({ error: "User no longer exsits" });
      return;
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
    };
    next();
  } catch (error) {
    res.status(401).json({
      error: "Invalid or expired Token",
    });
  }
};
