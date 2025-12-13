import React from "react";
import "./checkoutForm.css";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import useCheckoutForm from "../../hooks/useCheckoutForm"; // <== tách ra
import { useCart } from "@/contexts/CartContext";

import { formatCurrency } from "@/utils/FormatCurrency";

import COD from "@/assets/images/logoPayment/COD.png";
import momo from "@/assets/images/logoPayment/momo.png";
import vnpay from "@/assets/images/logoPayment/vnpay.png";
import bank from "@/assets/images/logoPayment/bank.png";

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

    const payment = formData.payment;

    // Nếu COD → không redirect
    if (payment === "cod" || formData.orderType === "atStore") {
      alert("Đặt hàng thành công (COD / Thanh toán tại quán)");
      return;
    }

    // Nếu chọn MoMo → redirect sang link MoMo test
    if (payment === "momo") {
      const testMoMoPayUrl =
        "https://test-payment.momo.vn/v2/gateway/pay?t=TU9NTOY4MUJVU4yMDE4MDUyOXw0OTI0";

      window.location.href = testMoMoPayUrl;
      return;
    }

    alert("Phương thức thanh toán chưa hỗ trợ ở frontend test!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="checkout-container">
        <h1 style={{ marginBottom: "24px", textAlign: "center" }}>
          Thanh toán
        </h1>
        <div className="cart-total-price">
          Số tiền cần thanh toán: {formatCurrency(totalPrice, "en-US", "USD")}
        </div>
        <div className="checkout-form">
          {/* --------- thông tin giao hàng --------------- */}
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

          {/* -------- Hình thức đặt hàng ------------- */}
          <h3>Hình thức đặt hàng</h3>
          <div className="order-type">
            <label className="order-option">
              <input
                type="radio"
                name="orderType"
                value="atStore"
                onChange={handleChange}
              />
              <span>Thanh toán tại quán</span>
            </label>

            <label className="order-option">
              <input
                type="radio"
                name="orderType"
                value="delivery"
                onChange={handleChange}
              />
              <span>Đặt hàng từ xa (giao tận nơi)</span>
            </label>
          </div>

          {formData.orderType === "delivery" && (
            <InputField
              name="address"
              placeholder="Địa chỉ giao hàng"
              value={formData.address}
              onChange={handleChange}
              required
            />
          )}
          {/* -----------------  Phương thức thanh toán -------------*/}
          <h3>Phương thức thanh toán</h3>
          <div className="payment-methods">
            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="cod"
                onChange={(e) => onPaymentMethodChange(e.target.value)}
              />
              <img src={COD} className="pay-logo" alt="COD" />
              <span className="method-info">
                <span className="method-title">
                  Thanh toán khi nhận hàng (COD)
                </span>
                <span className="method-desc">Trả tiền mặt khi nhận hàng</span>
              </span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="momo"
                onChange={(e) => onPaymentMethodChange(e.target.value)}
              />
              <img src={momo} className="pay-logo" alt="MoMo" />
              <span className="method-info">
                <span className="method-title">Ví MoMo</span>
                <span className="method-desc">
                  Thanh toán bằng ứng dụng MoMo
                </span>
              </span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="vnpay"
                onChange={(e) => onPaymentMethodChange(e.target.value)}
              />
              <img src={vnpay} className="pay-logo" alt="VNPay" />
              <span className="method-info">
                <span className="method-title">VNPay</span>
                <span className="method-desc">Quét mã QR hoặc ví VNPay</span>
              </span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="bank"
                onChange={(e) => onPaymentMethodChange(e.target.value)}
              />
              <img src={bank} className="pay-logo" alt="Bank" />
              <span className="method-info">
                <span className="method-title">Chuyển khoản ngân hàng</span>
                <span className="method-desc">Nội địa - Napas</span>
              </span>
            </label>
          </div>

          <Button primary type="submit">
            Đặt hàng
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
