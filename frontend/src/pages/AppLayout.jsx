import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";

function AppLayout() {
  return (
    <div className="flex h-screen bg-background">
      {/* <AppSidebar /> */}
      <main className="p-8">
        <PageNav />
        {/* The Outlet will render the nested route, e.g., the Dashboard */}
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
