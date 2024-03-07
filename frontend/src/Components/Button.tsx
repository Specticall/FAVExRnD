import { MouseEventHandler, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  to?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  to,
  className,
  onClick = () => {},
  disabled,
}: PropsWithChildren<Props>) {
  const navigate = useNavigate();

  const handleClick: MouseEventHandler = (e) => {
    if (to) {
      e.preventDefault();
      navigate(to);
    }
    onClick();
  };
  return (
    <button
      className={`${className}`}
      onClick={handleClick}
      style={disabled ? { opacity: "75%" } : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
