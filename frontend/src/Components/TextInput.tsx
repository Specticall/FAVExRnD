import { HTMLInputTypeAttribute, ReactElement, forwardRef } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { register } from "swiper/element";

type TTextInput<T extends FieldValues = FieldValues> = {
  placeholder: string;
  formLabel: string;
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
  icon?: ReactElement;
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
    },
    ref
  ) => {
    return (
      <div className="flex flex-col items-start">
        <label className="font-body">{formLabel}</label>
        <div className="w-full relative">
          <input
            type={type}
            className="py-3 w-full bg-transparent border-b-[2px] text-main border-main outline-none focus:border-light font-body placeholder:tracking-wide placeholder:text-light/50"
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
