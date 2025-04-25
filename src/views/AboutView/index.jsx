import { Outlet } from "react-router";
import Navigation from "../../components/navigation/index";
import "./index.less";

const AboutView = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

export default AboutView;