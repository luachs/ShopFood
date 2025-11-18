import axiosClient from "./axiosClient";

const blogApi = {
  getAll: () => axiosClient.get("/blogs"),
  getById: (id) => axiosClient.get(`/blogs/${id}`),
  getSorted: (sortField, sortOrder) =>
    axiosClient.get(`/blogs?sort=${sortField}&order=${sortOrder}`),
  add: (data) => axiosClient.post("/blogs", data),
  edit: (id, data) => axiosClient.put(`/blogs/${id}`, data),
  delete: (id) => axiosClient.delete(`/blogs/${id}`),
  getPaginated: (page, limit, sortField, sortOrder) =>
    axiosClient.get("/blogs", {
      params: { page, limit, sortField, sortOrder },
    }),
};

export default blogApi;
