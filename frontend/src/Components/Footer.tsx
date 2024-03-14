import Icons from "./Icons";

export function Footer() {
  return (
    <>
      <footer className=" bg-main mt-16">
        <div className="grid grid-cols-4 max-w-[70rem] mx-auto pt-12 pb-20 gap-x-8">
          <div className="scale-[70%] mb-4 origin-left col-span-4">
            <Icons icon="logo" color="#F9F1E9" />
          </div>
          <div>
            <h2 className="text-large text-body tracking-tight font-regular max-w-[15rem] leading-[140%]">
              The clothing brand for cats with hats.
            </h2>
          </div>
          <div className="text-body">
            <h3 className="text-large mb-6">North America</h3>
            <p className="mb-2 font-bold font-body underline cursor-pointer">
              catclothingemail@gmail.com
            </p>
            <p className="mb-2">+1 (555) 123-4567</p>
            <div className="mb-12">
              <p>123 Main Street</p>
              <p>Cityville, CA 90210</p>
              <p>United States</p>
            </div>
            <p className="underline font-bold font-body cursor-pointer">
              See on Map
            </p>
          </div>
          <div className="text-body">
            <h3 className="text-large mb-6">South America</h3>
            <p className="mb-2 font-bold font-body underline cursor-pointer">
              catclothingemail@gmail.com
            </p>
            <p className="mb-2">+1 (555) 123-4567</p>
            <div className="mb-12">
              <p>123 Main Street</p>
              <p>Cityville, CA 90210</p>
              <p>United States</p>
            </div>
            <p className="underline font-bold font-body cursor-pointer">
              See on Map
            </p>
          </div>
          <div className="text-body">
            <h3 className="text-large mb-6">Our Socials</h3>
            <div className="grid grid-cols-3 gap-8">
              <i className="text-title text-main bg-body rounded-full cursor-pointer w-[2.5rem] aspect-square [&&]:grid place-items-center bx bxl-instagram"></i>
              <i className="text-title text-main bg-body rounded-full cursor-pointer w-[2.5rem] aspect-square [&&]:grid place-items-center bx bxl-facebook-circle"></i>
              <i className="text-title text-main bg-body rounded-full cursor-pointer w-[2.5rem] aspect-square [&&]:grid place-items-center bx bxl-twitter"></i>
              <i className="text-title text-main bg-body rounded-full cursor-pointer w-[2.5rem] aspect-square [&&]:grid place-items-center bx bx-envelope"></i>
              <i className="text-title text-main bg-body rounded-full cursor-pointer w-[2.5rem] aspect-square [&&]:grid place-items-center bx bxs-phone"></i>
            </div>
          </div>
        </div>
        <div className="bg-accent text-main text-center py-2 text-sm font-body">
          Crafted with perfection, absolutely zero flaws, and an absurd level of
          finesse that breaks the space-time continuum by{" "}
          <span className="font-bold underline">Kelompok 5</span>
        </div>
      </footer>
    </>
  );
}
