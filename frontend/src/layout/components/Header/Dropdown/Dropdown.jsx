import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Killua from "@/assets/images/avatar/Killua.jpg";
import "./Dropdown.css";
import useDarkMode from "@/hooks/useDarkMode";
import config from "@/config/config";
import authApi from "@/api/authApi";

const Dropdown = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const toggleDropdown = () => setOpenMenu((prev) => !prev);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // 🔹 Đặt handleLogout trước khi dùng
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await authApi.logout({ refreshToken });
      }
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  };

  const DropdownMenu = [
    { name: "Settings", onClick: () => console.log("Settings") },
    { name: "personal information", onClick: () => console.log("Thông tin") },
    {
      name: isDarkMode ? "🌞 Light Mode" : "🌙 Dark Mode",
      onClick: toggleDarkMode,
    },
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
      <img src={Killua} alt="" className="avatar" onClick={toggleDropdown} />
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
