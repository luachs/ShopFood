import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import config from "@/config/config";
import authApi from "@/api/authApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //React query mutaion
  const mutation = useMutation({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (res) => {
      //luu token vao localstorage
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      alert(res.data.message);
      window.location.href = "/";
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Lỗi server!!");
    },
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
    // TODO: gọi API login
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
