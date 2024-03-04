import { useState } from "react";
import ProductList from "./ProductList";

const productType = [
  "All",
  "Sweatshirts",
  "Knitwear",
  "Polo Shirts",
  "T-shirt",
  "Shirts",
  "Trousers",
  "Hats",
] as const;

type TProductType = (typeof productType)[number];
const selectedStyle = { background: "#392A2A", color: "#F9F1E9" };
export function Products() {
  const [gender, setGender] = useState<"Men" | "Women">("Men");
  const [type, setType] = useState<TProductType>(productType[0]);

  const handleSelectGender = (gender: "Men" | "Women") => () => {
    setGender(gender);
  };

  const handleSelectType = (type: TProductType) => () => {
    setType(type);
  };

  return (
    <section className="mt-32 max-w-[70rem] mx-auto ">
      <div className="grid grid-cols-2 gap-8 px-8">
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
      </div>

      <ul className="flex justify-between px-16 mt-8 border-[2px] border-main rounded-md mx-8 py-4 text-small font-body">
        {productType.map((product, i) => {
          return (
            <li
              key={`${product}-${i}-key`}
              className="hover:text-light cursor-pointer px-4 py-2 rounded-md"
              style={
                type === product
                  ? {
                      fontWeight: "400",
                      background: "#392A2A",
                      color: "#F9F1E9",
                    }
                  : undefined
              }
              onClick={handleSelectType(product)}
            >
              {product}
            </li>
          );
        })}
      </ul>
      <ProductList />
      <ProductList />
    </section>
  );
}
