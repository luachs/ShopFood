import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: async () => {
    const res = await axiosClient.get("/categories");
    // Trường hợp backend trả thẳng mảng
    if (Array.isArray(res.data)) {
      return res.data;
    }
    // Trường hợp backend trả { success: true, data: [...] }
    if (res.data.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    return []; // fallback an toàn
  },
  getById: (id) => axiosClient.get(`/categories/${id}`).then((res) => res.data),
  add: (data) =>
    axiosClient.post("/categories/create", data).then((res) => res.data),
  edit: (id, data) =>
    axiosClient.put(`/categories/update/${id}`, data).then((res) => res.data),
  remove: (id) =>
    axiosClient.delete(`/categories/delete/${id}`).then((res) => res.data),
};

export default categoryApi;
