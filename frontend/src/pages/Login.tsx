import React, { useState } from "react";
import { API } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      // 🛠 Lưu token và user vào localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔥 Bắn event storage để cập nhật Header
      window.dispatchEvent(new Event("storage"));

      toast.success(`🎉 Chào mừng ${res.data.user.username}!`);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Lỗi đăng nhập!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">🔑 Đăng nhập</h2>
        <p className="mt-2 text-sm text-center text-gray-500">Vui lòng nhập thông tin của bạn</p>

        <div className="mt-6">
          {/* Email Input */}
          <label className="block text-sm font-semibold text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Nhập email..."
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Mật khẩu Input */}
          <label className="block mt-4 text-sm font-semibold text-gray-600">Mật khẩu</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu..."
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-4 text-gray-600 hover:text-gray-900"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          {/* Quên mật khẩu */}
          <div className="flex justify-end mt-2">
            <button
              onClick={() => alert("Tính năng quên mật khẩu đang phát triển!")}
              className="text-sm text-blue-500 hover:underline"
            >
              Quên mật khẩu?
            </button>
          </div>

          {/* Nút đăng nhập */}
          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 mt-4 font-semibold text-white transition bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            🚀 Đăng nhập
          </button>
        </div>

        {/* Đăng ký */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="font-medium text-blue-500 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
