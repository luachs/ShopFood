import React, { useEffect, useState } from "react";
import "./SessionExpiredModal.css";
import authApi from "@/api/authApi";

const SessionExpiredModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(true);
    window.addEventListener("tokenExpired", handler);
    return () => window.removeEventListener("tokenExpired", handler);
  }, []);

  const handleExtend = async () => {
    try {
      await authApi.refresh(); // 👈 backend đọc refresh token từ cookie
      alert("✅ Token đã được gia hạn!");
      setVisible(false);
      window.dispatchEvent(new Event("tokenRefreshed"));
      window.location.reload();
    } catch (err) {
      alert("❌ Gia hạn thất bại, vui lòng đăng nhập lại!");
      console.log("error: ", err);
      window.location.href = "/login";
    }
  };

  const handleLoginAgain = () => {
    window.location.href = "/login";
  };

  if (!visible) return null;

  return (
    <div className="session-expired-overlay">
      <div className="session-expired-modal">
        <h2>⚠️ Phiên đăng nhập đã hết hạn</h2>
        <p>Bạn có muốn gia hạn phiên làm việc không?</p>
        <div className="modal-buttons">
          <button onClick={handleLoginAgain}>Đăng nhập lại</button>
          <button onClick={handleExtend}>Gia hạn</button>
        </div>
      </div>
    </div>
  );
};

export default SessionExpiredModal;
