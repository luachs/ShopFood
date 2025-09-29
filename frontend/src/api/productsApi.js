// src/api/productApi.js
import axiosClient from "./axiosClient";

const productApi = {
  getAll: () => axiosClient.get("/products/allproduct"),
  add: (data) => axiosClient.post("/products/addproduct", data),
  remove: (id) => axiosClient.delete(`/products/${id}/removeproduct`),
  getById: (id) => axiosClient.get(`/products/${id}`),
  edit: (id, data) => axiosClient.put(`/products/${id}/editproduct`, data),
};

export default productApi;
