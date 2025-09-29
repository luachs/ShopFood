import axiosClient from "./axiosClient";

const blogApi = {
  getAll: () => axiosClient.get("/blogs"),
  getById: (id) => axiosClient.get(`/blogs/${id}`),
  add: (data) => axiosClient.post("/blogs", data),
  edit: (id, data) => axiosClient.put(`/blogs/${id}`, data),
  delete: (id) => axiosClient.delete(`/blogs/${id}`),
};

export default blogApi;
