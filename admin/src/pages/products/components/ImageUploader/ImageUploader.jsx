import React, { useEffect, useRef, useState } from "react";
import "./ImageUploader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faTimes } from "@fortawesome/free-solid-svg-icons";

const ImageUploader = ({ formData, setFormData }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(url);

    const form = new FormData();
    form.append("product", file);

    const res = await fetch("http://localhost:4000/products/upload", {
      method: "POST",
      body: form,
      credentials: "include",
    });
    const data = await res.json();
    if (data.success)
      setFormData((prev) => ({ ...prev, image: data.image_url }));
  };
  useEffect(() => {
    setPreview(formData.image);
  }, []);

  return (
    <div className="upload-img" onClick={handleUploadClick}>
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
  );
};

export default ImageUploader;
