import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faSquareEnvelope } from "@fortawesome/free-solid-svg-icons";

import Facebook from "../assets/images/icon_social/Facebook.png";
import Instagram from "../assets/images/icon_social/Instagram.png";
import Github from "../assets/images/icon_social/Github.png";
import Twitter from "../assets/images/icon_social/Twitter.png";
import Logo from "../assets/logo/Logo.png";

import config from "../../config/config";
import Dropdown from "./Dropdown/Dropdown";
import Button from "../Button/Button";

const Menu = [
  {
    name: "Home",
    to: config.routes.home,
  },
  {
    name: "About",
    to: config.routes.about,
  },
  {
    name: "Menu",
    to: config.routes.menu,
  },
  {
    name: "Pages",
    to: config.routes.pages,
  },
  {
    name: "Contact",
    to: config.routes.contact,
  },
];

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  var userLoggedIn = false;

  return (
    <div className="header">
      <div className="header-social">
        <div className="header-info">
          <div>
            <FontAwesomeIcon icon={faPhone} />
            <span> (414) 857 - 0107</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faSquareEnvelope} />
            <span>yummy@bitrobliss</span>
          </div>
        </div>
        <div className="header-link-social">
          <a href="">
            <img src={Facebook} alt="" />
          </a>
          <a href="">
            <img src={Instagram} alt="" />
          </a>
          <a href="">
            <img src={Twitter} alt="" />
          </a>
          <a href="">
            <img src={Github} alt="" />
          </a>
        </div>
      </div>
      <div className="header-menu">
        <div className="logo">
          <img src={Logo} alt="" />
          <div className="name-logo">Bistro bliss</div>
        </div>
        <div className="nav-menu">
          {Menu.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`nav-Item ${currentPath === item.to ? "active" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="header-actions">
          <div className="cart-section">
            <Link to={config.routes.cart} className="action-cart">
              🛒<span className="cart-badge">10</span>
            </Link>
          </div>

          <div className="auth-section">
            {userLoggedIn ? (
              <Dropdown /> //avatar dropdown
            ) : (
              <>
                <Button small primary>
                  Sign in
                </Button>
                <Button small outline>
                  Sign up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
