import { NavLink } from "react-router";
import "./index.less";

const Navigation = () => {
  return (
    <nav>
      <NavLink className="nav" to="/">Home</NavLink>
      <NavLink className="nav" to="/AboutView">About</NavLink>
    </nav>
  );
};

export default Navigation;