/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({});

  const handleShippingInfoChange = (info) => {
    setShippingInfo(info);
    console.log("Shipping info:", info);
  };

  return (
    <div className="container page-checkout">
      <CheckoutForm onShippingInfoChange={handleShippingInfoChange} />
    </div>
  );
};

export default Checkout;
