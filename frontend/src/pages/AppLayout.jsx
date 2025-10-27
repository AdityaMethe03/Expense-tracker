import { Outlet } from "react-router-dom";
import AppSidebar from "../components/AppSidebar";

function AppLayout() {
  return (
    <div className="flex h-screen bg-bg-primary">
      <AppSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
