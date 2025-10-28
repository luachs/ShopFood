import axiosClient from "./axiosClient";

const PermissionGroupApi = {
  getAll: () => axiosClient.get("/permission-groups"),
  getById: (id) => axiosClient.get(`/permission-groups/${id}`),
  add: (data) => axiosClient.post("/permission-groups", data),
  edit: (id, data) => axiosClient.put(`/permission-groups/${id}`, data),
  delete: (id) => axiosClient.delete(`/permission-groups/${id}`),
};

export default PermissionGroupApi;
