import { MutableRefObject, useEffect, useState } from "react";
import Icons from "./Icons";
import Button from "./Button";
import { useHome } from "../Context/HomeContext";
import Spinner from "./Spinner";
import { CartPopup } from "./CartPopup";
import { useAuth } from "../Context/AuthContext";

const navbarItem = [
  { name: "Men" },
  { name: "Women" },
  { name: "About" },
  { name: "Contact" },
];

type Props = {
  // Used so that the intersection observer can observer the hero element (used for scroll reveal);
  gapRef: MutableRefObject<HTMLElement | null>;
  // role?: "Admin" | "Basic";
};

export function Navbar({ gapRef }: Props) {
  const { userData } = useHome();
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
      <ul className="font-body grid grid-cols-3 items-center text-small max-w-[70rem] mx-auto py-1 px-8 relative">
        <div className="flex gap-8">
          {navbarItem.map((item) => (
            <li className="hover:text-main/60 cursor-pointer">{item.name}</li>
          ))}
        </div>
        <div className="scale-[60%] justify-self-center">
          <Icons icon="logo" />
        </div>
        <div className="flex gap-8 [&>li:hover]:text-main/60 [&>li]:cursor-pointer justify-self-end items-center">
          {userData?.name ? (
            <li>
              <Button
                onClick={() => {
                  setIsLoading((cur) => {
                    return { ...cur, logout: true };
                  });
                  handleLogout();
                }}
              >
                {isLoading?.logout ? <Spinner /> : "Logout"}
              </Button>
            </li>
          ) : (
            <li>
              <Button to="/login">Login</Button>
            </li>
          )}
          <li>Wishlist</li>

          <CartPopup />

          {userData?.name && userData?.role === "Admin" && (
            <li className="bg-main px-4 py-2 text-body rounded-md hover:bg-light [&:hover>button]:text-body">
              <Button
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
