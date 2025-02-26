import React, { useState } from "react";
import { API } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      await API.post("/auth/register", { username, email, password });
      toast.success("🎉 Đăng ký thành công! Hãy đăng nhập.");
      navigate("/login"); // 🛠 Chuyển hướng đến trang đăng nhập
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Lỗi server!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">📝 Đăng ký</h2>
        <p className="mt-2 text-sm text-center text-gray-500">
          Tạo tài khoản để tham gia cộng đồng của chúng tôi!
        </p>

        <div className="mt-6">
          {/* Tên đăng nhập */}
          <label className="block text-sm font-semibold text-gray-600">Tên đăng nhập</label>
          <input
            type="text"
            placeholder="Nhập tên đăng nhập..."
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Email */}
          <label className="block mt-4 text-sm font-semibold text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Nhập email..."
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Mật khẩu */}
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
              className="absolute text-gray-600 right-3 top-4 hover:text-gray-900"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          {/* Nút đăng ký */}
          <button
            onClick={handleRegister}
            className="w-full px-4 py-3 mt-6 font-semibold text-white transition bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            🚀 Đăng ký ngay
          </button>
        </div>

        {/* Đã có tài khoản? */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Đã có tài khoản?{" "}
          <Link to="/login" className="font-medium text-blue-500 hover:underline">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
