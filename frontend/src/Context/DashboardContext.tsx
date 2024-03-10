import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { TProduct, TUserData } from "../Services/API";
import { useLoaderData } from "react-router-dom";

type TDashboardContextValues = {
  userData?: TUserData;
  productData?: (TProduct & { user: TUserData })[];
  categoryData?: TCategory[];
  productFiltered?: (TProduct & { user: TUserData })[];
  setProductSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectProductById: (id: number | null) => void;
  selectedProduct: (TProduct & { user: TUserData }) | undefined;
  onGoingRequest: number;
  setOnGoingRequest: React.Dispatch<React.SetStateAction<number>>;
};

export type TCategory = {
  label: string;
  id: number;
};

const DashboardContext = createContext<TDashboardContextValues | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { userData, productData, categoryData } = useLoaderData() as {
    userData?: TUserData;
    productData?: (TProduct & { user: TUserData })[];
    categoryData?: TCategory[];
  };
  const [onGoingRequest, setOnGoingRequest] = useState<number>(0);
  const [productSearchQuery, setProductSearchQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<
    (TProduct & { user: TUserData }) | undefined
  >();

  const selectProductById = (id: number | null) => {
    if (id) {
      setSelectedProduct(productData?.find((product) => product.id === id));
    } else {
      setSelectedProduct(undefined);
    }
  };

  // Returns product with filters applied (e.g. search, sort, etc..)
  const productFiltered = useMemo(
    () =>
      productData?.filter((product) =>
        // SEARCH FILTER
        product.name
          .toLocaleLowerCase()
          .includes(productSearchQuery.toLocaleLowerCase())
      ),
    [productSearchQuery, productData]
  );

  return (
    <DashboardContext.Provider
      value={{
        userData,
        productData,
        categoryData,
        productFiltered,
        setProductSearchQuery,
        selectProductById,
        selectedProduct,
        onGoingRequest,
        setOnGoingRequest,
      }}
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
