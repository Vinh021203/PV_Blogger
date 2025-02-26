import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import userRoutes from "./routes/userRoutes"; // ✅ Import userRoutes

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

if (!process.env.MONGO_URI) {
  console.error("❌ Lỗi: MONGO_URI chưa được định nghĩa trong .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("✅ Kết nối MongoDB thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes); // ✅ Thêm API người dùng

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
