import { useRef } from "react";
import { Navbar } from "../Components/Navbar";
import { Hero, HeroBG } from "./Hero";
import { Products } from "../Components/Products";
import { Footer } from "../Components/Footer";
import { getAllData } from "../Services/API";
import { HomeProvider } from "../Context/HomeContext";

export const loader = async () => {
  try {
    // Return if no token exist.
    // if (!localStorage.getItem("token")) return null;

    const data = await getAllData();

    return data;
  } catch (err) {
    return null;
  }
};

export default function Home() {
  const gapRef = useRef<HTMLDivElement | null>(null);
  return (
    <HomeProvider>
      <div className="h-4" ref={gapRef}></div>
      <main>
        <Navbar gapRef={gapRef} />
        <Hero />
        <HeroBG />
        <Products />
        <Footer />
      </main>
    </HomeProvider>
  );
}
