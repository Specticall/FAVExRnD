import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import { TextInput } from "./TextInput";
import MultiDropdownInput from "./MultiDropdownInput";
import { API_URL, TProduct, productType } from "../Services/API";
import Counter from "./Counter";
import ImageInput from "./ImageInput";
import { useDashboard } from "../Context/DashboardContext";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { convertImageToBase64 } from "../utils/helper";

function ProductNavbar() {
  return (
    <div className="mt-12 flex justify-between items-center">
      <div className="flex gap-4 items-center justify-center">
        <Button
          className="border-[1.5px] border-main px-6 py-2 rounded-md text-main text-small hover:bg-light hover:text-white cursor-pointer"
          to="/dashboard/product"
        >
          Your Products
        </Button>
        <Button className="border-[1.5px] border-main bg-main px-6 py-2 rounded-md text-body text-small hover:bg-light cursor-pointer">
          + Add Products
        </Button>
      </div>
    </div>
  );
}

type TProductProperties = {
  name: string;
  desc: string;
  price: number;
  stock: number;
  category: string[];
};

type TProductWithoutId = Omit<TProduct, "id">;

const updateProduct = ({
  product,
  id,
}: {
  product: TProductWithoutId;
  id?: string;
}) => {
  console.log(localStorage.getItem("token") || "");
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
  return axios.post(`${API_URL}/api/products/`, product, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
};

export default function ProductEditor() {
  const [temporaryImageURL, setTemporaryImageURL] = useState("");
  const { selectedProduct } = useDashboard();
  const mutation = useMutation(
    selectedProduct?.id ? updateProduct : createProduct,
    {
      onError(error: AxiosError) {
        console.log({ ...error, stack: "" });
      },
      onSuccess(data) {
        console.log(data);
      },
    }
  );

  const { register, handleSubmit, control } = useForm<TProductProperties>({
    defaultValues: {
      name: selectedProduct?.name || "",
      desc: selectedProduct?.desc || "",
      price: selectedProduct?.price || 0,
      stock: selectedProduct?.stock || 0,
      category: selectedProduct?.category || [],
    },
  });

  const onSubmit: SubmitHandler<TProductProperties> = async (value) => {
    // Checks if the posted product is an update or a creation
    const base64Image = await convertImageToBase64(temporaryImageURL);
    const newValue = {
      ...value,
      img: base64Image,
      discount: 0,
    };

    // console.log(newValue);
    mutation.mutate({ product: newValue, id: selectedProduct?.id });
  };

  return (
    <div>
      <ProductNavbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" mt-8 p-8 rounded-lg bg-[#FFFCFA] min-h-[35rem] h-[40rem] grid grid-cols-[22.5rem_1fr] gap-10"
      >
        <ImageInput onChange={(imageURL) => setTemporaryImageURL(imageURL)} />
        <div className="grid">
          <div>
            <h2 className="mb-6 text-title font-semibold text-main ">
              Add Products
            </h2>
            <div className="flex gap-8 [&>*]:w-full">
              <TextInput
                placeholder="Product Name"
                {...register("name")}
                formLabel="Product Name"
                style="boxed"
              />
              <TextInput
                placeholder="Product Price"
                {...register("price")}
                formLabel="Product Price"
                style="boxed"
              />
            </div>
            <div className="mt-4">
              <label className="text-small text-lighter ">Description</label>
              <textarea
                {...register("desc")}
                className="resize-none border-[1.5px] border-main mt-2 rounded-md w-full bg-transparent min-h-[6.5rem] placeholder:text-light/50 text px-4 py-3 text-main outline-none"
                placeholder="Stylish graphic t-shirt, featuring a unique design that..."
              ></textarea>
            </div>
            <div className="mt-4 grid grid-cols-2 place-items-start gap-8 [&>*]:w-full">
              <div className="grid gap-2">
                <label className="text-small text-lighter">Category</label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field: { onChange } }) => {
                    return (
                      <MultiDropdownInput
                        options={productType}
                        onSelect={onChange}
                      />
                    );
                  }}
                />
                <p className="text-small text-lighter">
                  (Can select more than one)
                </p>
              </div>
              <div className="grid gap-2 max-w-[10rem]">
                <label className="text-small text-lighter">Stock</label>
                <Controller
                  name="stock"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Counter onChange={onChange} defaultValue={value} />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="justify-self-end self-end grid grid-cols-2  gap-4">
            <Button className="px-6 py-2 bg-transparent text-main border-[1.5px] border-main rounded-md hover:bg-light hover:text-body">
              Discard
            </Button>
            <Button className="px-6 py-2 bg-main text-body rounded-md hover:bg-light">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
