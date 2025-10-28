import { useEffect, useState, useCallback } from "react";
import meApi from "../api/meApi";
import authApi from "../api/authApi";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function hasAuthCookie() {
    return document.cookie
      .split("; ")
      .some((c) => c.startsWith("access_token="));
  }
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await meApi.get();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (data) => {
    await authApi.login(data); // server set cookie
    await fetchUser();
  };

  const logout = async () => {
    try {
      await authApi.logout(); // server xóa cookie
    } catch (err) {
      console.error("Lỗi logout:", err);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    // Nếu đang ở /login thì không cần fetch user
    if (window.location.pathname === "/login") {
      setLoading(false);
      return;
    }

    if (hasAuthCookie()) {
      fetchUser();
    } else {
      setLoading(false);
      setUser(null);
    }
  }, [fetchUser]);

  return {
    user,
    loading,
    login,
    logout,
    refreshUser: fetchUser,
    isAuthenticated: !!user,
  };
}
