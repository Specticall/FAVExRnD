import { ReactNode, createContext, useContext } from "react";
import { TProduct, TUserData } from "../Services/API";
import { TCategory } from "./DashboardContext";
import { useLoaderData } from "react-router-dom";

type THomeContextValues = {
  userData?: TUserData;
  productData?: (TProduct & { user: TUserData })[];
  categoryData?: TCategory[];
  // isAuthenticated: boolean;
  // logoutUser: () => void;
};

const HomeContext = createContext<THomeContextValues | null>(null);

export function HomeProvider({ children }: { children: ReactNode }) {
  // const revalidator = useRevalidator();
  const loadedData = useLoaderData() as {
    userData?: TUserData;
    productData?: (TProduct & { user: TUserData })[];
    categoryData?: TCategory[];
  };

  const userData = loadedData?.userData;
  const productData = loadedData?.productData;
  const categoryData = loadedData?.categoryData;

  // const isAuthenticated = userData?.name ? true : false;

  // const logoutUser = () => {
  //   console.log("LOGOUT");
  //   queryClient.invalidateQueries();
  //   localStorage.removeItem("token");
  //   revalidator.revalidate();
  // };

  return (
    <HomeContext.Provider
      value={{
        userData,
        categoryData,
        productData,
        // isAuthenticated,
        // logoutUser,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}

export function useHome() {
  const context = useContext(HomeContext);
  if (!context)
    throw new Error("useHome must be used inside of it's Provider's scope");
  return context;
}
