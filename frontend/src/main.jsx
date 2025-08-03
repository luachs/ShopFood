import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MenuProvider } from "./contexts/MenuContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      <MenuProvider>
        <App />
      </MenuProvider>
    </CartProvider>
  </StrictMode>
);
