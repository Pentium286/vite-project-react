import { createBrowserRouter } from "react-router";

import Login from "./pages/Login/index.jsx";
import Layout from "./layout.jsx";

import HomeView from "./pages/HomeView/index.jsx";
import AboutView from "./pages/AboutView/index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      // { path: "/HomeView", Component: HomeView },
      { index: true, Component: HomeView },
      { path: "/AboutView", Component: AboutView },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
]);

export default router;