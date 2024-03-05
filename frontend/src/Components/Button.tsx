import { MouseEventHandler, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

type Props = { to?: string; onClick?: () => void; className?: string };

export default function Button({
  children,
  to,
  className,
  onClick = () => {},
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
    <button className={`${className}`} onClick={handleClick}>
      {children}
    </button>
  );
}
