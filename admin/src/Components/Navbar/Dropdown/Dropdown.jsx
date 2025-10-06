import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import avatar from "../../../assets/Killua.jpg";
import "./Dropdown.css";
import authApi from "../../../api/authApi";

const Dropdown = ({ user }) => {
  const dropdownRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

  const toggleDropdown = () => setOpenMenu((prev) => !prev);

  // 🔹 Đặt handleLogout trước khi dùng
  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      window.location.href = `${frontendUrl}/login`;
    }
  };

  const DropdownMenu = [
    { name: "Settings", onClick: () => console.log("Settings") },
    { name: "personal information", onClick: () => console.log("Thông tin") },
    { type: "divider" },
    { name: "Log out", onClick: handleLogout },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <img
        src={user?.avatar || avatar}
        alt=""
        className="avatar"
        onClick={toggleDropdown}
      />
      {openMenu && (
        <div className="dropdown-menu">
          {DropdownMenu.map((item, index) => {
            if (item.type === "divider")
              return <hr key={index} className="dropdown-divider" />;

            return (
              <div key={index} className="dropdown-item" onClick={item.onClick}>
                {item.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
