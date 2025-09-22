import React, { useState } from "react";
import BlogEditor from "../../../Components/Editor/Editor";
import blogApi from "../../../api/blogApi";
import "./AddBlog.css";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("⚠️ Vui lòng nhập đầy đủ tiêu đề và nội dung");
      return;
    }

    try {
      setLoading(true);
      const response = await blogApi.add({ title, content });
      console.log("Blog created:", response.data);

      alert("✅ Blog created!");
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("❌ Error creating blog:", err);
      alert("Có lỗi xảy ra khi tạo blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-blog-container">
      <h1>Add Blog</h1>
      <form className="add-blog-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="add-blog-input"
        />

        <BlogEditor value={content} onChange={setContent} />

        <button type="submit" disabled={loading} className="add-blog-button">
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
