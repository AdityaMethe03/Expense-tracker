import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useEffect } from "react";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Outlet /> : null;
}

export default ProtectedRoute;
