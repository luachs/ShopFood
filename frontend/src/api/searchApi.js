// src/api/searchApi.js
import axiosClient from "./axiosClient";

const searchApi = {
  search: async (q) => {
    if (!q?.trim()) return { products: [], categories: [], blogs: [] };
    try {
      const res = await axiosClient.get(`/search`, {
        params: { q },
      });
      return res.data;
    } catch (error) {
      console.error("Search API error:", error);
      throw error;
    }
  },
};

export default searchApi;
