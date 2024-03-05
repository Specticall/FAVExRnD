import { useRef } from "react";
import { Navbar } from "../Components/Navbar";
import { Hero, HeroBG } from "./Hero";
import { Products } from "../Components/Products";
import { Footer } from "../Components/Footer";

export default function Home() {
  const gapRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className="h-4" ref={gapRef}></div>
      <main className="">
        <Navbar gapRef={gapRef} />
        <Hero />
        <HeroBG />
        <Products />
        <Footer />
      </main>
    </>
  );
}
