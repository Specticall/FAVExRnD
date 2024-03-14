import { useMutation } from "react-query";
import { isAPIDeleteResponse } from "../utils/helper";
import { useNavigate, useRevalidator } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { TAPIResponse } from "../Services/API";
import { API_URL } from "../Services/config";
import { usePopup } from "../Context/PopupContext";
import { TProductProperties } from "../Components/ProductEditor";
import { useAuth } from "../Context/AuthContext";
type TProductWithoutId = Omit<TProductProperties, "id">;
type TDataMutationFn =
  | {
      product: TProductWithoutId;
      type: "create";
    }
  | {
      product: TProductWithoutId;
      id: number;
      type: "update";
    }
  | {
      type: "delete";
      id: number;
    };
export default function useProductEditorMutation() {
  const { notify } = usePopup();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const { AUTH_HEADER } = useAuth();

  const updateProduct = ({
    product,
    id,
  }: {
    product: TProductWithoutId;
    id?: number;
  }) => {
    console.log("ABOUT TO SEND", product);
    return axios.put(`${API_URL}/api/products/${id}`, product, AUTH_HEADER);
  };

  const createProduct = ({
    product,
  }: {
    product: TProductWithoutId;
    id?: number;
  }) => {
    return axios.post(`${API_URL}/api/products`, product, AUTH_HEADER);
  };

  const deleteProduct = ({ id }: { id: number }) => {
    return axios.delete(`${API_URL}/api/products/${id}`, AUTH_HEADER);
  };

  const mutateData = (data: TDataMutationFn) => {
    switch (data.type) {
      case "create":
        return createProduct({ product: data.product });
      case "delete":
        return deleteProduct({ id: data.id });
      case "update":
        return updateProduct({ product: data.product, id: data.id });
    }
    console.log("Unkown Fetch type");
  };

  const mutation = useMutation(
    (data: TDataMutationFn) => {
      return mutateData(data);
    },
    {
      onError(error: AxiosError) {
        console.log({ ...error, stack: "" });
        notify("Oops, Something went wrong");
      },
      onSuccess(data) {
        const responseData = (data.data as TAPIResponse).data;

        if (isAPIDeleteResponse(responseData)) {
          navigate("/dashboard/product");
          notify("Successfuly Deleted Item");
          return;
        }

        revalidator.revalidate();
        notify("Successfuly Saved Item");
      },
    }
  );

  return { mutation };
}
