import React from "react";

export default function About() {
  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800">ℹ️ Giới thiệu về PVBlogger</h1>
      <p className="mt-4 text-lg leading-relaxed text-gray-700">
        PVBlogger là nền tảng chia sẻ kiến thức, nơi mà các lập trình viên và người yêu công nghệ
        có thể đăng tải bài viết, thảo luận, và cùng nhau học hỏi.
      </p>
      
      <h2 className="mt-6 text-2xl font-semibold text-gray-800">🌟 Sứ mệnh của chúng tôi</h2>
      <p className="mt-2 text-gray-700">
        Mang đến một nền tảng blogging hiện đại, dễ sử dụng, hỗ trợ mọi lập trình viên và người yêu công nghệ chia sẻ tri thức.
      </p>

      <h2 className="mt-6 text-2xl font-semibold text-gray-800">💡 Tính năng nổi bật</h2>
      <ul className="mt-2 space-y-2 text-gray-700">
        <li>✅ Đăng bài viết nhanh chóng với trình soạn thảo hiện đại</li>
        <li>✅ Bình luận và tương tác với cộng đồng</li>
        <li>✅ Quản lý bài viết cá nhân và xem lại lịch sử</li>
        <li>✅ Hỗ trợ đa nền tảng, giao diện thân thiện</li>
      </ul>

      <h2 className="mt-6 text-2xl font-semibold text-gray-800">📬 Liên hệ với chúng tôi</h2>
      <p className="mt-2 text-gray-700">
        Nếu bạn có câu hỏi hoặc góp ý, hãy liên hệ chúng tôi qua email:{" "}
        <a href="mailto:support@pvblogger.com" className="text-blue-500 hover:underline">
          support@pvblogger.com
        </a>
      </p>
    </div>
  );
}
