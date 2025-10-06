import axiosClient from "./axiosClient";

const authApi = {
  register: (data) => axiosClient.post("/auth/register", data),
  login: (data) => axiosClient.post("/auth/login", data),
  refresh: () => axiosClient.post("/auth/refresh"),
  logout: () => axiosClient.post("/auth/logout"),
};

export default authApi;
