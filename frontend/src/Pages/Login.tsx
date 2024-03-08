import { useState } from "react";
import Icons from "../Components/Icons";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Components/Button";
import { TextInput } from "../Components/TextInput";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { APIError, API_URL } from "../Services/API";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

type TLoginFields = {
  email: string;
  password: string;
};

type TAPILoginResponse = {
  status: number;
  data: {
    token: string;
    role: "Basic" | "Admin";
    name: string;
  };
};

const loginUser = (data: TLoginFields) => {
  return axios.post(`${API_URL}/api/login`, data);
};

export default function Login() {
  const navigate = useNavigate();
  const { setRole } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TLoginFields>();

  const mutation = useMutation(loginUser, {
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as APIError;
      if (errorData.data) {
        setError("password", {
          type: "server",
          message: "Invalid email or password",
        });
        setError("email", {
          type: "server",
          message: "Invalid email or password",
        });
      }
    },
    onSuccess: (data) => {
      const loginData = data.data as TAPILoginResponse;
      const token = loginData.data.token;
      const role = loginData.data.role;

      localStorage.setItem("token", token);

      setRole(role);

      navigate("/home");
    },
  });

  const onSubmit: SubmitHandler<TLoginFields> = (value) => {
    mutation.mutate(value);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowpassword = () => setShowPassword((cur) => !cur);
  return (
    <main className="relative min-h-screen">
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
            Login
          </h1>
          {/* ===== FORM ===== */}
          <form
            className="mt-12 w-full grid gap-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              placeholder="alexia@gmail.com"
              formLabel="Email"
              {...register("email", {
                required: "Can't be empty",
              })}
              errorMessage={errors.email?.message}
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

            <Button
              className="bg-main w-full max-w-[12rem] mx-auto py-3 text-body rounded-md hover:bg-light"
              disabled={mutation.isLoading}
            >
              Login
            </Button>
            <p className="text-main font-body">
              Don't have an account?{" "}
              <Button
                className="underline font-bold cursor-pointer hover:text-light"
                to="/register"
              >
                Register here
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
