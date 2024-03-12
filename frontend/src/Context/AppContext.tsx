import { ReactNode, createContext, useContext } from "react";
import { TProduct, TUserData } from "../Services/API";
import { TCategory } from "./DashboardContext";
import { useLoaderData } from "react-router-dom";

type TAppContextValues = {
  userData?: TUserData;
  productData?: (TProduct & { user: TUserData })[];
  categoryData?: TCategory[];
  // setFilter: (categoryId: number) => void;
  // selectedFilter: TCategory | undefined;
};

const AppContext = createContext<TAppContextValues | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const loadedData = useLoaderData() as {
    userData?: TUserData;
    productData?: (TProduct & { user: TUserData })[];
    categoryData?: TCategory[];
  };
  const userData = loadedData?.userData;
  const productData = loadedData?.productData;
  const categoryData = loadedData?.categoryData;

  // const [selectedFilter, setSelectedFilter] = useState<TCategory | undefined>(
  //   categoryData?.[0]
  // );

  // const setFilter = (categoryId: number) => {
  //   const targetCategory = categoryData?.find(
  //     (category) => category.id === categoryId
  //   );
  //   if (!targetCategory) {
  //     throw new Error(`Can't switch to category id: ${categoryId}`);
  //   }
  //   setSelectedFilter(targetCategory);
  // };

  return (
    <AppContext.Provider
      value={{
        userData,
        categoryData,
        productData,
        // setFilter,
        // selectedFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useApp must be used inside of it's Provider's scope");
  return context;
}
