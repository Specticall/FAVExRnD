import { MutableRefObject, useEffect, useState } from "react";
import Icons from "./Icons";
import Button from "./Button";
import { useApp } from "../Context/AppContext";
import Spinner from "./Spinner";
import { CartPopup } from "./CartPopup";
import { useAuth } from "../Context/AuthContext";

type Props = {
  // Used so that the intersection observer can observer the hero element (used for scroll reveal);
  gapRef: MutableRefObject<HTMLElement | null>;
};

export function Navbar({ gapRef }: Props) {
  const { userData } = useApp();
  const { handleLogout } = useAuth();
  const [isLoading, setIsLoading] = useState<{
    logout: boolean;
    dashboard: boolean;
  }>({ logout: false, dashboard: false });
  const [showBackground, setShowBackground] = useState(false);

  // Reveals navbar background when the viewport "leaves" the top div element
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowBackground(!entry.isIntersecting);
        });
      },
      {
        threshold: 0.99,
      }
    );

    if (gapRef.current) observer.observe(gapRef.current);

    return () => {
      observer.disconnect();
    };
  }, [gapRef]);

  return (
    <nav
      className="sticky top-0 width-full duration-150 z-50"
      style={{ background: showBackground ? "white" : "transparent" }}
    >
      <ul className="font-body grid grid-cols-2 items-center text-small max-w-[70rem] mx-auto py-1 px-8 relative">
        <div className="flex gap-8 items-center justify-start">
          <div className="scale-[60%]">
            <Icons icon="logo" />
          </div>
          {userData?.name && (
            <>
              <CartPopup />
            </>
          )}
        </div>

        <div className="flex gap-4 [&>li:hover]:text-main/60 [&>li]:cursor-pointer justify-self-end items-center">
          {userData?.name ? (
            <li>
              <Button
                onClick={() => {
                  setIsLoading((cur) => {
                    return { ...cur, logout: true };
                  });
                  handleLogout();
                }}
                className="px-6 py-2 border-[1px] rounded-md border-main hover:bg-light hover:text-body"
              >
                {isLoading?.logout ? <Spinner /> : "Logout"}
              </Button>
            </li>
          ) : (
            <li>
              <Button
                to="/login"
                className="px-6 py-2 border-[1px] rounded-md border-main hover:bg-light hover:text-body"
              >
                Login
              </Button>
            </li>
          )}
          {userData?.name && userData?.role === "Admin" && (
            <li>
              <Button
                className="bg-main px-4 py-2 text-body rounded-md hover:bg-light hover:text-body"
                to="/dashboard"
                onClick={() => {
                  setIsLoading((cur) => {
                    return { ...cur, dashboard: true };
                  });
                }}
              >
                Dashboard
              </Button>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}

export const cartDataTemp = [
  {
    user_id: 1,
    product_id: 16,
    quantity: "10",
  },
  {
    user_id: 1,
    product_id: 27,
    quantity: "5",
  },
  {
    user_id: 1,
    product_id: 24,
    quantity: "1",
  },
];
