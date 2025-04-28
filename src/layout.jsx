import { Outlet } from "react-router";
import Navigation from "./components/navigation/index";

const Layout = () => {
  return (
    <>
      <Navigation />
      Layout
      <Outlet />
    </>
  );
};

export default Layout;