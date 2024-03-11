import { AuthProvider } from "../Context/AuthContext";
import { Outlet } from "react-router-dom";
import CategoryModal from "./CategoryModal";
import { ModalProvider } from "../Context/ModalContext";
import { PageLoader } from "../Context/LoaderContext";

const modalElements = [
  {
    name: "category",
    element: <CategoryModal />,
  },
];

export default function RouterFirstChild() {
  return (
    <>
      <AuthProvider>
        <ModalProvider elements={modalElements}>
          <PageLoader>
            <Outlet />
          </PageLoader>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}
