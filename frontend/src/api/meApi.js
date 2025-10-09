import axiosClient from "./axiosClient";

const meApi = {
  get: () => axiosClient.get("/me/profile"),
  getPublic: (id) => axiosClient.get(`/me/profile/${id}/public`),
  edit: () => axiosClient.put("/me/profile"),
};

export default meApi;
