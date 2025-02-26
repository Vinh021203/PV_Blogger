import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { API } from "../utils/api";
import AdBanner from "../components/AdBanner";
import { toast } from "react-toastify";

interface Post {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author?: { username: string };
  createdAt?: string;
}

interface Comment {
  _id: string;
  content: string;
  author?: { username: string }; // ✅ Fix lỗi nếu `author` không tồn tại
  createdAt: string;
}

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    API.get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(() => {
        navigate("/");
      });

    // ✅ Đúng API lấy bình luận theo bài viết
    API.get(`/comments/post/${id}`)
      .then((res) => {
        const formattedComments = res.data.map((comment: any) => ({
          _id: comment._id,
          content: comment.content,
          author: comment.author ? { username: comment.author.username } : { username: "Ẩn danh" }, // ✅ Fix lỗi nếu author không tồn tại
          createdAt: comment.createdAt,
        }));
        setComments(formattedComments);
      })
      .catch(() => setComments([]));

    API.get("/posts")
      .then((res) => {
        const randomPosts = res.data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setRelatedPosts(randomPosts);
      })
      .catch(() => setRelatedPosts([]));

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [id, navigate]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      toast.error("Vui lòng nhập bình luận!");
      return;
    }

    if (!user) {
      toast.error("Bạn cần đăng nhập để bình luận!");
      return;
    }

    try {
      const res = await API.post(
        `/comments/${id}`, // ✅ API đúng
        { content: newComment },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setComments([...comments, { 
        _id: res.data._id, 
        content: res.data.content, 
        author: { username: user.username }, // ✅ Fix lỗi không có `author`
        createdAt: res.data.createdAt 
      }]);

      setNewComment("");
      toast.success("📝 Bình luận đã được thêm!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Không thể gửi bình luận!");
    }
  };

  if (loading) return <p className="text-center text-blue-500">⏳ Đang tải bài viết...</p>;
  if (!post) return <p className="text-center text-red-500">❌ Bài viết không tồn tại!</p>;

  return (
    <div className="container p-6 mx-auto">
      <AdBanner position="top" />

      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-lg md:col-span-2">
          <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
          <p className="mt-2 text-gray-600">
            ✍️ Viết bởi <span className="font-semibold">{post.author?.username || "Ẩn danh"}</span>
          </p>
          {post.image && (
            <img src={post.image} alt={post.title} className="object-cover w-full h-64 mb-4 rounded-lg" />
          )}
          <hr className="my-4" />
          <div
            className="text-lg leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/<p>/g, "").replace(/<\/p>/g, "") }}
          />
        </div>

        {/* 📌 Bài viết liên quan - Nổi bật hơn */}
        <aside className="p-6 bg-gray-100 rounded-lg shadow-md md:col-span-1">
          <AdBanner position="sidebar" />
          <h2 className="mt-6 text-2xl font-bold text-gray-700">📌 Bài viết liên quan</h2>

          {relatedPosts.length > 0 ? (
            <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
              <ul className="space-y-3">
                {relatedPosts.map((relatedPost) => (
                  <li key={relatedPost._id} className="p-3 transition border rounded-md hover:bg-gray-50">
                    <Link to={`/post/${relatedPost._id}`} className="block font-semibold text-blue-500 hover:underline">
                      {relatedPost.title}
                    </Link>
                    {relatedPost.image && (
                      <img src={relatedPost.image} alt={relatedPost.title} className="object-cover w-full h-32 mt-2 rounded-md" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">Không có bài viết liên quan.</p>
          )}
        </aside>
      </div>

      {/* 💬 Bình luận */}
      <div className="p-6 mt-6 bg-white rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800">💬 Bình luận</h3>

        {/* Form nhập bình luận */}
        <div className="mt-4">
          <textarea
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
            placeholder="Nhập bình luận của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            ✏️ Gửi bình luận
          </button>
        </div>

        {/* Danh sách bình luận */}
        <div className="mt-6">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="p-3 mt-3 border rounded-lg">
                <p className="text-sm font-semibold">{comment.author?.username || "Ẩn danh"}</p> {/* ✅ Fix lỗi undefined */}
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Chưa có bình luận nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}
