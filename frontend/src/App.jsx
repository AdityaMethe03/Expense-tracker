import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthProvider";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute in milliseconds //amount of time that the data in the cache will stay fresh before being refetched.
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<Dashboard />} />
            <Route path="/features" element={<Features />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
