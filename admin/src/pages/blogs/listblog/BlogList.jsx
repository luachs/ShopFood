import React, { useEffect, useState } from "react";
import "./BlogList.css"; // File CSS riêng
import blogApi from "../../../api/blogApi";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogApi.getAll();
        setBlogs(response.data);
      } catch (err) {
        console.error("❌ Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa blog này?")) return;

    try {
      await blogApi.delete(id);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      alert("✅ Xóa thành công!");
    } catch (err) {
      console.error("❌ Error deleting blog:", err);
      alert("Có lỗi khi xóa blog");
    }
  };

  return (
    <div className="blog-list-container">
      <h2>List Blog</h2>
      <table className="blog-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>id</th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{index + 1}</td>
              <td>{blog._id}</td>
              <td>{blog.title}</td>
              <td>
                <button className="btn-edit">Sửa</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(blog._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {blogs.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                Không có blog nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
