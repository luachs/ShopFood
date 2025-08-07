import { useState } from "react";

const useCheckoutForm = (onShippingInfoChange) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    onShippingInfoChange(updated);
  };

  const isValid = () => {
    return formData.name && formData.email && formData.phone;
  };

  return {
    formData,
    handleChange,
    isValid,
  };
};

export default useCheckoutForm;
