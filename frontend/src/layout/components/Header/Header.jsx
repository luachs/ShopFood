import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faSquareEnvelope } from "@fortawesome/free-solid-svg-icons";

import config from "@/config/config";
import Dropdown from "./Dropdown/Dropdown";
import Button from "@/components/Button/Button";
import Logo from "@/components/Logo/Logo";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import CartOverlay from "./CartOverlay/CartOverlay";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import SearchProduct from "./SearchProduct/SearchProduct";

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
    to: config.routes.blog,
  },
  {
    name: "Contact",
    to: config.routes.contact,
  },
];

const Header = () => {
  const [isScreenMobile, seIsScreenMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 800;
    }
    return false;
  });
  const { totalQuantity } = useCart();
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;
  const AdminUrl = import.meta.env.VITE_ADMIN_URL;

  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };
  useEffect(() => {
    const handleResize = () => {
      seIsScreenMobile(window.innerWidth <= 800);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
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
          {isAuthenticated && user?.user?.role?._id !== "user" && (
            <Button
              small
              onClick={() => (window.location.href = `${AdminUrl}`)}
              className="admin-layout"
            >
              Admin
            </Button>
          )}
        </div>
        <SocialIcons />
      </div>
      <div className="header-menu">
        <Logo />
        {!isScreenMobile && (
          <div className="nav-menu">
            {Menu.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`nav-Item ${
                  currentPath === item.to ||
                  currentPath.startsWith(item.to + "/")
                    ? "active"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}

        <div className="header-actions">
          {/* Search product */}
          <div className="search-product-container">
            <SearchProduct />
          </div>
          {isAuthenticated && (
            <div className="cart-section">
              <div className="action-cart" onClick={toggleCart}>
                🛒
                {totalQuantity > 0 && (
                  <span className="cart-badge">{totalQuantity}</span>
                )}
              </div>
              {showCart && (
                <div className="cart-overlay-backdrop" onClick={toggleCart}>
                  <CartOverlay onClose={toggleCart} />
                </div>
              )}
            </div>
          )}

          <div className="auth-section">
            {loading ? (
              <span>Loading...</span>
            ) : isAuthenticated ? (
              <Dropdown user={user} />
            ) : (
              <>
                <Link to={config.routes.login}>
                  <Button small primary>
                    Login
                  </Button>
                </Link>
                <Link to={config.routes.register}>
                  <Button small primary>
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {isScreenMobile && (
        <div className="nav-menu-mobile">
          <div className="nav-menu">
            {Menu.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`nav-Item ${
                  currentPath === item.to ||
                  currentPath.startsWith(item.to + "/")
                    ? "active"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
