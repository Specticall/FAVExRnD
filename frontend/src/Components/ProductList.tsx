import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { productList } from "../Services/API";
import { convertToRupiah } from "../utils/helper";

export default function ProductList() {
  const productExist = productList.length > 0;

  return (
    <div className="px-8 mt-12">
      <h2 className="text-large font-semibold mb-8">On Sale</h2>
      {productExist ? (
        <Swiper slidesPerView={4} spaceBetween={32}>
          {productList.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <ProductItem {...product} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div>There's no product to be shown here</div>
      )}
    </div>
  );
}

function ProductItem({
  name,
  price,
  img,
  discount,
}: {
  name: string;
  price: number;
  img: string;
  discount?: number;
}) {
  const discountedPrice = discount && price * (1 - discount);

  return (
    <article className="grid group overflow-visible cursor-pointer">
      <div className="relative border-[.25rem] border-white rounded-lg shadow-lg overflow-hidden bg-white">
        {/* <div className="grid place-items-center absolute inset-0 z-10 bg-black opacity-0 group-hover:opacity-10 transition-all duration-100"></div> */}
        <img
          src={img}
          alt={`${name} image`}
          className="transition-all duration-100 h-[16rem] object-cover w-full object-top "
        />
      </div>
      <div className="py-2 mt-4 mb-2">
        <h3 className="mt-2 text-heading font-body text-main mb-1">{name}</h3>
        <p
          className={`text-title text-main font-semibold`}
          style={discount ? { color: "#CC2A06" } : undefined}
        >
          {convertToRupiah(discountedPrice || price)}
        </p>
        {discount && (
          <p className="text-main line-through font-bold">
            {convertToRupiah(price)}
          </p>
        )}
      </div>
    </article>
  );
}
