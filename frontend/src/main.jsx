import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute in milliseconds //amount of time that the data in the cache will stay fresh before being refetched.
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <Toaster
              position="top-right"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                  style: {
                    background: "#73d813",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "500",
                  },
                  iconTheme: {
                    primary: "#ffffff",
                    secondary: "#73d813",
                  },
                },
                error: {
                  duration: 5000,
                  style: {
                    background: "#e50001",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "500",
                  },
                  iconTheme: {
                    primary: "#ffffff",
                    secondary: "#e50001",
                  },
                },
                loading: {
                  style: {
                    background: "#1c1646",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontWeight: "500",
                  },
                },
              }}
          />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
