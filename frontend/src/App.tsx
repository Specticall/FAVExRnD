import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard, { loader as dashboardLoader } from "./Pages/Dashboard";
import { ProductBoard } from "./Components/ProductBoard";
import ProductEditor from "./Components/ProductEditor";
import PopupProvider from "./Context/PopupContext";
import RouterFirstChild from "./Components/RouterFirstChild";
import AppLayout, { loader as appLoader } from "./Pages/AppLayout";
import Checkout from "./Pages/Checkout";

const router = createBrowserRouter([
  {
    element: <RouterFirstChild />,
    children: [
      {
        path: "/",
        element: <Navigate to="/app/home" />,
      },
      {
        loader: appLoader,
        path: "/app",
        element: <AppLayout />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "checkout",
            element: <Checkout />,
          },
        ],
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        loader: dashboardLoader,
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard",
            element: <Navigate to="/dashboard/product" />,
          },

          {
            path: "product",
            element: <ProductBoard />,
          },
          {
            path: "modify",
            element: <ProductEditor />,
          },
        ],
      },
    ],
  },
]);

export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PopupProvider>
        <RouterProvider router={router} />
      </PopupProvider>
    </QueryClientProvider>
  );
}
