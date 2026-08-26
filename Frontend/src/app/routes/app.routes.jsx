import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "../../features/auth/pages/Register";
import Login from "../../features/auth/pages/Login";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
