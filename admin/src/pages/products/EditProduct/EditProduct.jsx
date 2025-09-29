import React, { useState, useRef, useEffect } from "react";
import "./EditProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";
import productApi from "../../../api/productApi"; // import API
import { useNavigate, useParams } from "react-router-dom";
import categoryApi from "../../../api/categoryApi";

const EditProduct = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "fastfood",
    description: "",
    image: "", // sẽ set sau khi upload ảnh
  });

  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productApi.getById(id);
        console.log("server trả về: ", res.data);
        setFormData({
          name: res.data.name,
          price: res.data.price,
          category: res.data.category,
          description: res.data.description,
          image: res.data.image,
        });
        setPreview(res.data.image);
      } catch (error) {
        console.log("Lỗi khi tìm thấy sản phẩm", error);
      }
    };
    fetchData();
  }, [id]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryApi.getAll();
        setCategories(res); // giả sử API trả về mảng categories
        if (res.length > 0) {
          setFormData((prev) => ({ ...prev, category: res[0]._id })); // chọn category đầu tiên
        }
      } catch (err) {
        console.error("Không lấy được categories", err);
      }
    };
    fetchCategories();
  }, []);
  // 🟢 handle change input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🟢 mở file picker khi click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 🟢 khi thay đổi input (chọn file)
  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(url);

      // upload ảnh lên backend
      const form = new FormData();
      form.append("product", file);
      try {
        const res = await fetch("http://localhost:4000/products/upload", {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        if (data.success) {
          setFormData((prev) => ({ ...prev, image: data.image_url }));
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  // 🟢 Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await productApi.edit(id, {
        ...formData,
        price: Number(formData.price),
        createAt: new Date(),
      });
      console.log("Sửa thành công:", res);
      alert("Sửa sản phẩm thành công!");
      navigate("/listproduct");
    } catch (err) {
      console.error("Lỗi khi sửa sản phẩm:", err);
    }
  };

  // cleanup preview khi unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <form className="add-product" onSubmit={handleSubmit}>
      <div className="add-product__field">
        <label className="add-product__label">Name product</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="add-product__input"
        />
      </div>

      <div className="add-product__field">
        <label className="add-product__label">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="add-product__input"
        />
      </div>

      <div className="add-product-wrapper">
        <div className="add-product-wrapper-left">
          <div className="add-product__field">
            <label className="add-product__label">Product category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="add-product__select"
            >
              {categories.map((cat) => {
                return (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Upload ảnh */}
          <div
            className={`upload-img ${isDragging ? "dragover" : ""}`}
            onClick={handleUploadClick}
          >
            {preview ? (
              <div className="upload-preview-wrapper">
                <img src={preview} alt="preview" className="upload-preview" />
                <button
                  type="button"
                  className="upload-remove-btn"
                  onClick={() => {
                    if (preview) URL.revokeObjectURL(preview);
                    setPreview(null);
                    setFormData((prev) => ({ ...prev, image: "" }));
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            ) : (
              <>
                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                <h2 className="upload-text">Click or drag & drop to upload</h2>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </>
            )}
          </div>
        </div>

        <div className="add-product-wrapper-right">
          <label className="add-product__label">Description</label>
          <textarea
            className="add-product__textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="9"
          />
        </div>
      </div>

      <button className="add-product__button" type="submit">
        Edit product
      </button>
    </form>
  );
};

export default EditProduct;
