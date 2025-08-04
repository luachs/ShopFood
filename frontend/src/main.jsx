import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.jsx";
import { MenuProvider } from "./contexts/MenuContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <MenuProvider>
          <App />
        </MenuProvider>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>
);
