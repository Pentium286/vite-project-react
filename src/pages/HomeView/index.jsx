import { Outlet } from "react-router";
import Navigation from "../../components/navigation/index";
import "./index.less";

const HomeView = () => {
  return (
    <>
      <Navigation />
      <div>HomeView</div>
      <Outlet />
    </>
  );
};

export default HomeView;