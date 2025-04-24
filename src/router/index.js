import { createBrowserRouter } from "react-router";

import HomeView from "../views/HomeView/index.jsx";
import AboutView from "../views/AboutView/index.jsx";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   Component: App,
  // },
  {
    path: "/",
    Component: HomeView,
  },
  {
    path: "/AboutView",
    Component: AboutView,
  },
]);

export default router;