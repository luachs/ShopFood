import axiosClient from "./axiosClient";

const PermissionApi = {
  getAll: () => axiosClient.get("/roles"),
  getById: (id) => axiosClient.get(`/roles/${id}`),
  add: (data) => axiosClient.post("/roles", data),
  edit: (id, data) => axiosClient.put(`/roles/${id}`, data),
  delete: (id) => axiosClient.delete(`/roles/${id}`),
};

export default PermissionApi;
