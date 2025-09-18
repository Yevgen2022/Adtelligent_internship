import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import Articles from "../pages/Articles";
import Home from "../pages/Home";
import Sport from "../pages/Sport";
import NewsDetails from "../pages/NewsDetails";
import { Navigate } from "react-router-dom";


const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />, //
    children: [
      { index: true, element: <Home /> },
      { path: "articles", element: <Articles /> },
      { path: "sport", element: <Sport /> },
      { path: "news/:id", element: <NewsDetails /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

export default routes;
