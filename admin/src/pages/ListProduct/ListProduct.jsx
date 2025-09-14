import React, { useEffect, useState } from "react";
import "./ListProduct.css";

import ButterscotchCake from "../../assets/Products/ButterscotchCake.png";
import FriedEggs from "../../assets/Products/FriedEggs.png";
import HawaiianPizza from "../../assets/Products/HawaiianPizza.png";
import MartinezCocktail from "../../assets/Products/MartinezCocktail.png";
import productApi from "../../api/productApi";
import { Link } from "react-router-dom";

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
                <Link to={`/editproduct/${product.id}`}>
                  <button className="btn-edit">Sửa</button>
                </Link>

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
