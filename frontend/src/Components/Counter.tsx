import { MouseEventHandler, useState } from "react";
import { isNumber } from "../utils/helper";

export default function Counter({
  onChange = () => {},
  onIncrement = () => {},
  onDecrement = () => {},
  allowDirectEdit = true,
  defaultValue = 0,
  className = {
    button: "",
    counter: "",
    container: "",
  },
}: {
  onChange?: (value: number) => void;
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
  defaultValue?: number;
  className?: {
    button?: string;
    counter?: string;
    container?: string;
  };
  allowDirectEdit?: boolean;
}) {
  const [counter, setCounter] = useState(defaultValue);
  const handleIncrement: MouseEventHandler = (e) => {
    e.preventDefault();
    setCounter((cur) => cur + 1);
    onChange(counter + 1);
    onIncrement(counter + 1);
  };

  const handleDecrement: MouseEventHandler = (e) => {
    e.preventDefault();
    setCounter((cur) => Math.max(cur - 1, 0));
    onChange(counter - 1);
    onDecrement(counter - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNumber(value) && value !== "") return;

    const newValue = value === "" ? 0 : Number(value);
    setCounter(newValue);
    onChange(newValue);
  };
  return (
    <div
      className={`flex items-center justify-center w-full gap-2 ${className.container}`}
    >
      <button
        onClick={handleDecrement}
        className={`bg-main py-3 px-3 rounded-md text-heading text-body leading-[100%]  hover:bg-light ${className.button}`}
      >
        <i className="bx bx-minus"></i>
      </button>
      <input
        value={String(counter)}
        type="text"
        onChange={handleChange}
        className={`flex-1 bg-transparent text-main border-[1.5px] border-main rounded-md min-w-0 py-2 text-center w-full ${className.counter}`}
        disabled={!allowDirectEdit}
      />
      <button
        onClick={handleIncrement}
        className={`bg-main py-3 px-3 rounded-md text-heading text-body leading-[100%] hover:bg-light ${className.button}`}
      >
        <i className="bx bx-plus"></i>
      </button>
    </div>
  );
}
