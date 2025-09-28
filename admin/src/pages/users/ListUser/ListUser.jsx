import React, { useEffect, useState } from "react";
import "./ListUser.css";

import { Link } from "react-router-dom";
import userApi from "../../../api/userApi";

const ListUser = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = async (id) => {
    try {
      const res = await userApi.remove(id);
      console.log("Xoá thành công:", res);
      setUsers((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.log("Lỗi xóa: ", error);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userApi.getAll();
        console.log("API users:", data.data);
        setUsers(data.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục: ", error);
        setUsers([]); // fallback tránh crash
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="list-product">
      <h1>List User</h1>
      <table cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>STT</th>
            <th>email</th>
            <th>name</th>
            <th>role</th>
            <th>permissions</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, id) => (
            <tr key={id}>
              <td data-label="ID">{id + 1}</td>
              <td data-label="Name">{user.email}</td>
              <td data-label="Description">{user.username}</td>
              <td data-label="Description">{user.role}</td>
              <td data-label="Description">
                {user.permissions && user.permissions.length > 0
                  ? user.permissions.join(", ")
                  : "—"}
              </td>

              <td data-label="Actions">
                <Link to={`/listuser/${user._id}`}>
                  <button className="btn-edit">Sửa</button>
                </Link>

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
    </div>
  );
};

export default ListUser;
