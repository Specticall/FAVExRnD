import { ReactNode, createContext, useContext } from "react";
import { TCart } from "../Services/API";
import { TAPIResponse } from "../utils/helper";
import { API_URL } from "../Services/config";
import axios, { AxiosResponse } from "axios";
import { UseQueryResult, useQuery } from "react-query";
import { useAuth } from "./AuthContext";

type TCartContextValues = {
  productsInCart: TCart[] | undefined;
  isLoadingCartData: boolean;
  isInCart: (product_id: number) => boolean;
  cartQuery: UseQueryResult<AxiosResponse, unknown>;
};

const CartContext = createContext<TCartContextValues | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const cartQuery = useQuery({
    queryKey: ["cartProductList", token],
    queryFn: () => {
      return axios.get(`${API_URL}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      });
    },
  });

  // useEffect(() => {
  //   if (!userData?.id) return;
  //   console.log("CHANGE USER, REFETCH CART");
  //   cartQuery.refetch();
  // }, [userData?.id, cartQuery]);

  const productsInCart = (
    cartQuery.data?.data as TAPIResponse<{ cart: TCart[] } | undefined>
  )?.data?.cart;
  // console.log(productsInCart);
  const isLoadingCartData = cartQuery.isLoading;

  const isInCart = (product_id: number) => {
    return (
      productsInCart?.some((product) => product.product_id === product_id) ||
      false
    );
  };

  return (
    <CartContext.Provider
      value={{
        productsInCart,
        isLoadingCartData,
        cartQuery,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart must be used inside of it's Provider's scope");
  return context;
}
