import { useState } from "react";
import Icons from "../Components/Icons";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../Components/Button";
import { TextInput } from "../Components/TextInput";
import { useMutation } from "react-query";
import axios, { AxiosError } from "axios";
import { APIError } from "../Services/API";
import { API_URL } from "../Services/config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

type TRegisterFields = {
  name: string;
  email: string;
  address: string;
  phone: string;
  birthdate: string;
  password: string;
};

class ParsedError {
  field: keyof TRegisterFields;
  message: string;
  constructor(field: keyof TRegisterFields, message: string) {
    this.field = field;
    this.message = message;
  }
}

const registerUser = (value: TRegisterFields) => {
  return axios.post(`${API_URL}/api/register`, value);
};

function parseError(errorMessage: string): InstanceType<typeof ParsedError> {
  switch (errorMessage) {
    case "The password field must be at least 8 characters.":
      return new ParsedError("password", "Must be greater than 8 characters");

    case "The email field must be a valid email address.":
      return new ParsedError("email", "Invalid Email");

    case "The phone field must not be greater than 13 characters.":
      return new ParsedError("phone", "Must not be greater than 13 characters");

    case "The birthdate field must match the format Y-m-d.":
      return new ParsedError(
        "birthdate",
        "Birth date must use the format YYYY-MM-DD"
      );

    case "The phone field must be at least 9 characters.":
      return new ParsedError("phone", "Must be 9 characteres");

    case "The email has already been taken.":
      return new ParsedError("email", "Email already taken");

    default:
      console.log(`Unknown API Error : ${errorMessage}, FIX ASAP`);
      return new ParsedError("email", "");
  }
}

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TRegisterFields>();
  const { handleLogin } = useAuth();

  const mutation = useMutation(registerUser, {
    onError: (error: AxiosError) => {
      const errorData = (error.response?.data as APIError).data.msg;

      if (!Array.isArray(errorData)) {
        console.log("Error is not an array????");
        return;
      }

      errorData.forEach((errorMessage) => {
        const { field, message } = parseError(errorMessage);
        setError(field, {
          type: "server",
          message,
        });
      });
    },
    onSuccess: handleLogin,
  });

  const onSubmit: SubmitHandler<TRegisterFields> = (value) => {
    mutation.mutate(value);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowpassword = () => setShowPassword((cur) => !cur);
  return (
    <main className="relative min-h-screen">
      <section className="max-w-[70rem] mx-auto grid place-items-center h-full py-6">
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
              formLabel="Birth Date"
              placeholder="YYYY-MM-DD"
              {...register("birthdate", {
                required: "Can't be empty",
              })}
              errorMessage={errors.birthdate?.message}
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

            <Button
              className="bg-main w-full max-w-[12rem] mx-auto py-3 text-body rounded-md hover:bg-light"
              disabled={mutation.isLoading}
            >
              Register
            </Button>
            <p className="text-main font-body">
              Already have an account?{" "}
              <Button
                className="underline font-bold cursor-pointer hover:text-light"
                to="/login"
                disabled={mutation.isLoading}
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
