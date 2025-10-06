// src/api/axiosClient.js
import axios from "axios";

// Tạo instance chung
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, // backend của bạn
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 🧠 Request interceptor — gắn access token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// 🔁 Nếu backend trả 401, gọi refresh
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu đang ở /login hoặc lỗi không phải 401 => bỏ qua
    if (
      error.response?.status !== 401 ||
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    // Tránh lặp vô hạn
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      return axiosClient(originalRequest);
    } catch (refreshError) {
      // ❌ Chỉ logout nếu không ở /login (tránh lặp)
      if (window.location.pathname !== "/login") {
        window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/login`;
      }
      return Promise.reject(refreshError);
    }
  }
);

export default axiosClient;
