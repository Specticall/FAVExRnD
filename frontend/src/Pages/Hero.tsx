import Icons from "../Components/Icons";

export function HeroBG() {
  return (
    <div className="absolute flex justify-between w-full top-[6rem] z-[-1]">
      <div className="scale-75 origin-left">
        <Icons icon="heroLeft" />
      </div>
      <div className="scale-75 origin-right">
        <Icons icon="heroRight" />
      </div>
    </div>
  );
}
export function Hero() {
  return (
    <section id="#hero" className="pt-40 mx-auto max-w-[70rem] text-center">
      <h1 className="text-hero text-main leading-[120%] max-w-[45rem] mx-auto font-light tracking-tight mb-8">
        Quality meets style with feline
        <span className="font-normal tracking-normal"> finesse</span>
      </h1>
      <p className="max-w-[30rem] leading-[175%] mx-auto text-light">
        Our Garments, Woven with Whiskered Precision and Hat-tastic Flair,
        Promise a Purrmanence of Quality and Durability.
      </p>
    </section>
  );
}
