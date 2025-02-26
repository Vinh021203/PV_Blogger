import express from "express";
import {
  createComment,
  getAllComments,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/commentController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/:postId", authMiddleware, createComment); // ✅ Cần đăng nhập để tạo bình luận
router.get("/", getAllComments); // ✅ Công khai API lấy bình luận
// router.get("/:postId/comments", getCommentsByPost); // ✅ Lấy bình luận theo bài viết
router.get("/post/:postId", getCommentsByPost); // ✅ Lấy bình luận theo bài viết
router.put("/:commentId", authMiddleware, updateComment); // ✅ Chỉnh sửa bình luận
router.delete("/:commentId", authMiddleware, deleteComment); // ✅ Xóa bình luận

export default router;
