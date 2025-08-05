import React from "react";
import "./InputField.css";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  required,
}) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default InputField;
