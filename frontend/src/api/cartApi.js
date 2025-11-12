// src/api/cartApi.js
import axiosClient from "./axiosClient";

const cartApi = {
  get: () => axiosClient.get("/cart"),
  add: (productId, quantity = 1) =>
    axiosClient.post("/cart", { productId, quantity }),
  update: (productId, quantity) =>
    axiosClient.put(`/cart/${productId}`, { quantity }),
  remove: (productId) => axiosClient.delete(`/cart/${productId}`),
};

export default cartApi;
