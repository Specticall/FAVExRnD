import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home, { loader as homeLoader } from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { QueryClient, QueryClientProvider } from "react-query";
import Dashboard, { loader as dashboardLoader } from "./Pages/Dashboard";
import { ProductBoard } from "./Components/ProductBoard";
import ProductEditor from "./Components/ProductEditor";
import { AuthProvider } from "./Context/AuthContext";
import PopupProvider from "./Context/PopupContext";
import { ModalProvider } from "./Context/ModalContext";
import CategoryModal from "./Components/CategoryModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    loader: homeLoader,
    path: "/home",
    element: <Home />,
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
]);

const modalElements = [
  {
    name: "category",
    element: <CategoryModal />,
  },
];

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PopupProvider>
        <AuthProvider>
          <ModalProvider elements={modalElements}>
            <RouterProvider router={router} />
          </ModalProvider>
        </AuthProvider>
      </PopupProvider>
    </QueryClientProvider>
  );
}
