import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

// import Bookmarks from "../pages/Bookmarks";

const Layout = lazy(() => import("../components/Layout"));
const About = lazy(() => import("../pages/About"));
const Technologies = lazy(() => import("../pages/Technologies"));
const Home = lazy(() => import("../pages/Home.tsx"));
const Login = lazy(() => import("../pages/Login.tsx"));
const NewsDetails = lazy(() => import("../pages/NewsDetails.tsx"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Sport = lazy(() => import("../pages/Sport"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "technologies", element: <Technologies /> },
      { path: "sport", element: <Sport /> },
      { path: "about", element: <About /> },
      { path: "news/:id", element: <NewsDetails /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },

      //middlware
      // {
      //   element: <ProtectedRoute />,
      //   children: [{ path: "bookmarks", element: <Bookmarks /> }],
      // },

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
