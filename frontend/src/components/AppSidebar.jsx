import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import Logo from "./Logo";

function AppSidebar() {
  const { user, logout } = useAuth(); // Assuming you'll import useAuth
  return (
    <div className="w-64 bg-white p-6 flex flex-col shadow-lg">
      <div className="mb-8">
        <Logo />
      </div>
      <nav className="flex flex-col gap-4">
        <NavLink to="/app/dashboard" className="text-text-primary font-bold">
          Dashboard
        </NavLink>
        <NavLink
          to="/app/transactions"
          className="text-ui-gray-200 hover:text-text-primary"
        >
          Transactions
        </NavLink>
        <NavLink
          to="/app/budgets"
          className="text-ui-gray-200 hover:text-text-primary"
        >
          Budgets
        </NavLink>
      </nav>
      <div className="mt-auto">
        <div className="text-ui-gray-200 mb-4">
          <p className="font-bold text-text-primary">{user?.name}</p>
          <p className="text-sm">{user?.email}</p>
        </div>
        <button
          onClick={logout}
          className="w-full py-2 text-text-on-brand bg-accent-red rounded-md hover:opacity-90"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AppSidebar;
