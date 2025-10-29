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
  className,
  onKeyDown,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input
        className={className}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;
