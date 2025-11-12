// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import cartApi from "@/api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await cartApi.get();
      const cartItems = res.data?.data?.items || [];

      setItems(cartItems);
      calcTotal(cartItems);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };
  const calcTotal = (list) => {
    const total = list.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    );
    const qty = list.reduce((sum, item) => sum + item.quantity, 0);
    setTotalPrice(total);
    setTotalQuantity(qty);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const increaseQuantity = async (productId) => {
    const item = items.find((i) => i.product._id === productId);
    if (!item) return;
    const newQty = item.quantity + 1;
    await cartApi.update(productId, newQty);
    const updated = items.map((i) =>
      i.product._id === productId ? { ...i, quantity: newQty } : i
    );
    setItems(updated);
    calcTotal(updated);
  };

  const decreaseQuantity = async (productId) => {
    const item = items.find((i) => i.product._id === productId);
    if (!item) return;

    if (item.quantity <= 1) {
      await removeItem(productId);
    } else {
      const newQty = item.quantity - 1;
      await cartApi.update(productId, newQty);
      const updated = items.map((i) =>
        i.product._id === productId ? { ...i, quantity: newQty } : i
      );
      setItems(updated);
      calcTotal(updated);
    }
  };

  const removeItem = async (productId) => {
    await cartApi.remove(productId);
    const updated = items.filter((i) => i.product._id !== productId);
    setItems(updated);
    calcTotal(updated);
  };

  const addItem = async (productId, quantity = 1) => {
    await cartApi.add(productId, quantity);
    await fetchCart(); // refresh cart
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        totalQuantity,
        loading,
        addItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
