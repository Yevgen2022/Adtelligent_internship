import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import About from "../pages/About";
import Articles from "../pages/Articles";
import Bookmarks from "../pages/Bookmarks";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NewsDetails from "../pages/NewsDetails";
import SignUp from "../pages/SignUp";
import Sport from "../pages/Sport";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

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
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },

      //middlware
      {
        element: <ProtectedRoute />,
        children: [{ path: "bookmarks", element: <Bookmarks /> }],
      },

      {
        element: <PublicOnlyRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "signup", element: <SignUp /> },
        ],
      },

      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

export default routes;
