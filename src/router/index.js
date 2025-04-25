import { createBrowserRouter } from "react-router";

import HomeView from "../views/HomeView/index.jsx";
import HomeViewDetail from "../views/HomeView/Detail/index.jsx";
import AboutView from "../views/AboutView/index.jsx";
import AboutViewDetail from "../views/AboutView/Detail/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeView,
    children: [
      // { path: "/HomeView/Detail", Component: HomeViewDetail },
      { index: true, Component: HomeViewDetail },
    ],
  },
  {
    path: "/AboutView",
    Component: AboutView,
    children: [
      // { path: "/AboutView/Detail", Component: AboutViewDetail },
      { index: true, Component: AboutViewDetail },
    ],
  },
]);

export default router;