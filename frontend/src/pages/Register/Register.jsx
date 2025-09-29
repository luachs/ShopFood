import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import config from "@/config/config";
import authApi from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirm, setConfirm] = useState("");

  const mutation = useMutation({
    mutationFn: (data) => authApi.register(data),
    onSuccess: (res) => {
      alert(res.data.message);
      navigate(config.routes.login);
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
    if (formData.password !== confirm) {
      alert("Passwords do not match!");
      return;
    }
    mutation.mutate({
      username: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate(config.routes.home);
  }, [navigate]);

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-btn">
            Sign Up
          </button>
        </form>

        <p className="register-footer">
          Already have an account? <Link to={config.routes.login}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
