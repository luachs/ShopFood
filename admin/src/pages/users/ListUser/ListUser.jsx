import React, { useEffect, useState } from "react";
import "./ListUser.css";

import userApi from "../../../api/userApi";
import Button from "../../../Components/Button/Button";
import EditUser from "../EditUser/EditUser";
import AddUser from "../AddUser/AddUser";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

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
      <Button primary onClick={() => setShowAddModal(true)}>
        Add user
      </Button>
      <h1>List User</h1>
      <table cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>STT</th>
            <th>email</th>
            <th>name</th>
            <th>role</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, id) => (
            <tr key={id}>
              <td data-label="ID">{id + 1}</td>
              <td data-label="Name">{user.email}</td>
              <td data-label="Description">{user.username}</td>
              <td data-label="Description">{user.role._id}</td>

              <td data-label="Actions">
                <button
                  className="btn-edit"
                  onClick={() => {
                    setShowEditModal(true);
                    setEditUser(user);
                    console.log(user._id);
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
      {showEditModal && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Chỉnh sửa người dùng</h2>
              <button
                className="close-btn"
                onClick={() => {
                  setShowEditModal(false);
                }}
              >
                X
              </button>
            </div>
            <div>
              <EditUser
                userId={editUser._id}
                onUpdate={async () => {
                  const res = await userApi.getAll();
                  setUsers(res.data);
                }}
              />
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Chỉnh sửa người dùng</h2>
              <button
                className="close-btn"
                onClick={() => {
                  setShowAddModal(false);
                }}
              >
                X
              </button>
            </div>
            <div>
              <AddUser
                onAdded={async () => {
                  setShowAddModal(false);
                  const res = await userApi.getAll();
                  setUsers(res.data);
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
