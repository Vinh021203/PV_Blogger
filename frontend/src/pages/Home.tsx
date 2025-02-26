import React, { useEffect, useState } from "react";
import { API } from "../utils/api";
import PostCard from "../components/PostCard";
import AdBanner from "../components/AdBanner";
import { Link } from "react-router-dom";

// 🛠 Định nghĩa kiểu dữ liệu cho bài viết
interface Post {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author?: { username: string };
  createdAt?: string;
}

export default function Home() {
  // 🛠 Khai báo kiểu dữ liệu rõ ràng
  const [posts, setPosts] = useState<Post[]>([]);
  const [popularPosts, setPopularPosts] = useState<Post[]>([]);

  useEffect(() => {
    API.get("/posts")
      .then((res) => {
        setPosts(res.data);
        setPopularPosts(res.data.sort(() => 0.5 - Math.random()).slice(0, 5));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container px-6 py-8 mx-auto">
      {/* Banner quảng cáo trên đầu trang */}
      <AdBanner position="top" />

      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
        {/* Cột chính - Danh sách bài viết */}
        <div className="space-y-8 md:col-span-2">
          <h1 className="pb-4 text-4xl font-bold text-gray-800 border-b">
            📰 Bài viết mới nhất
          </h1>

          {posts.length > 0 ? (
            <>
              <PostCard post={posts[0]} />
              <AdBanner position="middle" />
              <div className="grid gap-6 md:grid-cols-2">
                {posts.slice(1, 5).map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </>
          ) : (
            <p className="py-10 text-lg text-center text-gray-500">
              ⏳ Đang tải bài viết...
            </p>
          )}
        </div>

        {/* Sidebar - Bài viết phổ biến và danh mục động */}
        <aside className="p-6 space-y-6 rounded-lg shadow-lg bg-gray-50 md:col-span-1">
          {/* Quảng cáo trong sidebar */}
          <AdBanner position="sidebar" />

          <div>
            <h2 className="pb-2 text-2xl font-bold text-gray-700 border-b">
              🔥 Bài viết phổ biến
            </h2>
            <ul className="mt-4 space-y-3">
              {popularPosts.length > 0 ? (
                popularPosts.map((post) => (
                  <li key={post._id}>
                    <Link
                      to={`/post/${post._id}`}
                      className="block text-gray-700 transition hover:text-blue-500"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Không có bài viết phổ biến.</p>
              )}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
