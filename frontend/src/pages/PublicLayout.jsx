import { Outlet } from "react-router-dom";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

function PublicLayout() {
  return (
    <div className=" h-[93dvh] m-6 font-semibold shadow-[0_0_15px_rgba(0,0,0,0.1)] text-text-primary bg-bg-primary">
      <PageNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
