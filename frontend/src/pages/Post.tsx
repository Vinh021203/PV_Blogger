import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { API } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(false);
  const navigate = useNavigate();

  // Lưu dữ liệu vào localStorage để tránh mất nội dung khi tải lại trang
  useEffect(() => {
    const savedTitle = localStorage.getItem("draftTitle");
    const savedContent = localStorage.getItem("draftContent");
    const savedImage = localStorage.getItem("draftImage");

    if (savedTitle) setTitle(savedTitle);
    if (savedContent) setContent(savedContent);
    if (savedImage) setImage(savedImage);

    // Kiểm tra nếu chưa đăng nhập thì điều hướng về trang đăng nhập
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("❌ Bạn cần đăng nhập để viết bài!");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("draftTitle", title);
    localStorage.setItem("draftContent", content);
    localStorage.setItem("draftImage", image);
  }, [title, content, image]);

  const handlePost = async () => {
    if (!title || !content) {
      toast.error("⚠️ Vui lòng nhập tiêu đề và nội dung!");
      return;
    }

    try {
      await API.post(
        "/posts",
        { title, content, image },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      toast.success("🎉 Bài viết đã được đăng thành công!");
      setTitle("");
      setContent("");
      setImage("");
      setPreview(false);
      localStorage.removeItem("draftTitle");
      localStorage.removeItem("draftContent");
      localStorage.removeItem("draftImage");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "❌ Lỗi server!");
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800">📝 Viết bài mới</h2>

      {/* Tiêu đề bài viết */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Tiêu đề bài viết..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
          value={title}
          maxLength={100}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="mt-1 text-sm text-gray-500">{title.length} / 100 ký tự</p>
      </div>

      {/* Ảnh bài viết */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="URL ảnh bài viết (không bắt buộc)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="object-cover w-full mt-3 border border-gray-200 rounded-lg h-52"
          />
        )}
      </div>

      {/* Nội dung bài viết */}
      <div className="mt-4">
        <label className="text-lg font-semibold text-gray-700">📝 Nội dung:</label>
        <ReactQuill
          className="mt-2 bg-white"
          value={content}
          onChange={setContent}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote", "code-block"],
              ["link", "image"],
              ["clean"],
            ],
          }}
        />
        <p className="mt-1 text-sm text-gray-500">{content.length} ký tự</p>
      </div>

      {/* Nút hành động */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setPreview(!preview)}
          className="px-4 py-2 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
        >
          {preview ? "✏️ Chỉnh sửa" : "👀 Xem trước"}
        </button>
        <button
          onClick={handlePost}
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
          🚀 Đăng bài
        </button>
      </div>

      {/* Xem trước bài viết */}
      {preview && (
        <div className="p-4 mt-6 border rounded-lg shadow bg-gray-50">
          <h3 className="text-2xl font-bold">{title || "Tiêu đề bài viết"}</h3>
          {image && <img src={image} alt="Preview" className="object-cover w-full h-48 mt-2 rounded-lg" />}
          <div
            className="mt-4 text-gray-700"
            dangerouslySetInnerHTML={{ __html: content || "<p>Nội dung bài viết...</p>" }}
          />
        </div>
      )}
    </div>
  );
}
