import axiosClient from "./axiosClient";

const userApi = {
  getAll: () => axiosClient.get("/users"),
  getSorted: (sortField, sortOrder) =>
    axiosClient.get(`/users?sort=${sortField}&order=${sortOrder}`),
  getById: (id) => axiosClient.get(`/users/${id}`),
  add: (data) => axiosClient.post("/users", data),
  edit: (id, data) => axiosClient.put(`/users/${id}`, data),
  delete: (id) => axiosClient.delete(`/users/${id}`),
};

export default userApi;
