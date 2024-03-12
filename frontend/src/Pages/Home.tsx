import { Hero, HeroBG } from "./Hero";
import { Footer } from "../Components/Footer";
import { Products } from "../Components/Products";
import { HomeProvider } from "../Context/HomeContext";

export default function Home() {
  return (
    <HomeProvider>
      <Hero />
      <HeroBG />
      <Products />
      <Footer />
    </HomeProvider>
  );
}
