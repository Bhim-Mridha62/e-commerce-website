import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import HomePageSectionHeading from "./homePageSectionHeading";
import { useAuthData } from "@/service/Auth";
import { Product } from "@/types/types";
import ProductCard from "../common/productcard/productcard";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import ProductCardSkeleton from "../common/productcard/productCardSkeleton";

const ToDayFlashSales = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { GetAllProduct } = useAuthData();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await GetAllProduct(0, 10);
      if (response?.status == 200) {
        setProducts((prevProducts) => [
          ...prevProducts,
          ...response?.data?.data,
        ]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      // Handle the error (e.g., display an error message)
    }
  }
  return (
    <div className="py-6 md:py-12 w-[90%] mx-auto border-b border-theme-border">
      <div className="relative w-full">
        <div className="md:mb-4 flex justify-between">
          <HomePageSectionHeading
            className=""
            topHeading="Today's"
            bottomHeading="Flash Sales"
          />
          <div className="swiper-navigation-buttons w-24 relative flex">
            <button className="swiper-button-prev bg-gray rounded-full !size-8 md:!size-10 ml-[-10px] bg-theme-border">
              <GoChevronLeft className="text-black !size-6" />
            </button>
            <button className="swiper-button-next bg-gray rounded-full !size-8 md:!size-10 bg-theme-border ">
              <GoChevronRight className="text-black !size-6" />
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="home-page-swiper"
          spaceBetween={16} // Space between slides
          slidesPerView="auto"
        >
          {loading ? (
            <div className="flex gap-3">
              {[1, 2, 3, 4, , 5, 6].map((data) => (
                <ProductCardSkeleton key={data} />
              ))}
            </div>
          ) : (
            products.map((product) => (
              <SwiperSlide key={product?._id} className="custom-slide">
                <ProductCard key={product._id} product={product} user={false} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ToDayFlashSales;
