import app from "app";
import connectDB from "config/db";
import dotenv from "dotenv";
dotenv.config();

const PORT: number = Number(process.env.PORT || "8000");

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
