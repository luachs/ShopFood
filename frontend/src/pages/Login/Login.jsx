import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import config from "@/config/config";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData); // login sẽ gọi API + lưu cookie + fetch user
      alert("Đăng nhập thành công!");
      window.location.href = config.routes.home;
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi server!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please login to your account</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <Link to={config.routes.register}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
