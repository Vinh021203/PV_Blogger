import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

// Hàm đăng ký
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Kiểm tra nếu email đã tồn tại
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "Email đã được sử dụng!" });
      return;
    }

    // Hash mật khẩu trước khi lưu vào database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role: "user" }); // Mặc định role là "user"
    await newUser.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    console.error("❌ Lỗi khi đăng ký:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
};

// Hàm đăng nhập
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ error: "Sai email hoặc mật khẩu!" });
      return;
    }

    // 🛠 Kiểm tra role, nếu chưa có thì mặc định là "user"
    const role = user.role || "user";

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET as string, { expiresIn: "1d" });

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        role: role // 📌 Gửi role về frontend
      } 
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi server!" });
  }
};
