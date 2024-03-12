import { ReactNode, createContext, useContext, useState } from "react";
import { useApp } from "./AppContext";
import { TCategory } from "./DashboardContext";

type THomeContextValues = {
  setFilter: (categoryId: number) => void;
  selectedFilter: TCategory | undefined;
};

const HomeContext = createContext<THomeContextValues | null>(null);

export function HomeProvider({ children }: { children: ReactNode }) {
  const { categoryData } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<TCategory | undefined>(
    categoryData?.[0]
  );

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
