import React, { useEffect, useState } from "react";
import BlogEditor from "../../../Components/Editor/Editor";
import blogApi from "../../../api/blogApi";
import "./EditBlog.css";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blog = await blogApi.getById(id);
        console.log("serrver tra ve", blog);
        setTitle(blog.data.title);
        setContent(blog.data.content);
      } catch (error) {
        console.error("❌ Error creating blog:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("⚠️ Vui lòng nhập đầy đủ tiêu đề và nội dung");
      return;
    }

    try {
      setLoading(true);
      const response = await blogApi.edit(id, { title, content });
      console.log("Blog updated:", response.data);

      alert("✅ Blog updated!");
      setTitle("");
      setContent("");
      navigate("/listblog");
    } catch (err) {
      console.error("❌ Error updating blog:", err);
      alert("Có lỗi xảy ra khi tạo blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-blog-container">
      <h1>Edit Blog</h1>
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
          {loading ? "Đang sửa..." : "Sửa"}
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
