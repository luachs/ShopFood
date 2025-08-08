import React from "react";
import "./checkoutForm.css";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import useCheckoutForm from "../../hooks/useCheckoutForm"; // <== tách ra
import { useCart } from "@/hooks/useCart";
import { formatCurrency } from "@/utils/FormatCurrency";

const CheckoutForm = ({ onShippingInfoChange, onPaymentMethodChange }) => {
  const { totalPrice } = useCart();
  const { formData, handleChange, isValid } =
    useCheckoutForm(onShippingInfoChange);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    alert("Đã đặt hàng thành công");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="checkout-container">
        <h1 style={{ marginBottom: "24px", textAlign: "center" }}>
          Thanh toán
        </h1>
        <div>
          Số tiền cần thanh toán: {formatCurrency(totalPrice, "en-US", "USD")}
        </div>
        <div className="checkout-form">
          <h3>Thông tin giao hàng</h3>

          <InputField
            name="name"
            placeholder="Họ tên"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <InputField
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <InputField
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <h3>Phương thức thanh toán</h3>
          <select
            onChange={(e) => onPaymentMethodChange(e.target.value)}
            required
          >
            <option value="">-- Chọn phương thức --</option>
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
            <option value="bank">Chuyển khoản ngân hàng</option>
          </select>

          <Button primary type="submit">
            Đặt hàng
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
