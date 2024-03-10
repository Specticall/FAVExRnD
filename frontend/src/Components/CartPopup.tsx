import { useEffect, useState } from "react";
import { TProduct } from "../Services/API";
import { IMAGE_PATH, convertToRupiah } from "../utils/helper";
import Counter from "./Counter";
import { useCart } from "../Context/CartContext";
import useCartMutation from "../Hooks/useCartMutation";

export function CartPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { productsInCart, isLoadingCartData } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const handeClose = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".cart-popup-container")) return;
      setIsOpen(false);
    };

    window.addEventListener("click", handeClose);

    return () => {
      window.removeEventListener("click", handeClose);
    };
  }, [isOpen]);

  return (
    <div className="cart-popup-container">
      <li
        className="cursor-pointer text-main hover:text-light"
        onClick={() => setIsOpen((cur) => !cur)}
      >
        Cart
      </li>
      <div className="bg-black/20 inset-0">
        <div className="absolute right-[1rem] top-[5rem]">
          <div
            className="grid transition-all duration-300"
            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="bg-[#FFFCFA] w-fit px-6 py-6 rounded-lg shadow-xl shadow-main/20">
                {isLoadingCartData && "Is Loading"}
                <div className="flex mb-6 justify-between items-center">
                  <h2 className="text-heading text-main font-semibold">Cart</h2>
                  <p className="text-light/50 text-small underline">
                    Remove All
                  </p>
                </div>
                {productsInCart && (
                  <ul className="grid gap-4">
                    {productsInCart?.map((cartItem) => {
                      return <CartItem product={cartItem.product} />;
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItem({ product }: { product: TProduct }) {
  const { productsInCart } = useCart();
  const { addToCart } = useCartMutation({ product });
  const defaultCount =
    productsInCart?.find((cartItem) => cartItem.product_id === product.id)
      ?.quantity || 1;

  return (
    <li className="grid grid-cols-[3rem_7rem_6.5rem] h-12 gap-4 content-center items-center">
      <div className="h-full aspect-square">
        <img
          src={`${IMAGE_PATH}/${product.img}`}
          alt="product image"
          className="object-cover h-full w-full rounded-md"
        />
      </div>
      <div className="w-full mr-2">
        <p className="truncate text-main text-small font-semibold ">
          {product.name}
        </p>
        <p className="text-light text-small w-full">
          {convertToRupiah(product.price)}
        </p>
      </div>
      <Counter
        defaultValue={defaultCount}
        onChange={() => addToCart()}
        className={{
          button: "px-2 [&&]:py-2 text-small rounded-md",
          counter: "px-2 [&&]:py-1 min-w-[2rem] rounded-md",
        }}
      />
    </li>
  );
}
