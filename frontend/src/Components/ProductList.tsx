import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IMAGE_PATH, convertToRupiah } from "../utils/helper";
import { useHome } from "../Context/HomeContext";
import { TProduct } from "../Services/API";
import Button from "./Button";
import Spinner from "./Spinner";
import { useCart } from "../Context/CartContext";
import useCartMutation from "../Hooks/useCartMutation";
import { TCategory } from "../Context/DashboardContext";

export default function ProductList({
  categoryFilter,
  isDiscount = false,
  noFilter = false,
  label = "",
}: {
  categoryFilter?: TCategory;
  isDiscount?: boolean;
  noFilter?: boolean;
  label: string;
}) {
  const { productData } = useHome();

  const filteredProduct = productData
    ?.filter((product) => {
      if (!categoryFilter?.id || noFilter) return true;
      return (
        product.categories.some(
          (category) => category.id === categoryFilter.id
        ) || false
      );
    })
    .filter((product) => {
      if (noFilter || !isDiscount) return true;
      return product.discount && product.discount > 0;
    });

  const isEmpty = filteredProduct && filteredProduct?.length <= 0;

  if (noFilter && (!productData || productData?.length === 0)) {
    return (
      <div className="px-8 my-32">
        <h2 className="text-center text-large font-semibold font-body text-light">
          No Products Yet
        </h2>
        <p className="font-body text-center text-light/70 mt-2">
          Check back later!, we're still working on our products!
        </p>
      </div>
    );
  }

  return !isEmpty ? (
    <div className="px-8 mt-16">
      <h2 className="text-large font-semibold mb-4 text-main">{label}</h2>
      {productData && productData.length > 0 ? (
        <Swiper slidesPerView={4} spaceBetween={32}>
          {filteredProduct?.map((product) => {
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
  ) : null;
}

function ProductItem({ product }: { product: TProduct }) {
  const { isInCart, cartQuery } = useCart();
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
            onClick={() => {
              if (cartQuery.isRefetching || cartQuery.isFetching) return;
              removeFromCart();
            }}
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
