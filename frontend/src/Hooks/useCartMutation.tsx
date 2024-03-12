import { useEffect, useState } from "react";
import { TProduct } from "../Services/API";
import { useCart } from "../Context/CartContext";
import { usePopup } from "../Context/PopupContext";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { API_URL } from "../Services/config";
import { useAuth } from "../Context/AuthContext";
import { TAPIResponse } from "../utils/helper";
/**
 * Used to modify cart at a singluar component level (used inside the cart item, not container)
 * @param product : product object
 * @returns
 */
export default function useCartMutation({
  product,
}: {
  product: TProduct | undefined;
}) {
  const { cartQuery, productsInCart } = useCart();
  const [cartId, setCartId] = useState<number | undefined>();
  const { notify } = usePopup();
  const { AUTH_HEADER } = useAuth();

  // Retrieves the cart id from the query
  useEffect(() => {
    const cartIdFromQuery = productsInCart?.find(
      (cartItem) => cartItem.product.id === product?.id
    )?.id;
    setCartId(cartIdFromQuery);
  }, [cartQuery, productsInCart, product?.id]);

  // Handles POST requests
  const createCartItem = useMutation(
    (product: { product_id: number; quantity: string }) => {
      return axios.post(`${API_URL}/api/cart`, product, AUTH_HEADER);
    },
    {
      onSuccess(data) {
        const serverMessage = (data.data as TAPIResponse<{ msg: string }>).data
          .msg;

        if (!serverMessage.includes("the quantity will be added"))
          notify("Successfuly updated cart");

        cartQuery.refetch();
      },
      onError(error: AxiosError) {
        notify("Oops, something wen't wrong");
        console.log({ ...error, stack: "" });
      },
    }
  );

  const decrementCartItem = useMutation(
    () => {
      return axios.put(
        `${API_URL}/api/cart/decrement/${cartId}`,
        {},
        AUTH_HEADER
      );
    },
    {
      onSuccess() {
        cartQuery.refetch();
      },
      onError(error: AxiosError) {
        notify("Oops, something wen't wrong");
        console.log({ ...error, stack: "" });
      },
    }
  );

  // Handles DELETE requests
  const deleteCartItem = useMutation(
    () => {
      return axios.delete(`${API_URL}/api/cart/${cartId}`, AUTH_HEADER);
    },
    {
      onSuccess() {
        notify("Successfuly removed");
        cartQuery.refetch();
      },
      onError(error: AxiosError) {
        notify("Oops, something wen't wrong");
        console.log({ ...error, stack: "" });
      },
    }
  );

  // handles
  const addToCart = () => {
    if (!product) return notify("Product does not exist");
    createCartItem.mutate({ product_id: product.id, quantity: "1" });
  };

  const decrementCart = () => {
    if (!product) return notify("Product does not exist");
    decrementCartItem.mutate();
  };

  const removeFromCart = () => {
    if (!cartId) return notify("Cart Id does not exist");
    deleteCartItem.mutate();
  };

  const isDeleting = deleteCartItem.isLoading;
  const isCreating = createCartItem.isLoading;

  return { addToCart, removeFromCart, isDeleting, isCreating, decrementCart };
}
