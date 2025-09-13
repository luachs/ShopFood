import React, { useEffect, useState } from "react";
import "./ListProduct.css";

import ButterscotchCake from "../../assets/Products/ButterscotchCake.png";
import FriedEggs from "../../assets/Products/FriedEggs.png";
import HawaiianPizza from "../../assets/Products/HawaiianPizza.png";
import MartinezCocktail from "../../assets/Products/MartinezCocktail.png";
import productApi from "../../api/productApi";

const Products = [
  {
    id: 1,
    name: "Burger Bò Phô Mai",
    price: 55000,
    category: "fastfood",
    image: ButterscotchCake,
    description:
      "Burger bò nướng kèm phô mai tan chảy, xà lách và sốt đặc biệt.",
  },
  {
    id: 2,
    name: "Khoai Tây Chiên",
    price: 25000,
    category: "snack",
    image: FriedEggs,
    description: "Khoai tây chiên giòn rụm, chấm kèm sốt cà hoặc tương ớt.",
  },
  {
    id: 3,
    name: "Trà Sữa Trân Châu",
    price: 40000,
    category: "drink",
    image: HawaiianPizza,
    description: "Trà sữa vị truyền thống kèm topping trân châu đen.",
  },
  {
    id: 4,
    name: "Gà Rán Giòn Cay",
    price: 60000,
    category: "fastfood",
    image: MartinezCocktail,
    description: "Miếng gà rán giòn rụm, vị cay hấp dẫn.",
  },
  {
    id: 5,
    name: "Bánh Tráng Trộn",
    price: 20000,
    category: "snack",
    image: MartinezCocktail,
    description: "Bánh tráng trộn đủ topping: bò khô, trứng cút, xoài xanh.",
  },
];

const ListProduct = () => {
  const [products, setProducts] = useState([]);

  const handleDelete = async (id) => {
    try {
      const res = await productApi.remove(id);
      console.log("Xoá thành công:", res);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.log("Lỗi xóa: ", error);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productApi.getAll();
        setProducts(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy sản phẩm: ", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="list-product">
      <h1>List product</h1>
      <table cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th colSpan="2">name</th>
            <th>Category</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td data-label="ID">{product.id}</td>
              <td data-label="Image">
                <img
                  src={product.image}
                  width="60"
                  height="60"
                  alt={product.name}
                />
              </td>
              <td data-label="Name">{product.name}</td>
              <td data-label="Category">{product.category}</td>
              <td data-label="Price">{product.price}</td>
              <td data-label="Actions">
                <button className="btn-edit">Sửa</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(product.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;
