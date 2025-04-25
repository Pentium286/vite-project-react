import { Outlet } from "react-router";
import Navigation from "../../components/navigation/index";
import "./index.less";

const HomeView = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default HomeView;