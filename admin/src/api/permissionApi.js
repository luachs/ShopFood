import axiosClient from "./axiosClient";

const PermissionApi = {
  getAll: () => axiosClient.get("/permission"),
  getById: (id) => axiosClient.get(`/permission/${id}`),
  add: (data) => axiosClient.post("/permission", data),
  edit: (id, data) => axiosClient.put(`/permission/${id}`, data),
  delete: (id) => axiosClient.delete(`/permission/${id}`),
};

export default PermissionApi;
