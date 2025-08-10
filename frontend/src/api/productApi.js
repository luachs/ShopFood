import { ProductsMock } from "@/data/ProductMock";

export function fetProducts() {
  return new Promise((resolve) => {
    setTimeout(resolve(ProductsMock), 500);
  });
}
