import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faSquareEnvelope } from "@fortawesome/free-solid-svg-icons";

import config from "../../config/config";
import Dropdown from "./Dropdown/Dropdown";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import SocialIcons from "../SocialIcons/SocialIcons";
import CartOverlay from "./CartOverlay/CartOverlay";

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

  const [showCart, setShowCart] = useState(false);

  var userLoggedIn = true;

  const toggleCart = () => {
    setShowCart(!showCart);
  };
  return (
    <div className="header ">
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
        <SocialIcons />
      </div>
      <div className="header-menu">
        <Logo />
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
            <div className="action-cart" onClick={toggleCart}>
              🛒<span className="cart-badge">10</span>
            </div>

            {showCart && (
              <div className="cart-overlay-backdrop" onClick={toggleCart}>
                <CartOverlay onClose={toggleCart} />
              </div>
            )}
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
