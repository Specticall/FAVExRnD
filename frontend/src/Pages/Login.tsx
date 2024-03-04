import { HTMLInputTypeAttribute, useState } from "react";
import Icons from "../Components/Icons";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowpassword = () => setShowPassword((cur) => !cur);
  return (
    <main className="relative py-6">
      <section className="max-w-[70rem] mx-auto grid place-items-center min-h-screen">
        <div className="text-center w-full max-w-[30rem]">
          <div className="flex items-center justify-center scale-75">
            <Icons icon="logo" />
          </div>
          <h1 className="text-hero text-main font-light tracking-tight">
            Login
          </h1>
          <form className="mt-12 w-full grid gap-12">
            <TextInput placeholder="alexia@gmail.com" label="Email" />
            <div className="relative">
              <TextInput
                placeholder="Your Password"
                label="Password"
                type={showPassword ? "text" : "password"}
              />
              <i
                className="absolute right-0 top-[50%] bx bx-show text-title text-main cursor-pointer"
                style={showPassword ? { color: "gray" } : undefined}
                onClick={handleShowpassword}
              ></i>
            </div>
            <button className="bg-main w-full max-w-[12rem] mx-auto py-3 text-body rounded-md hover:bg-light">
              Login
            </button>
            <p className="text-main font-body">
              Already have an account?{" "}
              <span className="underline font-bold cursor-pointer hover:text-light">
                Register here
              </span>
            </p>
          </form>
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

function TextInput({
  placeholder,
  label,
  type = "text",
}: {
  placeholder: string;
  label: string;
  type?: HTMLInputTypeAttribute;
}) {
  return (
    <div className="flex flex-col items-start">
      <label className="font-body">{label}</label>
      <input
        type={type}
        className="py-3 w-full bg-transparent border-b-[2px] text-main border-main outline-none focus:border-light font-body placeholder:tracking-wide placeholder:text-light/50"
        placeholder={placeholder}
      />
    </div>
  );
}
