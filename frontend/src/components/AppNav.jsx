import { useAuth } from "../contexts/useAuth";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function AppNav() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-text-header">
          Welcome back, {user?.name.split(" ")[0]} 👋
        </h1>
        <p className="text-ui-gray-200">
          Here's a summary of your financial activity.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-white">
          <BellIcon className="h-6 w-6 text-ui-gray-200" />
        </button>
        <div className="h-10 w-10 rounded-full bg-brand-accent flex items-center justify-center text-text-primary font-bold">
          {user?.name.charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
