import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="shadow-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <nav className="container flex items-center justify-between px-6 py-4 mx-auto">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white transition-transform transform hover:scale-105">
          🌟 PVBlogger
        </Link>

        {/* Menu */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-white transition hover:text-gray-200">🏠 Trang chủ</Link>
          <Link to="/post" className="text-white transition hover:text-gray-200">📝 Viết bài</Link>
          <Link to="/about" className="text-white transition hover:text-gray-200">ℹ️ Giới thiệu</Link>

          {/* Nếu đã đăng nhập */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="px-4 py-2 font-semibold text-white bg-white bg-opacity-50 rounded-lg hover:bg-opacity-75"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.username} ⏷
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    👤 Thông tin cá nhân
                  </Link>
                  <Link to="/my-posts" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    📝 Bài viết của tôi
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-200"
                  >
                    🚪 Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Nếu chưa đăng nhập
            <div className="space-x-4">
              <Link to="/login" className="px-4 py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700">
                🔑 Đăng nhập
              </Link>
              <Link to="/register" className="px-4 py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600">
                🆕 Đăng ký
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
