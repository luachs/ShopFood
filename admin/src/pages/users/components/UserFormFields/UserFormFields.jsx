import React from "react";
import "./UserFormFields.css";

const UserFormFields = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="add-product__field">
        <label className="add-product__label">UserName</label>
        <input
          name="name"
          value={formData.username}
          onChange={handleChange}
          className="add-product__input"
        />
      </div>
      <div className="add-product__field">
        <label className="add-product__label">Email</label>
        <input
          name="name"
          value={formData.email}
          onChange={handleChange}
          className="add-product__input"
        />
      </div>
    </>
  );
};

export default UserFormFields;
