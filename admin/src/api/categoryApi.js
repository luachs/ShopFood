import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: () => axiosClient.get("/categories"),
  getById: (id) => axiosClient.get(`/categories/${id}`),
  add: (data) => axiosClient.post("/categories/create", data),
  edit: (id, data) => axiosClient.put(`/categories/update/${id}`, data),
  remove: (id) => axiosClient.delete(`/categories/delete/${id}`),
};

export default categoryApi;
