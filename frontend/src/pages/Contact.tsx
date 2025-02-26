import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    toast.success("🎉 Tin nhắn của bạn đã được gửi!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800">📞 Liên Hệ PVBlogger</h2>
      <p className="mt-2 text-center text-gray-600">
        Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại gửi tin nhắn cho chúng tôi! 📩
      </p>

      {/* 🗺️ Google Map - Hạ Long, Quảng Ninh */}
      <div className="relative w-full mt-6 overflow-hidden rounded-lg shadow-lg">
        <iframe
          title="Bản đồ Hạ Long, Quảng Ninh"
          className="w-full h-64 border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.2615001954525!2d107.07225691533463!3d20.975140294260287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a5905a46202c3%3A0x2bbee749e2aeb8c0!2zSMOyYSBMb25nLCBRdeG6rW5nIE5pbmg!5e0!3m2!1svi!2s!4v1648617008239!5m2!1svi!2s"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* 📝 Form Liên Hệ */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-lg font-semibold text-gray-700">👤 Họ và Tên:</label>
          <input
            type="text"
            placeholder="Nhập họ và tên của bạn..."
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700">📧 Email:</label>
          <input
            type="email"
            placeholder="Nhập email của bạn..."
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700">✍️ Tin nhắn:</label>
          <textarea
            placeholder="Nhập tin nhắn của bạn..."
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          🚀 Gửi Tin Nhắn
        </button>
      </form>
    </div>
  );
}
