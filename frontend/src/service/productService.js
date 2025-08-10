import { ProductsMock as Products } from "@/data/ProductMock";

export const searchProducts = (keyword = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchKey = keyword.toString().trim().toLowerCase();
      const result = Products.filter((product) =>
        product.title.toLowerCase().includes(searchKey)
      );
      resolve(result);
    }, 300); // Giả lập API delay
  });
};
