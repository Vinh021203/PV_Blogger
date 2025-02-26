import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichTextEditor() {
  const [content, setContent] = useState("");

  return (
    <div>
      <h2 className="text-lg font-semibold">📝 Trình soạn thảo bài viết</h2>
      <ReactQuill value={content} onChange={setContent} />
      <p className="mt-2 text-gray-600">Xem trước nội dung:</p>
      <div className="p-2 bg-gray-100 border">{content}</div>
    </div>
  );
}
