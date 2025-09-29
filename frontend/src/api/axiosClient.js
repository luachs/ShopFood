// src/api/axiosClient.js
import axios from "axios";

// Tạo instance chung
const axiosClient = axios.create({
  baseURL: "http://localhost:4000", // backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
});

// 👉 Thêm interceptor request (gắn token nếu có)
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 👉 Thêm interceptor response (xử lý lỗi chung)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ví dụ: nếu hết hạn token → redirect login
    if (error.response && error.response.status === 401) {
      console.error("Token hết hạn, vui lòng đăng nhập lại!");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
