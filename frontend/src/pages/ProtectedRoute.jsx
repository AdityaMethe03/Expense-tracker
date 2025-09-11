import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  // const isAuthenticated = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
