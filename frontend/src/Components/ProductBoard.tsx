import { useNavigate, useRevalidator } from "react-router-dom";
import { useDashboard } from "../Context/DashboardContext";
import { IMAGE_PATH, convertToRupiah } from "../utils/helper";
import Button from "./Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";

function ProductNavbar() {
  const { setProductSearchQuery } = useDashboard();
  return (
    <div className="mt-12 flex justify-between items-center">
      <div className="flex gap-4 items-center justify-center">
        <Button className="border-[1.5px] border-main bg-main px-6 py-2 rounded-md text-body text-small hover:bg-light cursor-pointer">
          Your Products
        </Button>
        <Button
          className="border-[1.5px] border-main px-6 py-2 rounded-md text-main text-small hover:bg-light hover:text-white cursor-pointer"
          to="/dashboard/modify"
        >
          + Add Products
        </Button>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="Search Product"
          className="border-[1.5px] border-main py-2 bg-transparent placeholder:text-main/50 rounded-md pl-6 pr-10 text-small"
          onChange={(e) => setProductSearchQuery(e.target.value)}
        />
        <i className="bx bx-search-alt-2 absolute right-[1rem] translate-y-[-50%] top-[50%] text-medium text-light"></i>
      </div>
    </div>
  );
}

export function ProductBoard() {
  const { productFiltered, selectProductById } = useDashboard();
  const revalidator = useRevalidator();
  const navigate = useNavigate();

  // Clears empty product selection & refetch data everytime user loads the /dashboard/product route
  useEffect(() => {
    // revalidator.revalidate();
    selectProductById("");
  }, [selectProductById, revalidator]);

  return (
    <div>
      <ProductNavbar />
      <div className=" mt-8 p-8 rounded-lg bg-[#FFFCFA]">
        {productFiltered && productFiltered?.length > 0 ? (
          <Swiper slidesPerView={4} spaceBetween={32}>
            {productFiltered?.map((product) => {
              const handleSelect = () => {
                selectProductById(product.id);
                navigate("/dashboard/modify");
              };

              return (
                <SwiperSlide className="h-[40rem] grid grid-rows-[minmax(0,1fr)_5rem] gap-4">
                  <div className="overflow-hidden">
                    <img
                      src={`${IMAGE_PATH}/${product.img}`}
                      alt=""
                      className="h-[20rem] w-full object-cover object-top rounded-lg"
                    />
                    <p className="mt-6">{product.name}</p>
                    <h2 className="text-title font-semibold">
                      {convertToRupiah(product.price)}
                    </h2>
                    <div
                      className="flex items-center justify-start
                   gap-3 mt-2 mb-4 flex-wrap"
                    >
                      <div className="px-4 py-1 border-[1.5px] border-main rounded-md w-fit text-small">
                        Stock: {product.stock}
                      </div>
                      <div className="px-4 py-1 bg-main text-body rounded-md w-fit text-small">
                        Categories ({product.categories.length})
                      </div>
                    </div>
                    <p className="text-light/80 text-small truncate-paragraph ">
                      {product.desc}
                    </p>
                  </div>
                  <div>
                    <Button
                      onClick={handleSelect}
                      className="bg-main py-3 px-4 w-full text-body text-small rounded-md hover:bg-light mt-auto justify-self-end flex items-center justify-center gap-2"
                    >
                      <i className="bx bxs-edit text-heading "></i>
                      Edit Product
                    </Button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <h2 className="h-[39rem] flex items-center justify-center flex-col text-medium text-light">
            <i className="bx bxs-basket text-hero text-light/50 mb-3"></i>
            No Products Found
          </h2>
        )}
      </div>
    </div>
  );
}
