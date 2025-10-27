import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { logout as logoutApi } from "../services/apiAuth";
import { useMutation } from "@tanstack/react-query"; // <-- don't forget to import this
import Logo from "./Logo";
import toast from "react-hot-toast";

function AppSidebar() {
  const { user, logout: authLogout } = useAuth();
  const navigate = useNavigate();

  const {
    mutate: logout,
    isPending
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Logged out successfully!");
      // clear auth state
      authLogout();
      // redirect user home (or login page)
      navigate("/home", { replace: true });
    },
    onError: (err) => {
      toast.error("Logout failed");
      console.error("Logout failed:", err.message);
    },
  });

  return (
    <div className="w-64 bg-white p-6 flex flex-col shadow-lg">
      {/* Logo section */}
      <div className="mb-8">
        <Logo />
      </div>

      {/* Navigation links */}
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/app/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-text-primary font-bold"
              : "text-ui-gray-200 hover:text-text-primary"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/app/transactions"
          className={({ isActive }) =>
            isActive
              ? "text-text-primary font-bold"
              : "text-ui-gray-200 hover:text-text-primary"
          }
        >
          Transactions
        </NavLink>
      </nav>

      <div className="mt-auto">
        <div className="text-ui-gray-200 mb-4">
          <p className="font-bold text-text-primary">{user?.name}</p>
          <p className="text-sm">{user?.email}</p>
        </div>

        <button
          onClick={() => logout()}
          disabled={isPending}
          className={`w-full py-2 text-text-on-brand bg-accent-red rounded-md hover:opacity-90 ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default AppSidebar;
