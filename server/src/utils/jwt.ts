import jwt, { SignOptions } from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

export const signToken = (payload: JwtPayload) => {
  const secret = process.env.JWT_SECRET;

  const expireIn = process.env.JWT_EXPIRES_IN || "7d";

  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(payload, secret, { expiresIn: expireIn } as SignOptions);
};

export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.verify(token, secret) as JwtPayload;
};
