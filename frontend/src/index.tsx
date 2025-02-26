import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";

// Tạo QueryClient instance cho React Query
const queryClient = new QueryClient();

// Tạo root cho React 18+
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // ❌ Bỏ <React.StrictMode> để tránh lỗi findDOMNode
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
} else {
  console.error("❌ Lỗi: Không tìm thấy phần tử #root trong HTML!");
}
