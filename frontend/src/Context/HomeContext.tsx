import { ReactNode, createContext, useContext, useState } from "react";
import { TProduct, TUserData } from "../Services/API";
import { TCategory } from "./DashboardContext";
import { useLoaderData } from "react-router-dom";

type THomeContextValues = {
  userData?: TUserData;
  productData?: (TProduct & { user: TUserData })[];
  categoryData?: TCategory[];
  setFilter: (categoryId: number) => void;
  selectedFilter: TCategory;
};

const HomeContext = createContext<THomeContextValues | null>(null);

export function HomeProvider({ children }: { children: ReactNode }) {
  const loadedData = useLoaderData() as {
    userData?: TUserData;
    productData?: (TProduct & { user: TUserData })[];
    categoryData?: TCategory[];
  };

  const [selectedFilter, setSelectedFilter] = useState<TCategory | undefined>();

  const userData = loadedData?.userData;
  const productData = loadedData?.productData;
  const categoryData = loadedData?.categoryData;

  const setFilter = (categoryId: number) => {
    const targetCategory = categoryData?.find(
      (category) => category.id === categoryId
    );
    if (!targetCategory) {
      throw new Error(`Can't switch to category id: ${categoryId}`);
    }
    setSelectedFilter(targetCategory);
  };

  return (
    <HomeContext.Provider
      value={{
        userData,
        categoryData,
        productData,
        setFilter,
        selectedFilter,
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
