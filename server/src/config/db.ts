import mongoose from "mongoose";

const connectDB = async () => {
  const mongo_uri = process.env.MONGO_URI as string;

  if (!mongo_uri) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  try {
    const conn = await mongoose.connect(mongo_uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;
