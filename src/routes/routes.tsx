import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import Articles from "../pages/Articles";
import Home from "../pages/Home";
import Sport from "../pages/Sport";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />, // <- постійний Header тут
    children: [
      { index: true, element: <Home /> }, // те саме, що path: ''
      { path: "articles", element: <Articles /> },
      { path: "sport", element: <Sport /> },
      { path: "*", element: <Home /> }, // fallback (можеш замінити на NotFound)
    ],
  },
];

export default routes;
