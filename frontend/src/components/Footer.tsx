import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="p-10 text-white bg-gradient-to-r from-blue-800 to-purple-900">
      <div className="max-w-6xl mx-auto text-center">
        <div className="grid items-center grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* 🌟 About PVBlogger */}
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
              PVBlogger 🚀
            </h2>
            <p className="max-w-xs text-sm text-gray-200">
              Chia sẻ đam mê lập trình, công nghệ và cuộc sống. Khám phá thế giới sáng tạo qua từng bài viết! 🎨💻
            </p>
          </div>

          {/* 📌 Quick Links */}
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-lg font-semibold text-gray-100">🔗 Liên Kết Nhanh</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/about" className="transition duration-300 hover:text-yellow-300">ℹ️ Về PVBlogger</Link>
              </li>
              <li>
                <Link to="/" className="transition duration-300 hover:text-yellow-300">📰 Bài Viết</Link>
              </li>
              <li>
                <Link to="/contact" className="transition duration-300 hover:text-yellow-300">📞 Liên Hệ</Link>
              </li>
            </ul>
          </div>

          {/* 🌍 Social Media Links */}
          <div className="flex flex-col items-center">
            <h2 className="mb-4 text-lg font-semibold text-gray-100">📲 Theo Dõi Chúng Tôi</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 transition duration-300 hover:text-blue-400">
                <i className="text-2xl fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 transition duration-300 hover:text-blue-400">
                <i className="text-2xl fab fa-twitter"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 transition duration-300 hover:text-blue-400">
                <i className="text-2xl fab fa-github"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-300 transition duration-300 hover:text-red-500">
                <i className="text-2xl fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        {/* 🎨 Copyright Section */}
        <div className="pt-8 mt-8 border-t border-gray-700">
          <p className="text-sm text-gray-300">
            © 2025 <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">PVBlogger</span>. 
            Mọi quyền được bảo lưu. 💖
          </p>
        </div>
      </div>
    </footer>
  );
}
