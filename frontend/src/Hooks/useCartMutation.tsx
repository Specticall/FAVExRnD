import { useEffect, useState } from "react";
import { TProduct } from "../Services/API";
import { useCart } from "../Context/CartContext";
import { usePopup } from "../Context/PopupContext";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { API_URL } from "../Services/config";
import { useAuth } from "../Context/AuthContext";

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
      onSuccess() {
        notify("Successfuly added to cart");
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
    (cart_product_id: number) => {
      return axios.delete(
        `${API_URL}/api/cart/${cart_product_id}`,
        AUTH_HEADER
      );
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

  const removeFromCart = () => {
    if (!cartId) return notify("Cart Id does not exist");
    deleteCartItem.mutate(cartId);
  };

  const isDeleting = deleteCartItem.isLoading;
  const isCreating = createCartItem.isLoading;

  return { addToCart, removeFromCart, isDeleting, isCreating };
}
