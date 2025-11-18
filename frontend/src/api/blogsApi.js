import axiosClient from "./axiosClient";

const blogApi = {
  getAll: () => axiosClient.get("/blogs"),
  getById: (id) => axiosClient.get(`/blogs/${id}`),
  add: (data) => axiosClient.post("/blogs", data),
  edit: (id, data) => axiosClient.put(`/blogs/${id}`, data),
  delete: (id) => axiosClient.delete(`/blogs/${id}`),
  getPaginated: (
    page = 1,
    limit = 6,
    sortField = "createdAt",
    sortOrder = "desc"
  ) =>
    axiosClient.get("/blogs", {
      params: { page, limit, sortField, sortOrder },
    }),
};

export default blogApi;
