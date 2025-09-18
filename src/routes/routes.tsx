import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import About from "../pages/About";
import Articles from "../pages/Articles";
import Home from "../pages/Home";
import NewsDetails from "../pages/NewsDetails";
import Sport from "../pages/Sport";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "articles", element: <Articles /> },
      { path: "sport", element: <Sport /> },
      { path: "about", element: <About /> },
      { path: "news/:id", element: <NewsDetails /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

export default routes;
