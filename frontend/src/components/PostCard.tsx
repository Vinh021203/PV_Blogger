import React from "react";
import { Link } from "react-router-dom";

interface PostProps {
  post: {
    _id: string;
    title: string;
    content: string;
    image?: string;
    author?: { username: string };
    createdAt?: string;
  };
}

export default function PostCard({ post }: PostProps) {
  return (
    <div className="flex overflow-hidden bg-white rounded-lg shadow-md">
      {/* Hình ảnh bài viết */}
      <img src={post.image || "https://source.unsplash.com/600x400/?technology"} 
           alt={post.title} className="object-cover w-1/3 h-auto" />

      {/* Nội dung bài viết */}
      <div className="flex flex-col justify-between w-2/3 p-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
          <p className="text-gray-600">{post.content.substring(0, 80)}...</p>
        </div>
        <Link to={`/post/${post._id}`} className="mt-2 text-blue-500 hover:underline">
          Đọc thêm →
        </Link>
      </div>
    </div>
  );
}
