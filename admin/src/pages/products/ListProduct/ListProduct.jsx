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
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  // ==============================
  // API GET Products (Pagination + Sort)
  // ==============================
  const fetchProducts = async () => {
    try {
      const res = await productApi.getPaginated(
        page,
        limit,
        sortField,
        sortOrder
      );
      setProducts(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, sortField, sortOrder]);

  // ==============================
  // Sort Handler
  // ==============================
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }

    setPage(1); // reset page khi đổi sort
  };

  // ==============================
  // Delete Product
  // ==============================
  const handleDelete = async (id) => {
    try {
      const res = await productApi.remove(id);
      console.log("Xoá thành công:", res);

      // làm tươi lại list theo page hiện tại
      fetchProducts();
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
              onClick={() => handleSort("category.name")}
              style={{ cursor: "pointer" }}
            >
              Category{" "}
              {sortField === "category.name" &&
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
      {/* ===== PAGINATION ===== */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </button>

        <span style={{ padding: "0 10px" }}>
          Page {pagination.page} / {pagination.totalPages}
        </span>

        <button
          disabled={page === pagination.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
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
