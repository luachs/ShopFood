import React from "react";
import "./checkoutForm.css";
import InputField from "@/components/InputField/InputField";
import Button from "@/components/Button/Button";
import useCheckoutForm from "../../hooks/useCheckoutForm"; // <== tách ra
import { useCart } from "@/contexts/CartContext";

import { formatCurrency } from "@/utils/FormatCurrency";
import { useNavigate } from "react-router-dom";

import COD from "@/assets/images/logoPayment/COD.png";
import momo from "@/assets/images/logoPayment/momo.png";
import vnpay from "@/assets/images/logoPayment/vnpay.png";
import bank from "@/assets/images/logoPayment/bank.png";

import paymentApi from "@/api/paymentApi";
import config from "@/config/config";

const CheckoutForm = ({ onShippingInfoChange, onPaymentMethodChange }) => {
  const navigate = useNavigate();
  const { totalPrice } = useCart();
  const { formData, handleChange, isValid } =
    useCheckoutForm(onShippingInfoChange);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid()) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const payload = {
      amount: totalPrice,
      orderInfo: `Thanh toán đơn hàng của ${formData.name}`,
      orderType: formData.orderType,
    };

    try {
      //COD
      if (formData.payment === "cod") {
        await paymentApi.createCOD(payload);
        alert("Đặt hàng thành công - thanh toán COD");
      }
      if (formData.payment === "momo") {
        const res = await paymentApi.createMomo(payload);
        window.location.href = res.data.payUrl;
        return;
      }
      if (formData.payment === "vnpay") {
        const res = await paymentApi.createVNPay(payload);
        window.location.href = res.data.payUrl;
        return;
      }
      if (formData.payment === "bank") {
        const res = await paymentApi.createBank(payload);
        navigate(config.routes.bank, { state: res.data });
        return;
      }
    } catch (err) {
      console.error("Payment error");
      alert("Thanh toán thất bại");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="checkout-container">
        <h1 style={{ marginBottom: "24px", textAlign: "center" }}>
          Thanh toán
        </h1>
        <div className="cart-total-price">
          Số tiền cần thanh toán: {totalPrice} VNĐ
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
