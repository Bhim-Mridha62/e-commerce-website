import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import { Spin, message, notification } from "antd";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { BsCurrencyRupee } from "react-icons/bs";
import ReviewSection from "./ReviewSection";
import { useAuthData } from "@/service/Auth";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa6";
import { useUser } from "@/context/authContext";
import { encodeData } from "@/utils/client/encoding";
import SizeSelector from "./sizeSelector";
import { Rating } from "@fluentui/react-rating";
import QuantityButton from "./quantityButton";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [Product, setProduct] = useState<any>([]);
  const [quantity, setQuantity] = useState<any>(1);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [islike, setLslike] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user, cartCountRef } = useUser();

  const router = useRouter();
  const { AddToCart, FetchProductDetail, Postwishlist } = useAuthData();
  const { productId } = router.query;
  useEffect(() => {
    if (productId) {
      getProductDetail(productId as string);
    }
  }, [productId]);
  const handleAddwishlist = async (id: string) => {
    setLslike(!islike);
    try {
      await Postwishlist({ productId: id });
    } catch (error) {
      console.error(error);
    }
  };
  const getProductDetail = async (id: string) => {
    setLoading(true);
    try {
      const data = await FetchProductDetail(id);
      setProduct(data?.data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching product:", error);
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };
  const handleBuyNow = () => {
    if (!user) {
      notification.error({ message: "Please login to proceed." });
      return;
    }
    if (!selectedSize) {
      return message.info("Please Select Size");
    }
    const { title, discountPercentage, price, thumbnail, _id } = Product;
    //@ts-ignore
    const encodedQuery = encodeData({
      title,
      discountPercentage,
      price,
      thumbnail,
      quantity,
      selectedSize,
      _id,
    });
    router.push(`/checkout?data=${encodedQuery}`);
  };
  const HandelAddToCart = async (id: string) => {
    try {
      if (!user) {
        notification.error({ message: "Please login to proceed." });
        return;
      }
      if (!selectedSize) {
        message.info("Please Select Size");
      } else {
        const res = await AddToCart({
          Size: selectedSize,
          productId: id,
          quantity: quantity,
        });
        if (res?.status === 200) {
          cartCountRef.current && cartCountRef?.current();
          router.push("/cart");
        } else {
          message.error("Somthing please try again");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Spin spinning={loading} delay={500}>
        <div className="flex flex-col md:flex-row flex-wrap px-2 md:px-5 w-full">
          <div className="pt-4 md:p-4 w-full md:w-1/2">
            <div className="flex gap-2">
              {""}
              <div className="flex w-[20%] justify-between  flex-col space-y-2 relative">
                <button
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 bg-theme-border p-2 rounded-full shadow hover:bg-gray-100"
                  id="product-swiper-button-prev"
                >
                  <FaChevronUp />
                </button>

                {Product && (
                  <Swiper
                    direction="vertical"
                    loop
                    spaceBetween={10}
                    slidesPerView={4}
                    centeredSlides={true}
                    // initialSlide={currentImageIndex}
                    navigation={{
                      nextEl: "#product-swiper-button-next",
                      prevEl: "#product-swiper-button-prev",
                    }}
                    className="h-[280px] md:h-[400px]"
                    modules={[Navigation]}
                    // slidesPerView="auto"
                  >
                    {Product?.images?.map((image: string, index: number) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt={Product.title}
                          className={`w-16 h-16 cursor-pointer object-contain border ${
                            index === currentImageIndex
                              ? "border-blue-500"
                              : "border-gray-300"
                          }`}
                          onClick={() => handleImageClick(index)}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
                <button
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 bg-theme-border p-2 rounded-full shadow hover:bg-gray-100"
                  id="product-swiper-button-next"
                >
                  <FaChevronDown />
                </button>
              </div>
              <div className='"w-[80%] h-100% relative'>
                {user && Product && (
                  <span
                    className="absolute right-1 top-1"
                    onClick={() => handleAddwishlist(Product._id)}
                  >
                    {islike ? (
                      <FcLike className="text-black text-2xl" />
                    ) : (
                      <FaRegHeart className="text-black text-2xl" />
                    )}
                  </span>
                )}
                <img
                  src={Product?.images?.[currentImageIndex]}
                  alt={Product?.title}
                  className="w-[300px] h-[280px] md:h-[400px] object-contain"
                />
              </div>
            </div>
            <div className="flex mt-2 justify-evenly">
              <button
                className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => HandelAddToCart(Product?._id)}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
          <div className="HideScroll flex-1 flex flex-col h-[88vh] overflow-y-auto w-full md:w-1/2">
            <div className="text-black">
              <p className="text-lg text-gray-700 mb-2">
                {Product?.description}
              </p>
              <div className="flex gap-2 my-2 whitespace-nowrap">
                Size :{" "}
                <SizeSelector
                  selectedSize={selectedSize}
                  sizes={Product?.sizes}
                  setSelectedSize={setSelectedSize}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{Product?.title}</h2>
              <h2 className=" font-bold mb-2">Brand: {Product?.brand}</h2>
              <h3 className=" mb-2">Category: {Product?.category}</h3>
              <div className="mb-2 flex gap-2 items-center">
                <Rating
                  size="large"
                  step={0.5}
                  className="text-theme-golden pointer-events-none cursor-default"
                  value={Number(Product?.rating)}
                />{" "}
                {44 > 0 && (
                  <span className="mx-2 text-sm text-theme-blue">
                    {`Rated by ${44} people`}
                  </span>
                )}
                <span className="bg-theme-green px-2 text-sm rounded-md h-fit text-theme-white">
                  {Product?.rating}★
                </span>
              </div>
              <div className="text-lg mb-2 text-[#26a541]">
                Number of Stock:{" "}
                <span className="text-black">{Product?.stock}</span>
              </div>
              <p className="inline ">
                <BsCurrencyRupee className="inline text-xl font-semibold text-black" />
                <span className="text-xl text-black">
                  {quantity == 0 || quantity == ""
                    ? Product?.price
                    : Product?.price * quantity}
                </span>
                <del className="text-black ml-2 font-normal ">
                  {/* <BsCurrencyRupee className='inline text-black'/> */}
                  {quantity == 0 || quantity == ""
                    ? calculateDiscountedPrice(
                        Product?.price,
                        Product?.discountPercentage
                      )
                    : calculateDiscountedPrice(
                        Product?.price,
                        Product?.discountPercentage
                      ) * quantity}
                </del>
                <span className="text-[#26a541] ml-2 font-bold">
                  {Math.round(Product?.discountPercentage)}%OFF
                </span>
              </p>
              <div className="flex items-center mt-2">
                Quantity:
                <QuantityButton
                  quantity={quantity}
                  setQuantity={setQuantity}
                  className="m-2"
                />
              </div>
            </div>
            <ReviewSection id={Product?._id} />
          </div>
        </div>
      </Spin>
    </>
  );
};

export default ProductDetail;
