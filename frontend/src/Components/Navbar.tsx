import { MutableRefObject, useEffect, useRef, useState } from "react";
import Icons from "./Icons";

const navbarItem = [
  { name: "Men" },
  { name: "Women" },
  { name: "About" },
  { name: "Contact" },
];

type Props = {
  // Used so that the intersection observer can observer the hero element (used for scroll reveal);
  heroRef: MutableRefObject<HTMLElement | null>;
};

export function Navbar({ heroRef }: Props) {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowBackground(!entry.isIntersecting);
        });
      },
      {
        threshold: 0.9,
      }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      observer.disconnect();
    };
  }, [heroRef]);

  return (
    <nav
      className="sticky top-0 width-full duration-150"
      style={{ background: showBackground ? "white" : "transparent" }}
    >
      <ul className="font-body grid grid-cols-3 items-center text-small max-w-[70rem] mx-auto py-1 px-8">
        <div className="flex gap-8">
          {navbarItem.map((item) => (
            <li className="hover:text-main/60 cursor-pointer">{item.name}</li>
          ))}
        </div>
        <div className="scale-[60%] justify-self-center">
          <Icons icon="logo" />
        </div>
        <div className="flex gap-8 [&>li:hover]:text-main/60 [&>*]:cursor-pointer justify-self-end">
          <li>Login</li>
          <li>Wishlist</li>
          <li>Cart</li>
        </div>
      </ul>
    </nav>
  );
}
