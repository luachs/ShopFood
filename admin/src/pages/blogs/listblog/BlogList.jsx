import React, { useEffect, useState } from "react";
import "./BlogList.css"; // File CSS riêng
import blogApi from "../../../api/blogApi";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [sortField, setSortField] = useState("_id");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchBlogs = async () => {
    try {
      const res = await blogApi.getSorted(sortField, sortOrder);
      setBlogs(res.data);
    } catch (err) {
      console.error("❌ Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [sortField, sortOrder]);

  // ✅ Sửa đúng handleSort
  const handleSort = (field) => {
    if (sortField === field) {
      // Đảo chiều sort
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Chọn field mới, reset về asc
      setSortField(field);
      setSortOrder("asc");
    }
  };

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
            <th onClick={() => handleSort("_id")} style={{ cursor: "pointer" }}>
              id{" "}
              {sortField === "_id" &&
                (sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faArrowUpWideShort} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                ))}
            </th>
            <th
              onClick={() => handleSort("title")}
              style={{ cursor: "pointer" }}
            >
              Title{" "}
              {sortField === "title" &&
                (sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faArrowUpWideShort} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                ))}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{index + 1}</td>
              <td>{blog._id}</td>
              <td title={blog.title}>{blog.title}</td>
              <td>
                <Link to={`/editblog/${blog._id}`} className="btn-edit">
                  Sửa
                </Link>
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
