import { useState } from "react";

const useCheckoutForm = (onShippingInfoChange) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    orderType: "",
    address: "",
    payment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    onShippingInfoChange(updated);
  };

  const isValid = () => {
    if (!formData.name || !formData.email || !formData.phone) return false;
    if (!formData.orderType) return false;
    if (formData.orderType === "delivery" && !formData.address) return false;
    if (!formData.payment) return false;
    return true;
  };

  return {
    formData,
    handleChange,
    isValid,
  };
};

export default useCheckoutForm;
