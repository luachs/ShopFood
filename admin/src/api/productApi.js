// src/api/productApi.js
import axiosClient from "./axiosClient";

const productApi = {
  getAll: () => axiosClient.get("/allproducts"),
  add: (data) => axiosClient.post("/addproduct", data),
};

export default productApi;
