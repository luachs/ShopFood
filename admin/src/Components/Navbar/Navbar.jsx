import React from "react";
import "./Navbar.css";
import Logo from "../Logo/Logo";

import { Link } from "react-router-dom";

import Dropdown from "./Dropdown/Dropdown";
import Button from "../Button/Button";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

  if (loading) return null;
  return (
    <div className="container-navbar ">
      <div className="navbar ">
        <Logo />
        {isAuthenticated && user?.user?.role?._id !== "user" && (
          <Button
            onClick={() => (window.location.href = `${frontendUrl}/`)}
            small
          >
            🏠
          </Button>
        )}

        <div className="auth-section">
          {isAuthenticated ? (
            <Dropdown user={user} onLogout={logout} /> //avatar dropdown
          ) : (
            <>
              <a href={`${frontendUrl}/login`}>
                <Button small primary>
                  login
                </Button>
              </a>
              <a href={`${frontendUrl}/register`}>
                <Button small primary>
                  Sign in
                </Button>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
