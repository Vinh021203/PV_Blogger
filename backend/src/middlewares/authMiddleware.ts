import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Định nghĩa kiểu mở rộng của `Request`
export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

// Middleware xác thực JWT
const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Không có token, từ chối truy cập!" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };

    // ✅ Gán user vào req
    req.user = decoded;

    next();
  } catch (error) {
    console.error("❌ Lỗi xác thực JWT:", error);
    res.status(401).json({ error: "Token không hợp lệ!" });
  }
};

export default authMiddleware;
