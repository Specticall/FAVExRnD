import { useState } from "react";
import Icons from "../Components/Icons";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Components/Button";
import { TextInput } from "../Components/TextInput";

type TRegisterFields = {
  name: string;
  email: string;
  address: string;
  phone: string;
  birthDate: Date;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegisterFields>();

  const onSubmit: SubmitHandler<TRegisterFields> = (value) => {
    console.log(value);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowpassword = () => setShowPassword((cur) => !cur);
  return (
    <main className="relative">
      <section className="max-w-[70rem] mx-auto grid place-items-center min-h-screen py-6">
        <Button
          className="absolute top-[2rem] left-[4rem] font-body flex items-center justify-center gap-2 hover:text-light"
          to="/home"
        >
          <i className="bx bx-left-arrow-alt text-heading"></i>
          <p>Back</p>
        </Button>
        <div className="text-center w-full max-w-[30rem]">
          <div className="flex items-center justify-center scale-75">
            <Icons icon="logo" />
          </div>
          <h1 className="text-hero text-main font-light tracking-tight">
            Register
          </h1>
          {/* ===== FORM ===== */}
          <form
            className="mt-12 w-full grid gap-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              placeholder="Alexia"
              formLabel="Name"
              {...register("name", {
                required: "Can't be empty",
              })}
              errorMessage={errors.name?.message}
            />
            <TextInput
              placeholder="alexia@gmail.com"
              formLabel="Email"
              {...register("email", {
                required: "Can't be empty",
              })}
              errorMessage={errors.email?.message}
            />
            <TextInput
              formLabel="Address"
              placeholder="Address Street No.123"
              {...register("address", {
                required: "Can't be empty",
              })}
              errorMessage={errors.address?.message}
            />
            <TextInput
              placeholder="088888888888"
              formLabel="Phone Number"
              {...register("phone", {
                required: "Can't be empty",
              })}
              errorMessage={errors.phone?.message}
            />

            <TextInput
              placeholder="Your Password"
              formLabel="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Can't be empty",
              })}
              errorMessage={errors.password?.message}
              icon={
                <i
                  className="absolute right-0 top-[50%] bx bx-show text-title text-main cursor-pointer translate-y-[-50%]"
                  style={showPassword ? { color: "gray" } : undefined}
                  onClick={handleShowpassword}
                ></i>
              }
            />

            <button className="bg-main w-full max-w-[12rem] mx-auto py-3 text-body rounded-md hover:bg-light">
              Register
            </button>
            <p className="text-main font-body">
              Already have an account?{" "}
              <Button
                className="underline font-bold cursor-pointer hover:text-light"
                to="/register"
              >
                Login here
              </Button>
            </p>
          </form>
          {/* ===== FORM ===== */}
        </div>
      </section>
      <div className="absolute inset-0 min-h-screen flex justify-between items-start [&>*]:mih-h-0 overflow-hidden z-[-1]">
        <div className="[&>*]:w-[20rem] translate-y-[-4rem] origin-top-left">
          <Icons icon="curveLogin" />
        </div>
        <div className="[&>*]:w-[20rem] translate-y-[4rem] self-end w-fit [&>*]:h-fit">
          <Icons icon="heroRight" />
        </div>
      </div>
    </main>
  );
}
