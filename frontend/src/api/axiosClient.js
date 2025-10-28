// src/api/axiosClient.js
import axios from "axios";

// ✅ Tạo instance chung
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // cookie-only
});

// 🧠 Request interceptor
axiosClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// 🔁 Response interceptor

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const message = error.response?.data?.message || "";

    // ⚠️ Nếu token hết hạn → gửi event toàn cục để UI biết
    if (
      status === 401 &&
      (message.includes("expired") || message.includes("TokenExpired"))
    ) {
      window.dispatchEvent(new CustomEvent("tokenExpired"));
      return Promise.reject(error);
    }

    // ⚙️ Thử refresh token tự động (nếu chưa thử)
    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // if (window.location.pathname !== "/login") {
        //   window.location.href = `${import.meta.env.VITE_FRONTEND_URL}/login`;
        // }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
