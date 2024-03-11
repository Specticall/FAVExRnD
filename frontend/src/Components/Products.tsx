import { useState } from "react";
import ProductList from "./ProductList";
import { TCategory } from "../Context/DashboardContext";
import { useHome } from "../Context/HomeContext";

// type TProductType = (typeof productType)[number];

const selectedStyle = { background: "#392A2A", color: "#F9F1E9" };
export function Products() {
  const { categoryData, setFilter, selectedFilter } = useHome();

  const [gender, setGender] = useState<"Men" | "Women">("Men");
  const [type, setType] = useState<TCategory | undefined>(categoryData?.[0]);

  const handleSelectGender = (gender: "Men" | "Women") => () => {
    setGender(gender);
  };

  const handleSelectType = (type: TCategory) => {
    console.log(type);
    setType(type);
  };

  console.log("WE SELECT THIS", selectedFilter);
  return (
    <section className="mt-32 max-w-[70rem] mx-auto ">
      {/* <div className="grid grid-cols-2 gap-8 px-8">
        <button
          className="border-main border-[2px] text-main text-title py-4 rounded-md hover:bg-light hover:text-body hover:border-light transition-all duration-75"
          style={gender === "Men" ? selectedStyle : undefined}
          onClick={handleSelectGender("Men")}
        >
          Men
        </button>
        <button
          className="border-main border-[2px] text-main text-title py-4 rounded-md hover:bg-light hover:text-body hover:border-light transition-all duration-75"
          style={gender === "Women" ? selectedStyle : undefined}
          onClick={handleSelectGender("Women")}
        >
          Women
        </button>
      </div> */}

      <ul className="flex justify-center px-16 mt-8 border-[2px] border-main rounded-md mx-8 py-4 text-small font-body gap-8">
        {categoryData?.map((category, i) => {
          // console.log(category.id === type?.id, type);
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
      <div className="px-8 mt-16">
        <h2 className="text-large font-semibold mb-4 text-main">On Sale</h2>
        <ProductList isDiscount categoryFilter={selectedFilter} />
      </div>
      <div className="px-8 mt-16">
        <h2 className="text-large font-semibold mb-4">All Products</h2>
        <ProductList noFilter />
      </div>
    </section>
  );
}
