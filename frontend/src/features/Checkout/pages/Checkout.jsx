/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");


  const handleShippingInfoChange = (info) => {
    setShippingInfo(info);
    console.log("Shipping info:", info); 
  };


  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    console.log("Payment method:", method); 
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
