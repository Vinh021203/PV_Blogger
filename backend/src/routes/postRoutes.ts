import express from "express";
import { createPost, getAllPosts, getPostById } from "../controllers/postController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:postId", getPostById); // ✅ Lấy bài viết theo ID
router.post("/", authMiddleware, createPost);

export default router;
