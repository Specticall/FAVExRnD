import { useRef } from "react";
import { Navbar } from "../Components/Navbar";
import { Hero, HeroBG } from "./Hero";
import { Products } from "../Components/Products";
import { Footer } from "../Components/Footer";
import { AuthProvider } from "../Context/AuthContext";
import { API_URL, TUserData } from "../Services/API";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  // Return if no token exist.
  if (!localStorage.getItem("token")) return null;

  // Fetch user data on load.
  const userData = await axios.get(`${API_URL}/api/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });
  return userData.data;
};

export default function Home() {
  const userData = useLoaderData() as TUserData | undefined;
  console.log(userData);
  const gapRef = useRef<HTMLDivElement | null>(null);

  return (
    <AuthProvider>
      <div className="h-4" ref={gapRef}></div>
      <main className="">
        <Navbar gapRef={gapRef} />
        <Hero username={userData?.name} />
        <HeroBG />
        <Products />
        <Footer />
      </main>
    </AuthProvider>
  );
}
