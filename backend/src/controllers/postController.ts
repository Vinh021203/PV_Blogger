import { Response } from "express";
import Post from "../models/postModel";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Người dùng chưa xác thực!" });
      return;
    }

    const { title, content, image, tags } = req.body;
    const newPost = new Post({
      title,
      content,
      image: image || "https://source.unsplash.com/600x400/?technology",
      tags,
      author: req.user.id,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Lỗi khi tạo bài viết:", err.message);
    res.status(500).json({ error: "Lỗi server!", details: err.message });
  }
};

export const getAllPosts = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const posts = await Post.find()
      .populate("author", "username") // ✅ Hiển thị tên tác giả
      .sort({ createdAt: -1 }) // ✅ Bài viết mới nhất lên đầu
      .limit(10); // ✅ Giới hạn 10 bài viết mới nhất

    res.json(posts);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Lỗi khi lấy danh sách bài viết:", err.message);
    res.status(500).json({ error: "Lỗi server!", details: err.message });
  }
};

export const getPostById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.postId).populate("author", "username");

    if (!post) {
      res.status(404).json({ error: "Không tìm thấy bài viết!" });
      return;
    }

    post.views += 1; // ✅ Tăng lượt xem mỗi khi có người xem bài viết
    await post.save();

    res.json(post);
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Lỗi khi lấy bài viết:", err.message);
    res.status(500).json({ error: "Lỗi server!", details: err.message });
  }
};
