import { useEffect, useState } from "react";
import { TProduct } from "../Services/API";
import { IMAGE_PATH, convertToRupiah } from "../utils/helper";
import Counter from "./Counter";
import { useCart } from "../Context/CartContext";
import useCartMutation from "../Hooks/useCartMutation";
import Button from "./Button";

export function CartPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { productsInCart, isLoadingCartData, cartQuery } = useCart();
  const totalPrice =
    productsInCart?.reduce((total, cartItem) => {
      return (total +=
        cartItem.quantity *
        cartItem.product.price *
        (1 - (cartItem.product?.discount || 0)));
    }, 0) || 0;

  const totalQuantity = productsInCart?.reduce((total, cartItem) => {
    return total + Number(cartItem.quantity);
  }, 0);

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
        className="cursor-pointer text-main hover:text-light relative"
        onClick={() => setIsOpen((cur) => !cur)}
      >
        <i className="bx bxs-cart text-[1.75rem] text-main hover:text-light"></i>
        <p className="bg-danger text-body rounded-full text-small flex items-center justify-center absolute px-1 top-4 right-[-1rem]">
          {totalQuantity}
        </p>
      </li>
      <div className="bg-black/20 inset-0">
        <div className="absolute left-[1rem] top-[5rem]">
          <div
            className="grid transition-all duration-300"
            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className="bg-[#FFFCFA] w-fit px-6 py-6 rounded-lg shadow-xl shadow-main/20">
                {isLoadingCartData && "Is Loading"}
                <div className="flex mb-6 justify-between items-center min-w-[10rem]">
                  <h2 className="text-heading text-main font-semibold">Cart</h2>
                  <p className="text-light/50 text-small underline">
                    Remove All
                  </p>
                </div>
                {productsInCart && productsInCart.length > 0 ? (
                  <ul className="grid gap-5">
                    {productsInCart?.map((cartItem) => {
                      return <CartItem product={cartItem.product} />;
                    })}
                  </ul>
                ) : (
                  <div className="min-w-[20rem] text-heading text-light text-center py-12">
                    Cart is empty
                  </div>
                )}
                {productsInCart && productsInCart.length > 0 && (
                  <>
                    <div className="flex justify-between gap-4 mt-6 items-center border-t-[1px] border-light/50 pt-4">
                      <p className="text-heading text-light/70">Total</p>
                      <p className="text-main text-heading font-semibold">
                        {isLoadingCartData || cartQuery.isRefetching
                          ? "Calculating Total Price..."
                          : convertToRupiah(totalPrice || 0)}
                      </p>
                    </div>
                    <Button className="w-full px-4 py-2 bg-main rounded-md text-heading text-body mt-4 hover:bg-light">
                      Checkout
                    </Button>
                  </>
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
