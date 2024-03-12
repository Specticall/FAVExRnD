import { Outlet } from "react-router-dom";
import { CartProvider } from "../Context/CartContext";
import { AppProvider } from "../Context/AppContext";
import { getAllData } from "../Services/API";
import { useRef } from "react";
import { Navbar } from "../Components/Navbar";

export const loader = async () => {
  try {
    const data = await getAllData();
    return data;
  } catch (err) {
    return null;
  }
};

export default function AppLayout() {
  const gapRef = useRef<HTMLDivElement | null>(null);
  return (
    <AppProvider>
      <CartProvider>
        <div className="h-4" ref={gapRef}></div>
        <main>
          <Navbar gapRef={gapRef} />
          <Outlet />
        </main>
      </CartProvider>
    </AppProvider>
  );
}
