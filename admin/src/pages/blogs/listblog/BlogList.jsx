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
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  const [sortField, setSortField] = useState("_id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // ==============================
  // API GET Blogs (Pagination + Sort)
  // ==============================
  const fetchBlogs = async () => {
    try {
      const res = await blogApi.getPaginated(page, limit, sortField, sortOrder);
      setBlogs(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("❌ Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, sortField, sortOrder]);

  // ==============================
  // Sort Handler
  // ==============================
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1); // reset page khi đổi sort
  };

  // ==============================
  // Delete Blog
  // ==============================
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa blog này?")) return;

    try {
      await blogApi.delete(id);
      alert("✅ Xóa thành công!");
      fetchBlogs(); // làm tươi lại page hiện tại
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
              <td>{((pagination.page || 1) - 1) * limit + index + 1}</td>
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

      {/* ===== PAGINATION ===== */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>
        <span style={{ padding: "0 10px" }}>
          Page {pagination.page} / {pagination.totalPages}
        </span>
        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogList;
