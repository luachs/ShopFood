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
  searchSuggestions: async (q) => {
    try {
      const res = await axiosClient.get("/search/suggest", {
        params: { q },
      });
      return res.data;
    } catch (error) {
      console.error("Search suggestion API error:", error);
      throw error;
    }
  },
};

export default searchApi;
