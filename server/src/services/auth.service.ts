import User from "models/User";
import jwt, { SignOptions } from "jsonwebtoken";
import { signToken } from "utils/jwt";

interface RegisterInput {
  name: string;
  password: string;
  email: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthResult {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export const registerUser = async (input: RegisterInput) => {
  const { email, password } = input;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email is already exists");
  }

  const user = await User.create(input);

  const token = signToken({ userId: user?._id.toString() });

  return {
    user: {
      id: user?._id.toString(),
      name: user.name,
      email: user.email,
    },
    token,
  };
};

export const loginUser = async (input: LoginInput) => {
  const user = await User.findOne({ email: input?.email }).select("+password");

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await user.comparePassword(input.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ userId: user._id.toString() });

  return {
    user: {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    token,
  };
};
