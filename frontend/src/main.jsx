import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.jsx";
import { MenuProvider } from "@/contexts/MenuContext.jsx";
import { CartProvider } from "@/contexts/CartContext.jsx";
import { SearchProvider } from "@/contexts/SearchContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <MenuProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </MenuProvider>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>
);
