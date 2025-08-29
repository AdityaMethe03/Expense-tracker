import Footer from "../components/Footer";
import Homepage from "../pages/Homepage";

function AppLayout() {
  return (
    <div className="flex h-screen bg-background">
      {/* <AppSidebar /> */}
      <main className="flex-1 p-8">
        {/* <AppHeader /> */}
        {/* The Outlet will render the nested route, e.g., the Dashboard */}
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
