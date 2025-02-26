import axios from "axios";

// 🛠 Đổi URL thành địa chỉ của backend
export const API = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ Đảm bảo backend đang chạy
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Thêm chức năng tự động gán token
export const setAuthToken = (token: string | null) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete API.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// ✅ Kiểm tra token lưu trong LocalStorage khi mở trang
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}
