import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "./Button";
import { TextInput } from "./TextInput";
import MultiDropdownInput from "./MultiDropdownInput";
import Counter from "./Counter";
import ImageInput from "./ImageInput";
import { useDashboard } from "../Context/DashboardContext";
import { useEffect, useState } from "react";
import { convertImageToBase64 } from "../utils/helper";
import useProductEditorMutation from "../Hooks/useProductEditorMutation";
import Spinner from "./Spinner";
import { useModal } from "../Context/ModalContext";
import { useNavigate, useRevalidator } from "react-router-dom";

function ProductNavbar() {
  const { showModal } = useModal();
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
      <Button
        onClick={() => showModal("category")}
        className="border-[1.5px] border-main px-6 py-2 rounded-md text-main text-small hover:bg-light hover:text-white cursor-pointer"
      >
        + Add Category
      </Button>
    </div>
  );
}

export type TProductProperties = {
  name: string;
  desc: string;
  price: number;
  stock: number;
  categories: number[];
};

export default function ProductEditor() {
  // Changes value whenever from the modal closes which can be used with the effect to trigger a rerender. The code below is used to sync the categories UI with the latest data
  const { shouldRevalidate } = useModal();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard/modify");
  }, [shouldRevalidate, navigate]);

  const { selectedProduct, categoryData } = useDashboard();
  const [temporaryImageURL, setTemporaryImageURL] = useState("");

  // Encapsulates the product editor login into a single custom hook.
  const { mutation } = useProductEditorMutation();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TProductProperties>({
    defaultValues: {
      name: selectedProduct?.name || "",
      desc: selectedProduct?.desc || "",
      price: selectedProduct?.price,
      stock: selectedProduct?.stock || 0,
      categories:
        selectedProduct?.categories.map((category) => category.id) || [],
    },
  });

  const onSubmit: SubmitHandler<TProductProperties> = async (value) => {
    // Checks if the posted product is an update or a creation
    const base64Image = temporaryImageURL
      ? await convertImageToBase64(temporaryImageURL)
      : "";
    const newValue = {
      ...value,
      img: base64Image,
      price: Number(value.price),
      discount: 0,
    };
    const id = selectedProduct?.id;
    // If an id for a product exist means we're updating.
    if (id) {
      mutation.mutate({ product: newValue, id, type: "update" });
    } else {
      mutation.mutate({ product: newValue, type: "create" });
    }
  };

  const handleDelete = () => {
    if (!selectedProduct) return;
    mutation.mutate({ type: "delete", id: selectedProduct.id });
  };

  return (
    <div>
      <ProductNavbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" mt-8 p-8 rounded-lg bg-[#FFFCFA] min-h-[35rem] h-[40rem] grid grid-cols-[22.5rem_1fr] gap-10"
      >
        <ImageInput
          onChange={(imageURL) => setTemporaryImageURL(imageURL)}
          imageName={selectedProduct?.img}
        />
        <div className="grid">
          <div>
            <div className="flex mb-6 items-center justify-between">
              <h2 className=" text-title font-semibold text-main ">
                Add Products
              </h2>
              {selectedProduct?.id && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                >
                  <i className="bx bx-trash text-title hover:text-danger text-light/50 cursor-pointer"></i>
                </Button>
              )}
            </div>
            <div className="flex gap-8 [&>*]:w-full">
              <TextInput
                placeholder="Product Name"
                {...register("name", { required: "Field can't be empty" })}
                formLabel="Product Name"
                style="boxed"
                errorMessage={errors.name?.message}
              />
              <TextInput
                placeholder="Product Price"
                {...register("price", {
                  required: "Field can't be empty",
                  valueAsNumber: true,
                })}
                type="number"
                formLabel="Product Price"
                style="boxed"
                errorMessage={errors.price?.message}
              />
            </div>
            <div className="mt-4">
              <label className="text-small text-lighter ">Description</label>
              <textarea
                {...register("desc", { required: "Field can't be empty" })}
                className="resize-none border-[1.5px] border-main mt-2 rounded-md w-full bg-transparent min-h-[6.5rem] placeholder:text-light/50 text px-4 py-3 text-main outline-none"
                placeholder="Stylish graphic t-shirt, featuring a unique design that..."
                style={errors.desc ? { borderColor: "#CC2A06" } : undefined}
              ></textarea>
              {errors.desc && (
                <p className="text-danger text-small mt-2">
                  {errors.desc?.message}
                </p>
              )}
            </div>
            <div className="mt-4 grid grid-cols-2 place-items-start gap-8 [&>*]:w-full">
              <div className="grid gap-2">
                <label className="text-small text-lighter">categories</label>
                {categoryData && (
                  <Controller
                    name="categories"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <MultiDropdownInput
                          options={categoryData}
                          onSelect={(selectedOptions) => {
                            console.log(
                              selectedOptions.map((option) => option.id)
                            );
                            onChange(
                              selectedOptions.map((option) => option.id)
                            );
                          }}
                          defaultValue={value}
                        />
                      );
                    }}
                  />
                )}
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
          {/* ========= FORM BUTTON ====== */}
          <div className="justify-self-end self-end grid grid-cols-2  gap-4">
            <Button
              className="px-6 py-2 bg-transparent text-main border-[1.5px] border-main rounded-md hover:bg-light hover:text-body"
              to="/dashboard/product"
            >
              Discard
            </Button>
            <Button
              disabled={mutation.isLoading}
              className="px-6 py-2 bg-main text-body rounded-md hover:bg-light flex items-center justify-center"
            >
              {mutation.isLoading ? <Spinner /> : "Save"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
