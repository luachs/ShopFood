import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import productApi from "../../../api/productApi";
import AddProduct from "../AddProduct/AddProduct";
import EditProduct from "../EditProduct/EditProduct";
import Button from "../../../Components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowUpWideShort,
} from "@fortawesome/free-solid-svg-icons";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchProducts = async () => {
    try {
      const res = await productApi.getSorted(sortField, sortOrder);
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [sortField, sortOrder]);

  // ✅ Sửa đúng handleSort
  const handleSort = (field) => {
    if (sortField === field) {
      // Đảo chiều sort
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Chọn field mới, reset về asc
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await productApi.remove(id);
      console.log("Xoá thành công:", res);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.log("Lỗi xóa: ", error);
    }
  };

  return (
    <div className="list-product">
      <h1>List product</h1>
      <Button primary onClick={() => setShowAddModal(true)}>
        Add product
      </Button>

      <table cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
              ID{" "}
              {sortField === "id" &&
                (sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faArrowUpWideShort} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                ))}
            </th>

            <th
              colSpan="2"
              onClick={() => handleSort("name")}
              style={{ cursor: "pointer" }}
            >
              Name{" "}
              {sortField === "name" &&
                (sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faArrowUpWideShort} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                ))}
            </th>

            <th
              onClick={() => handleSort("category")}
              style={{ cursor: "pointer" }}
            >
              Category{" "}
              {sortField === "category" &&
                (sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faArrowUpWideShort} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                ))}
            </th>

            <th
              onClick={() => handleSort("price")}
              style={{ cursor: "pointer" }}
            >
              Price{" "}
              {sortField === "price" &&
                (sortOrder === "asc" ? (
                  <FontAwesomeIcon icon={faArrowUpWideShort} />
                ) : (
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                ))}
            </th>

            <th>Actions</th>
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

      {/* Modal thêm */}
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
                await fetchProducts();
              }}
            />
          </div>
        </div>
      )}

      {/* Modal sửa */}
      {showEditModal && (
        <div className="overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Chỉnh sửa sản phẩm</h2>
              <button
                className="close-btn"
                onClick={() => setShowEditModal(false)}
              >
                X
              </button>
            </div>
            <EditProduct
              productId={editingProduct?.id}
              onUpdated={async () => {
                setShowEditModal(false);
                await fetchProducts();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
