import { createBrowserRouter, RouterProvider } from "react-router";
import Register from "../../features/auth/pages/Register";
import Login from "../../features/auth/pages/Login";
import Protected from "../../features/shared/components/Protected";
import Home from "../../features/chats/pages/Home";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Protected/>,
      children:[
        {
          path:'',
          element:<Home/>
        }
      ]
    },
    {
      path: "/register",
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
