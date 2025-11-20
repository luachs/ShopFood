import React, { useEffect, useState } from "react";
import "./ListUser.css";

import userApi from "../../../api/userApi";
import Button from "../../../Components/Button/Button";
import EditUser from "../EditUser/EditUser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const [sortField, setSortField] = useState("email");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch users với sort + pagination
  const fetchUser = async () => {
    try {
      const res = await userApi.getPaginated(page, limit, sortField, sortOrder);
      setUsers(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục: ", error);
      setUsers([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [sortField, sortOrder, page]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setPage(1); // reset page khi đổi sort
  };

  const handleDelete = async (id) => {
    try {
      await userApi.delete(id);
      fetchUser(); // refetch sau khi xóa
    } catch (error) {
      console.log("Lỗi xóa: ", error);
    }
  };

  return (
    <div className="list-product">
      <h1>List User</h1>
      <table cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>STT</th>
            <th
              onClick={() => handleSort("email")}
              style={{ cursor: "pointer" }}
            >
              email{" "}
              {sortField === "email" &&
                (sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faArrowUpWideShort} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                ))}
            </th>
            <th
              onClick={() => handleSort("username")}
              style={{ cursor: "pointer" }}
            >
              name
              {sortField === "username" &&
                (sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faArrowUpWideShort} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                ))}
            </th>
            <th
              onClick={() => handleSort("role")}
              style={{ cursor: "pointer" }}
            >
              role
              {sortField === "role" &&
                (sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faArrowUpWideShort} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                ))}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td data-label="ID">{(page - 1) * limit + idx + 1}</td>
              <td data-label="Email">{user.email}</td>
              <td data-label="Username">{user.username}</td>
              <td data-label="Role">{user.role || "No role"}</td>
              <td data-label="Actions">
                <button
                  className="btn-edit"
                  onClick={() => {
                    setShowEditModal(true);
                    setEditUser(user);
                  }}
                >
                  Sửa
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(user._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal Edit */}
      {showEditModal && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Chỉnh sửa người dùng</h2>
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                X
              </button>
            </div>
            <div>
              <EditUser
                userId={editUser._id}
                onUpdate={async () => {
                  setShowEditModal(false);
                  fetchUser();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUser;
