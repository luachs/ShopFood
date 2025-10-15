import React, { useEffect, useState } from "react";
import "./ListProduct.css";

import productApi from "../../../api/productApi";
import AddProduct from "../AddProduct/AddProduct";
import EditProduct from "../EditProduct/EditProduct";
import Button from "../../../Components/Button/Button";
const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
  useEffect(() => {
    console.log(products);
  }, [products]);
  return (
    <div className="list-product">
      <h1>List product</h1>
      <Button primary onClick={() => setShowAddModal(true)}>
        Add product
      </Button>
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
                  src={product.image || null}
                  width="60"
                  height="60"
                  alt={product.name}
                />
              </td>
              <td data-label="Name">{product.name}</td>
              <td data-label="Category">
                {product.category?.name || "không có"}
              </td>
              <td data-label="Price">{product.price}</td>
              <td data-label="Actions">
                <button
                  className="btn-edit"
                  onClick={() => {
                    setEditingProduct(product);
                    setShowEditModal(true);
                  }}
                >
                  Sửa
                </button>

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
      {showAddModal && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Thêm Sản phẩm mới</h2>
              <button
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                x
              </button>
            </div>
            <AddProduct
              onAdded={async () => {
                setShowAddModal(false);
                const res = await productApi.getAll();
                setProducts(res.data);
              }}
            />
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Chỉnh sửa sản phẩm</h2>
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                x
              </button>
            </div>
            <EditProduct
              productId={editingProduct?.id}
              onUpdated={async () => {
                setShowEditModal(false);
                const res = await productApi.getAll();
                setProducts(res.data);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
