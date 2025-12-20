import { useLocation } from "react-router-dom";

const BankPayment = () => {
  const { state } = useLocation();

  if (!state) return <h2>Không có dữ liệu thanh toán</h2>;

  return (
    <div style={{ textAlign: "center", padding: "200px 40px 40px 40px" }}>
      <h2>Chuyển khoản ngân hàng</h2>

      <img src={state.qrDataUrl} alt="VietQR" width={260} />

      <p>
        <b>Chủ tài khoản:</b> {state.bankInfo.accountName}
        <br />
        <b>Số tài khoản:</b> {state.bankInfo.accountNumber}
        <br />
        <b>Ngân hàng:</b> {state.bankInfo.bankName}
      </p>
      <p>
        <b>Số tiền:</b> {state.amount} VNĐ
      </p>
      <p>
        <b>Nội dung:</b> {state.orderId}
      </p>

      <p style={{ color: "red" }}>
        ⚠️ Vui lòng chuyển khoản đúng nội dung để hệ thống tự động xác nhận
      </p>
    </div>
  );
};

export default BankPayment;
