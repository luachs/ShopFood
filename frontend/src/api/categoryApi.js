import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: () => axiosClient.get("/categories").then((res) => res.data),
  getById: (id) => axiosClient.get(`/categories/${id}`).then((res) => res.data),
  add: (data) =>
    axiosClient.post("/categories/create", data).then((res) => res.data),
  edit: (id, data) =>
    axiosClient.put(`/categories/update/${id}`, data).then((res) => res.data),
  remove: (id) =>
    axiosClient.delete(`/categories/delete/${id}`).then((res) => res.data),
};

export default categoryApi;
