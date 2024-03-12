import { useState } from "react";
import { TProduct } from "../Services/API";
import { IMAGE_PATH, convertToRupiah } from "../utils/helper";
import Counter from "./Counter";
import { useCart } from "../Context/CartContext";
import useCartMutation from "../Hooks/useCartMutation";

export function CartItem({ product }: { product: TProduct }) {
  // Optimisticly remove the current cart element when the counter reaches 0, the item will persist on refresh if something went wrong.
  const [optimisticRemove, setOptimisticRemove] = useState(false);

  const { productsInCart } = useCart();
  const { addToCart, decrementCart, removeFromCart } = useCartMutation({
    product,
  });
  const defaultCount =
    productsInCart?.find((cartItem) => cartItem.product_id === product.id)
      ?.quantity || 1;

  return (
    <li
      className="grid grid-cols-[3rem_7rem_6.5rem] h-12 gap-4 content-center items-center"
      style={optimisticRemove ? { display: "none" } : undefined}
    >
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
          {convertToRupiah(product.price * (1 - (product.discount || 0)))}
        </p>
      </div>
      <Counter
        allowDirectEdit={false}
        defaultValue={defaultCount}
        onIncrement={addToCart}
        onDecrement={(counter) => {
          if (counter < 0) return;

          if (counter === 0) {
            setOptimisticRemove(true);
            removeFromCart();
            return;
          }
          decrementCart();
        }}
        className={{
          button: "px-2 [&&]:py-2 text-small rounded-md",
          counter: "px-2 [&&]:py-1 min-w-[2rem] rounded-md",
        }}
      />
    </li>
  );
}
