import { createBrowserRouter } from "react-router";

// import App from '../App.jsx';
import AboutView from "../views/AboutView/index.jsx";
import HomeView from "../views/HomeView/index.jsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   Component: App,
  // },
  {
    path: "/",
    Component: AboutView,
  },
  {
    path: "/HomeView",
    Component: HomeView,
  },
]);

export default router;