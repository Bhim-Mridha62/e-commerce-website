import React, { memo, useEffect, useState } from "react";
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
import Button from "../common/button";
import useIsMobile from "@/utils/client/isMobile";

const ToDayFlashSales = memo(
  ({
    isBestSelling = false,
    topHeading,
    bottomHeading,
  }: {
    isBestSelling?: boolean;
    topHeading: string;
    bottomHeading: string;
  }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { GetAllProduct } = useAuthData();
    const isMobile = useIsMobile();

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
              topHeading={topHeading}
              bottomHeading={bottomHeading}
            />
            {isBestSelling ? (
              <Button
                text="View All"
                className="h-fit my-auto"
                onClick={() => {
                  console.log("onClick");
                }}
              />
            ) : (
              <div className="swiper-navigation-buttons w-24 relative flex">
                <button className="swiper-button-prev-flash-sale swiper-button-prev bg-gray rounded-full !size-8 md:!size-10 ml-[-10px] bg-theme-border">
                  <GoChevronLeft className="text-black !size-6" />
                </button>
                <button className="swiper-button-next-flash-sale swiper-button-next bg-gray rounded-full !size-8 md:!size-10 bg-theme-border ">
                  <GoChevronRight className="text-black !size-6" />
                </button>
              </div>
            )}
          </div>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-flash-sale",
              prevEl: ".swiper-button-prev-flash-sale",
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
                  <ProductCard
                    isBestSelling={isBestSelling}
                    key={product._id}
                    product={product}
                    user={false}
                    isMobile={isMobile}
                  />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
        {!isBestSelling && (
          <div className="text-center mt-8">
            <Button
              text="View All Products"
              className=" mx-auto"
              onClick={() => {
                console.log("onClick");
              }}
            />
          </div>
        )}
      </div>
    );
  }
);

export default ToDayFlashSales;
