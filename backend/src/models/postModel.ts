import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "https://source.unsplash.com/600x400/?technology" }, // ✅ Ảnh mặc định
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String], default: [] },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
