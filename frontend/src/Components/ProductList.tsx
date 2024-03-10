import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IMAGE_PATH, convertToRupiah } from "../utils/helper";
import { useHome } from "../Context/HomeContext";
import { TProduct } from "../Services/API";
import Button from "./Button";
import Spinner from "./Spinner";
import { useCart } from "../Context/CartContext";
import useCartMutation from "../Hooks/useCartMutation";

export default function ProductList() {
  const { productData } = useHome();

  return (
    <div className="px-8 mt-12">
      <h2 className="text-large font-semibold mb-8">On Sale</h2>
      {productData && productData.length > 0 ? (
        <Swiper slidesPerView={4} spaceBetween={32}>
          {productData?.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <ProductItem product={product} />
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

function ProductItem({ product }: { product: TProduct }) {
  const { isInCart } = useCart();
  const { addToCart, removeFromCart, isDeleting, isCreating } = useCartMutation(
    { product }
  );

  const { discount, price, name, img, stock } = product;

  const discountedPrice = discount && price * (1 - discount);

  return (
    <article className="grid group overflow-visible cursor-pointer font-body">
      <div className="relative border-[.25rem] border-white rounded-lg shadow-lg overflow-hidden bg-white">
        <img
          src={`${IMAGE_PATH}/${img}`}
          alt={`${name} image`}
          className="transition-all duration-100 h-[16rem] object-cover w-full object-top "
        />
      </div>
      <div className="py-2 mt-2 mb-2">
        <h3 className="mt-2 text-heading font-body text-main mb-1">{name}</h3>
        <p
          className={`text-title text-main font-semibold`}
          style={discount ? { color: "#CC2A06" } : undefined}
        >
          {convertToRupiah(discountedPrice || price)}
        </p>
        {discount && discount !== 0 ? (
          <p className="text-main line-through font-bold">
            {convertToRupiah(price)}
          </p>
        ) : null}
      </div>
      <div
        className="flex items-center justify-start
                   gap-3 mb-2 flex-wrap"
      >
        <div className="px-4 py-1 border-[1.5px] border-main rounded-md w-fit text-small">
          Stock: {stock}
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-2">
        {isInCart(product.id) ? (
          <Button
            className="px-4 py-2 bg-transparent text-main border-[1.5px] border-main rounded-md flex-1 hover:bg-light hover:text-body cursor-pointer flex items-center justify-center"
            onClick={removeFromCart}
          >
            {isDeleting ? <Spinner /> : "Remove from cart"}
          </Button>
        ) : (
          <Button
            className="px-4 py-2 bg-main text-body rounded-md flex-1 hover:bg-light cursor-pointer flex items-center justify-center"
            onClick={addToCart}
          >
            {isCreating ? <Spinner /> : "+ Add to Cart"}
          </Button>
        )}
        <Button className="text-title grid place-items-center  rounded-md px-2 py-2">
          <i className="bx bx-heart"></i>
        </Button>
      </div>
    </article>
  );
}
