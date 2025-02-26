import { Request, Response } from "express";
import Comment from "../models/commentModel";
import Post from "../models/postModel";
import { AuthRequest } from "../middlewares/authMiddleware";

// 📌 API lấy danh sách tất cả bình luận (Công khai)
export const getAllComments = async (_req: Request, res: Response): Promise<void> => {
  try {
    const comments = await Comment.find()
      .populate("userId", "username") // ✅ Lấy username của người bình luận
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error: unknown) {
    console.error("❌ Lỗi khi lấy danh sách bình luận:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
};


// 📌 API thêm bình luận vào bài viết
export const createComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Người dùng chưa xác thực!" });
      return;
    }

    const postExists = await Post.exists({ _id: req.params.postId });
    if (!postExists) {
      res.status(404).json({ error: "Bài viết không tồn tại!" });
      return;
    }

    const newComment = new Comment({ ...req.body, userId: req.user.id, postId: req.params.postId });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error: unknown) {
    console.error("❌ Lỗi khi tạo bình luận:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
};

// 📌 API lấy bình luận theo bài viết
export const getCommentsByPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("userId", "username") // ✅ Thêm username vào dữ liệu trả về
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error: unknown) {
    console.error("❌ Lỗi khi lấy bình luận theo bài viết:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
};


// 📌 API cập nhật bình luận
export const updateComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Người dùng chưa xác thực!" });
      return;
    }

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      res.status(404).json({ error: "Bình luận không tồn tại!" });
      return;
    }

    if (comment.userId.toString() !== req.user.id) {
      res.status(403).json({ error: "Bạn không có quyền chỉnh sửa bình luận này!" });
      return;
    }

    comment.content = req.body.content;
    await comment.save();

    res.status(200).json(comment);
  } catch (error: unknown) {
    console.error("❌ Lỗi khi cập nhật bình luận:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
};

// 📌 API xóa bình luận
export const deleteComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      res.status(404).json({ error: "Bình luận không tồn tại!" });
      return;
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.status(200).json({ message: "Xóa bình luận thành công!" });
  } catch (error: unknown) {
    console.error("❌ Lỗi khi xóa bình luận:", error);
    res.status(500).json({ error: "Lỗi server!" });
  }
};
