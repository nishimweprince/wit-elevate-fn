import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
const Layout = () => {
  return (
    <>
      <div className=" px-8 lg:px-28">
        <NavBar />
          <Outlet />
        <Footer />
      </div>
    </>
  );
};
export default Layout;
