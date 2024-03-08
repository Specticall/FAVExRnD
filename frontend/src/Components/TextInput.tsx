import { HTMLInputTypeAttribute, ReactElement, forwardRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { register } from "swiper/element";

const styleList = {
  underline: {
    input: "border-b-[2px]",
    label: "",
  },
  boxed: {
    input: "border-[1.5px] rounded-md px-5 [&&]:py-2 mt-2",
    label: "text-lighter text-small",
  },
};

type TTextInput<T extends FieldValues = FieldValues> = {
  placeholder: string;
  formLabel?: string;
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
  icon?: ReactElement;
  className?: string;
  style?: keyof typeof styleList;
} & Partial<ReturnType<UseFormRegister<T>>>;
export const TextInput = forwardRef<HTMLInputElement, TTextInput>(
  (
    {
      placeholder,
      formLabel,
      type = "text",
      icon,
      errorMessage,
      // RHF REGISTERER DATA
      onChange,
      onBlur,
      name,
      className,
      style = "underline",
    },
    ref
  ) => {
    return (
      <div className="flex flex-col items-start">
        <label className={`font-body ${styleList[style].label}`}>
          {formLabel}
        </label>
        <div className="w-full relative">
          <input
            type={type}
            className={`${styleList[style].input} ${className} py-3 w-full bg-transparent text-main border-main outline-none focus:border-light font-body placeholder:tracking-wide placeholder:text-light/50`}
            style={errorMessage ? { borderColor: "#CC2A06" } : undefined}
            placeholder={placeholder}
            {...register}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
            ref={ref}
          />
          {icon}
        </div>
        {errorMessage && (
          <p className="text-danger text-small font-body mt-3">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);
