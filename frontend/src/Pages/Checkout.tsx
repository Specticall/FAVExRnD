import {
  Controller,
  FormProvider,
  SubmitHandler,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import Button from "../Components/Button";
import Icons from "../Components/Icons";
import MultiDropdownInput from "../Components/MultiDropdownInput";
import { TextInput } from "../Components/TextInput";
import { useCart } from "../Context/CartContext";
import { IMAGE_PATH, convertToRupiah } from "../utils/helper";
import { useState } from "react";
import { useModal } from "../Context/ModalContext";
import { useNavigate } from "react-router-dom";

const shippingMethod = [
  { id: 1, label: "Grab Express" },
  { id: 2, label: "Gojek" },
  { id: 3, label: "JNE" },
];

const TAX_RATE = 0.1;

type TCheckoutFields = {
  address: string;
  zipCode: string;
  city: string;
  shippingMethod: { id: number; label: string };
  notes?: string;
  paymentDetails: "eMoney" | "COD";
};

export default function Checkout() {
  const { showModal } = useModal();
  // const navigate = useNavigate();
  const methods = useForm<TCheckoutFields>();
  const onSubmit: SubmitHandler<TCheckoutFields> = (value) => {
    console.log(value);
    showModal("transactionSuccess");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="max-w-[70rem] mx-auto px-8 font-body text-mai pb-12"
      >
        <Button
          to="/app/home"
          className="flex items-center justify-center text-light gap-2 mt-12 hover:text-main cursor-pointer mb-6"
        >
          <i className="bx bxs-chevron-left text-medium"></i>
          <p>Back</p>
        </Button>
        <div className="grid grid-cols-[1fr_25rem] gap-8">
          <CheckoutForm />
          <Summary />
        </div>
      </form>
    </FormProvider>
  );
}

function Summary() {
  const { productsInCart } = useCart();
  const totalPrice = productsInCart?.reduce((total, { quantity, product }) => {
    const productPrice =
      product.price * (1 - (product.discount || 0)) * quantity;
    return (total += productPrice);
  }, 0);
  const taxPrice = totalPrice ? totalPrice * TAX_RATE : 0;
  const priceWithTax = totalPrice ? totalPrice * (1 + TAX_RATE) : 0;
  return (
    <article className="bg-[rgb(255,252,250)] rounded-xl px-8 py-12 shadow-lg shadow-main/10 h-fit">
      <h2 className="text-main text-title font-semibold">Summary</h2>
      {productsInCart && productsInCart.length > 0 ? (
        <ul className="grid gap-8 mt-8">
          {productsInCart?.map((cartItem) => {
            const product = cartItem.product;
            return (
              <li className="grid grid-cols-[3.5rem_1fr] h-12 gap-4 content-center items-center">
                <div className="h-full aspect-square">
                  <img
                    src={`${IMAGE_PATH}/${product.img}`}
                    alt="product image"
                    className="object-cover h-full w-full rounded-md"
                  />
                </div>
                <div className="flex items-center">
                  <div className="w-full gap-2 mr-2">
                    <p className="truncate text-main text-heading font-semibold white max-w-[80%]">
                      {product.name}
                    </p>
                    <p className="text-light text-heading w-fit">
                      {convertToRupiah(
                        product.price *
                          (1 - (product.discount || 0)) *
                          cartItem.quantity
                      )}
                    </p>
                  </div>
                  <p className="text-light">{cartItem.quantity}x</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="min-w-[20rem] text-heading text-light text-center py-12">
          Cart is empty
        </div>
      )}
      <div className="mt-10 pt-8 border-t-[1px] border-light/50 grid gap-2">
        <div className="flex justify-between items-center text-light ">
          <p className="text-light">Total</p>
          <p className="text-main">{convertToRupiah(totalPrice || 0)}</p>
        </div>
        <div className="flex justify-between items-center   text-light">
          <p className="text-light">Tax</p>
          <p className="text-main ">{convertToRupiah(taxPrice || 0)}</p>
        </div>
        <div className="flex justify-between items-center text-main  mt-6">
          <p className="text-light">Grand Total</p>
          <p className="text-main font-semibold text-medium">
            {convertToRupiah(priceWithTax || 0)}
          </p>
        </div>
        <Button className="text-heading px-4 py-4 bg-main text-body rounded-md mt-6 hover:bg-light">
          Checkout
        </Button>
      </div>
    </article>
  );
}

function CheckoutForm() {
  return (
    <article className="bg-[rgb(255,252,250)] rounded-xl px-10 py-12 shadow-lg shadow-main/10">
      <p className="text-large font-body text-main font-semibold mb-6">
        Checkout
      </p>
      <ShipmentInfo />
      <PaymentMethod />
    </article>
  );
}

function ShipmentInfo() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<TCheckoutFields>();

  return (
    <>
      <p className=" text-main font-medium text-medium mb-4">Shipment Info</p>
      <TextInput
        className="[&&]:py-3"
        placeholder="Jln. Kemanggisan No.99"
        style={"boxed"}
        formLabel="Address"
        {...register("address", { required: "Field can't be empty" })}
        errorMessage={errors.address?.message}
      />
      <div className="grid grid-cols-2 gap-6 mt-6">
        <TextInput
          className="[&&]:py-3"
          placeholder="101010"
          style={"boxed"}
          formLabel="Zip Code"
          {...register("zipCode", { required: "Field can't be empty" })}
          errorMessage={errors.zipCode?.message}
        />
        <TextInput
          placeholder="Jakarta"
          style={"boxed"}
          formLabel="City"
          className="[&&]:py-3"
          {...register("city", { required: "Field can't be empty" })}
          errorMessage={errors.city?.message}
        />
        <div>
          <p className="text-light/70 mb-3">Shipping Method</p>
          <Controller
            control={control}
            name="shippingMethod"
            rules={{
              validate: {
                required: (value) => Boolean(value) || "Select Shipping Method",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <MultiDropdownInput
                placeholder="Select Method"
                singleSelect
                options={shippingMethod}
                className="py-3"
                onSelect={onChange}
                defaultValue={[value?.id]}
                errorMessage={errors.shippingMethod?.message}
              />
            )}
          />
        </div>
      </div>
      <div className="mt-6 mb-12">
        <label className="text-light">Delivery Notes (Optional)</label>
        <textarea
          className="resize-none border-[1px] border-main rounded-md p-4 w-full mt-4 placeholder:text-light/50 pb-12"
          placeholder="I'm going to be gone on the 16th and 17th, you can have my neighbour take care..."
          {...register("notes")}
        ></textarea>
      </div>
    </>
  );
}

function PaymentMethod() {
  const { control } = useFormContext<TCheckoutFields>();
  const {
    field: { onChange },
  } = useController({ control, name: "paymentDetails" });

  const [selected, setSelected] =
    useState<TCheckoutFields["paymentDetails"]>("COD");

  return (
    <>
      <p className=" text-main font-medium text-medium mb-4">Payment Details</p>
      <div className="grid grid-cols-2">
        <p className="text-light/70">Payment Method</p>
        <div className="text-main w-full grid gap-4">
          <div
            className="flex gap-4 items-center border-[1px] border-main rounded-md px-4 py-3 cursor-pointer hover:border-light/50"
            onClick={() => {
              setSelected("eMoney");
              onChange("eMoney");
            }}
          >
            <div className="h-[90%] aspect-square bg-transparent border-[1px] border-light/50 rounded-full p-[3px]">
              <div
                className="h-full aspect-square rounded-full"
                style={
                  selected === "eMoney"
                    ? { backgroundColor: "#392A2A" }
                    : undefined
                }
              ></div>
            </div>
            e-Money
          </div>
          <div
            className="flex gap-4 items-center border-[1px] border-main rounded-md px-4 py-3 cursor-pointer hover:border-light/50"
            onClick={() => {
              setSelected("COD");
              onChange("eMoney");
            }}
          >
            <div className="h-[90%] aspect-square bg-transparent border-[1px] border-light/50 rounded-full p-[3px]">
              <div
                className="h-full aspect-square rounded-full"
                style={
                  selected === "COD"
                    ? { backgroundColor: "#392A2A" }
                    : undefined
                }
              ></div>
            </div>
            Cash on Delivery (COD)
          </div>
        </div>
      </div>
      <div className="mt-10 flex gap-8 items-center justify-center">
        <div>
          <Icons icon="COD" />
        </div>
        <p className=" text-main/50 leading-[150%]">
          The ‘Cash on Delivery’ option enables you to pay in cash when our
          delivery courier arrives at your residence. Just make sure your
          address is correct so that your order will not be cancelled.
        </p>
      </div>
    </>
  );
}
