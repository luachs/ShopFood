// AddProduct.jsx
import React, { useState, useRef, useEffect } from "react";
import "./AddProduct.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";

const AddProduct = () => {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // mở file picker khi click
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // khi thay đổi input (chọn file)
  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      // nếu trước đó đã có preview thì revoke
      if (preview) URL.revokeObjectURL(preview);
      setPreview(url);
    }
  };

  // Xử lý kéo thả
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // giữ trạng thái drag
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(url);

      // Nếu bạn cần giữ file để gửi lên server, bạn có thể lưu 'file' vào state riêng.
      // ex: setSelectedFile(file)
    }
  };

  // Xóa ảnh preview
  const handleRemovePreview = (e) => {
    e.stopPropagation();
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    // reset input value để có thể chọn lại cùng file nếu cần
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // dọn cleanup khi component unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <form className="add-product" onSubmit={(e) => e.preventDefault()}>
      <div className="add-product__field">
        <label className="add-product__label">Name product</label>
        <input className="add-product__input" />
      </div>

      <div className="add-product__field">
        <label className="add-product__label">Price</label>
        <input className="add-product__input" />
      </div>

      <div className="add-product-wrapper">
        <div className="add-product-wrapper-left">
          <div className="add-product__field">
            <label className="add-product__label">Product category</label>
            <select name="category" className="add-product__select">
              <option value="fastfood">fastfood</option>
              <option value="snack">snack</option>
              <option value="drink">drink</option>
            </select>
          </div>

          {/* Upload area: có drag/drop + click */}
          <div
            className={`upload-img ${isDragging ? "dragover" : ""}`}
            onClick={handleUploadClick}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleUploadClick();
            }}
            aria-label="Upload image (click or drag and drop)"
          >
            {preview ? (
              <div className="upload-preview-wrapper">
                <img src={preview} alt="preview" className="upload-preview" />
                <button
                  type="button"
                  className="upload-remove-btn"
                  onClick={handleRemovePreview}
                  aria-label="Remove image"
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
            rows="9"
          />
        </div>
      </div>

      <button className="add-product__button" type="submit">
        Add product
      </button>
    </form>
  );
};

export default AddProduct;
