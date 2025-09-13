// src/api/productApi.js
import axiosClient from "./axiosClient";

const productApi = {
  getAll: () => axiosClient.get("/products/allproduct"),
  add: (data) => axiosClient.post("/products/addproduct", data),
  remove: (id) => axiosClient.post("./products/removeproduct", { id }),
};

export default productApi;
