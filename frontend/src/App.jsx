import { Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Features from "./pages/Features";
import ProtectedRoute from "./pages/ProtectedRoute";
import Homepage from "./pages/Homepage";
import PublicLayout from "./pages/PublicLayout";
import Register from "./pages/Register";
import Transactions from "./pages/Transactions.jsx";
import AddTransaction from "./pages/AddTransaction.jsx";

function App() {
  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Navigate replace to="home" />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="transactions/addtransaction" element={<AddTransaction />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
