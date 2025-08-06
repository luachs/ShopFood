import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Killua from "@/assets/images/avatar/Killua.jpg";
import "./Dropdown.css";

const DropdownMenu = [
  { name: "Settings", onClick: () => console.log("Settings") },
  { name: "personal information", onClick: () => console.log("Thông tin") },
  { type: "divider" },
  { name: "Log out", path: "/login" },
];

const Dropdown = () => {
  const dropdownRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const toggleDropdown = () => setOpenMenu((prev) => !prev);

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
            if (item.type === "divider") {
              return <hr key={index} className="dropdown-divider" />;
            }
            return item.path ? (
              <Link to={item.path} key={index} className="dropdown-item">
                {item.name}
              </Link>
            ) : (
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
