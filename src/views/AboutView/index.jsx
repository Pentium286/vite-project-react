import { Outlet } from "react-router";
import Navigation from "../../components/navigation/index";
import "./index.less";

const AboutView = () => {
  return (
    <>
      <Navigation />
      <div>AboutView</div>
      <Outlet />
    </>
  );
};

export default AboutView;