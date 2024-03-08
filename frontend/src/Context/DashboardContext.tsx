import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { TProduct, TUserData } from "../Services/API";
import { useLoaderData } from "react-router-dom";

type TDashboardContextValues = {
  userData: TUserData;
  productData: (TProduct & { user: TUserData })[];
  productFiltered: (TProduct & { user: TUserData })[];
  setProductSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

const DashboardContext = createContext<TDashboardContextValues | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { userData, productData } = useLoaderData() as {
    userData: TUserData;
    productData: (TProduct & { user: TUserData })[];
  };
  const [productSearchQuery, setProductSearchQuery] = useState("");

  // Returns product with filters applied (e.g. search, sort, etc..)
  const productFiltered = useMemo(
    () =>
      productData.filter((product) =>
        // SEARCH FILTER
        product.name
          .toLocaleLowerCase()
          .includes(productSearchQuery.toLocaleLowerCase())
      ),
    [productSearchQuery, productData]
  );

  return (
    <DashboardContext.Provider
      value={{ userData, productData, productFiltered, setProductSearchQuery }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error("useDashboard must be used inside of its provider's scope");
  return context;
}
