// src/api/searchApi.js
import axiosClient from "./axiosClient";

const searchApi = {
  search: async ({
    q,
    productPage = 1,
    blogPage = 1,
    productLimit = 6,
    blogLimit = 6,
  }) => {
    if (!q?.trim())
      return {
        products: { data: [], pagination: {} },
        blogs: { data: [], pagination: {} },
      };

    const res = await axiosClient.get(`/search`, {
      params: {
        q,
        productPage,
        blogPage,
        productLimit,
        blogLimit,
      },
    });

    return res.data;
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
