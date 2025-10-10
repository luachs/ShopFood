import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

  if (loading) return <div className="">Đang xác thực...</div>;
  // ❌ Nếu chưa đăng nhập
  if (!isAuthenticated) {
    window.location.href = `${frontendUrl}/login`;
    return null;
  }

  // 🚫 Nếu không phải admin
  const roleId = user?.user?.role?._id || user?.role?._id; // fallback an toàn
  if (roleId === "user" || roleId === "staff") {
    console.log("⛔ Không có quyền:", roleId);
    window.location.href = `${frontendUrl}`;
    return null;
  }

  // ✅ Là admin
  return children;
};

export default AdminRoute;
