import Button from "../Components/Button";
import Icons from "../Components/Icons";
import { useApp } from "../Context/AppContext";

export function HeroBG() {
  return (
    <div className="absolute inset-0 min-h-screen flex justify-between items-start [&>*]:mih-h-0 z-[-1]">
      <div className="[&>*]:w-[25rem]">
        <Icons icon="heroLeft" />
      </div>
      <div className="[&>*]:w-[25rem]">
        <Icons icon="heroRight" />
      </div>
    </div>
  );
}

export function Hero() {
  const { userData } = useApp();

  const username = userData?.name;

  return (
    <section id="#hero" className="pt-40 mx-auto max-w-[70rem] text-center">
      {userData?.name ? (
        <p className="text-title text-light mb-6">
          Welcome Back, <span className="font-bold text-main">{username}</span>
        </p>
      ) : null}
      <h1 className="text-hero text-main leading-[120%] max-w-[45rem] mx-auto font-light tracking-tight mb-8">
        Quality meets style with feline
        <span className="font-normal tracking-normal"> finesse</span>
      </h1>
      <p className="max-w-[30rem] leading-[175%] mx-auto text-light">
        Our Garments, Woven with Whiskered Precision and Hat-tastic Flair,
        Promise a Purrmanence of Quality and Durability.
      </p>
      {userData?.name ? null : (
        <Button
          to="/register"
          className="bg-main px-16 py-3 rounded-md text-body font-body text-heading mt-12 hover:bg-light"
        >
          Create an Account
        </Button>
      )}
    </section>
  );
}
