import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Registration from "../Pages/Registration";

const Layout = () => {
  return (
    <>
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default function BaseRouter() {
  return <RouterProvider router={router} />;
}
