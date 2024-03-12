import { useState } from "react";
import ProductList from "./ProductList";
import { TCategory } from "../Context/DashboardContext";
import { useApp } from "../Context/AppContext";
import { useHome } from "../Context/HomeContext";

// type TProductType = (typeof productType)[number];

export function Products() {
  const { categoryData } = useApp();
  const { setFilter, selectedFilter } = useHome();

  const [type, setType] = useState<TCategory | undefined>(categoryData?.[0]);

  const handleSelectType = (type: TCategory) => {
    setType(type);
  };

  return (
    <section className="mt-24 max-w-[70rem] mx-auto ">
      <ul className="flex justify-center px-16 mt-8 border-[2px] border-main rounded-md mx-8 py-4 text-small font-body gap-8">
        {categoryData?.map((category, i) => {
          return (
            <li
              key={`${category.id}-${i}-key`}
              className="hover:text-light cursor-pointer px-4 py-2 rounded-md"
              style={
                type?.id === category.id
                  ? {
                      fontWeight: "400",
                      background: "#392A2A",
                      color: "#F9F1E9",
                    }
                  : undefined
              }
              onClick={() => {
                handleSelectType(category);
                setFilter(category.id);
              }}
            >
              {category.label}
            </li>
          );
        })}
      </ul>
      <ProductList isDiscount categoryFilter={selectedFilter} label="On Sale" />
      <ProductList
        categoryFilter={selectedFilter}
        label={`${selectedFilter?.label} Products`}
      />
      <ProductList noFilter label={`All Products`} />
    </section>
  );
}
