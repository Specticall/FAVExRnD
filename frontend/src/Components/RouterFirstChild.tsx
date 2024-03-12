import { AuthProvider } from "../Context/AuthContext";
import { Outlet } from "react-router-dom";
import CategoryModal from "./CategoryModal";
import { ModalProvider } from "../Context/ModalContext";
import { PageLoader } from "../Context/LoaderContext";
import TransactionSuccessModal from "./TransactionSuccessModal";

const modalElements = [
  {
    name: "category",
    element: <CategoryModal />,
  },
  {
    name: "transactionSuccess",
    element: <TransactionSuccessModal />,
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
