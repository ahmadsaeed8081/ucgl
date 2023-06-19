import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
const Wrapper = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="relative">
      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <section>
        <div className="min-h-screen w-full flex justify-center bg-white">
          {children}
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Wrapper;
