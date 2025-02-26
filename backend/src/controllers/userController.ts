import { Request, Response } from "express";
import User from "../models/userModel";

// 📌 Lấy danh sách tất cả người dùng (Không yêu cầu xác thực)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    res.setHeader("Cache-Control", "no-store"); // ✅ Tắt cache để luôn nhận dữ liệu mới

    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Lỗi khi lấy danh sách người dùng:", err.message);
    res.status(500).json({ error: "Lỗi server!", details: err.message });
  }
};
