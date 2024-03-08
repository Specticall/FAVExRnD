import { useMutation } from "react-query";
import { isAPIDeleteResponse } from "../utils/helper";
import { useNavigate, useRevalidator } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { API_URL, TAPIResponse, TProduct } from "../Services/API";
type TProductWithoutId = Omit<TProduct, "id">;

const updateProduct = ({
  product,
  id,
}: {
  product: TProductWithoutId;
  id?: string;
}) => {
  return axios.put(`${API_URL}/api/products/${id}`, product, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

const createProduct = ({
  product,
}: {
  product: TProductWithoutId;
  id?: string;
}) => {
  return axios.post(`${API_URL}/api/products`, product, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

const deleteProduct = ({ id }: { id: string }) => {
  return axios.delete(`${API_URL}/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

type TDataMutationFn =
  | {
      product: TProductWithoutId;
      type: "create";
    }
  | {
      product: TProductWithoutId;
      id: string;
      type: "update";
    }
  | {
      type: "delete";
      id: string;
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

export default function useProductEditorMutation() {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const mutation = useMutation(mutateData, {
    onError(error: AxiosError) {
      console.log({ ...error, stack: "" });
    },
    onSuccess(data) {
      const responseData = (data.data as TAPIResponse).data;
      revalidator.revalidate();
      if (isAPIDeleteResponse(responseData)) {
        navigate("/dashboard/product");
      }
    },
  });

  return { mutation };
}
