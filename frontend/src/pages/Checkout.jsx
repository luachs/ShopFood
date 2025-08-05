/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CheckoutForm from "../components/checkout/CheckoutForm/CheckoutForm";

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");

  // Nhận data từ form: họ tên, email, số điện thoại
  const handleShippingInfoChange = (info) => {
    setShippingInfo(info);
    console.log("Shipping info:", info); // có thể gửi info này khi submit
  };

  // Nhận phương thức thanh toán: cod hoặc bank
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    console.log("Payment method:", method); // lưu vào state hoặc gửi về server
  };

  return (
    <div className="container page-checkout">
      <CheckoutForm
        onShippingInfoChange={handleShippingInfoChange}
        onPaymentMethodChange={handlePaymentMethodChange}
      />
    </div>
  );
};

export default Checkout;
