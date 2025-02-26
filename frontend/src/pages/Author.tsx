import React from "react";
import { useParams } from "react-router-dom";

// Fake dữ liệu tác giả
const authors = [
  { id: "1", name: "Nguyễn Văn A", bio: "Tôi là một blogger chuyên về công nghệ." },
  { id: "2", name: "Trần Thị B", bio: "Viết lách là niềm đam mê của tôi." },
  { id: "3", name: "Phạm Văn C", bio: "Chia sẻ kiến thức về lập trình và AI." },
];

export default function Author() {
  const { id } = useParams();
  const author = authors.find((a) => a.id === id);

  if (!author) return <p className="text-red-500">Tác giả không tồn tại!</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{author.name}</h2>
      <p className="mt-2 text-gray-700">{author.bio}</p>
    </div>
  );
}
