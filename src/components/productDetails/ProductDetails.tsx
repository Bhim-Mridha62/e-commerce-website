import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Dropdown,
  Input,
  Menu,
  Modal,
  Rate,
  Select,
  Spin,
  message,
} from "antd";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { BsCurrencyRupee } from "react-icons/bs";
import ReviewSection from "./ReviewSection";
import { useAuthData } from "@/service/Auth";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa6";
import { useUser } from "@/context/authContext";
import { encodeData } from "@/utils/client/encoding";
import { DownOutlined } from "@ant-design/icons";
const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [Product, setProduct] = useState<any>([]);
  const [quantity, setQuantity] = useState<any>(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [islike, setLslike] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
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
    router.push(`/cart/address?data=${encodedQuery}`);
  };
  const HandelAddToCart = async (id: string) => {
    try {
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
  const handleMenuClick = (e: any) => {
    if (e.key === "custom") {
      setIsModalVisible(true);
    } else {
      setQuantity(Number(e.key));
    }
  };

  const handleOk = () => {
    if (!(quantity < 0 || quantity == "")) {
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    if (!(quantity < 0 || quantity == "")) {
      setIsModalVisible(false);
    }
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">1</Menu.Item>
      <Menu.Item key="2">2</Menu.Item>
      <Menu.Item key="3">3</Menu.Item>
      <Menu.Item key="4">4</Menu.Item>
      <Menu.Item key="custom">Custom</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Spin spinning={loading} delay={500}>
        <div className="flex flex-col md:flex-row flex-wrap px-2 md:px-5 w-full">
          <div className="pt-4 md:p-4 w-full md:w-1/2">
            <div className="flex gap-2">
              {""}
              <div className="flex w-[20%] justify-between  flex-col space-y-2">
                {Product &&
                  Product?.images?.map((image: string, index: number) => (
                    <img
                      key={index}
                      src={image}
                      alt={Product.title}
                      className={`w-16 h-16 cursor-pointer object-contain border ${
                        index === currentImageIndex
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))}
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
                  className="w-[300px] h-[400px] object-contain"
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
              <div className="">
                Size :{" "}
                <Select
                  style={{ width: 200 }}
                  placeholder="Select Size"
                  optionFilterProp="children"
                  value={selectedSize}
                  onChange={(value) => setSelectedSize(value)}
                  options={[
                    { value: "S", label: "S" },
                    { value: "M", label: "M" },
                    { value: "L", label: "L" },
                    { value: "XL", label: "XL" },
                    { value: "2XL", label: "2XL" },
                    { value: "3XL", label: "3XL" },
                  ]}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">{Product?.title}</h2>
              <h2 className=" font-bold mb-2">Brand: {Product?.brand}</h2>
              <h3 className=" mb-2">Category: {Product?.category}</h3>
              <div className="mb-2">
                <Rate allowHalf disabled value={Product?.rating} />{" "}
                {Product?.rating}
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
              <div className="flex items-center mt-2 gap-2 rounded-lg">
                Quantity:
                <Dropdown
                  overlay={menu}
                  placement="bottomRight"
                  arrow={{
                    pointAtCenter: true,
                  }}
                  trigger={["click"]}
                >
                  <span className="cursor-pointer">
                    {quantity}
                    <DownOutlined className="ml-2" />
                  </span>
                </Dropdown>
              </div>
            </div>
            <ReviewSection id={Product?._id} />
          </div>
        </div>
        {isModalVisible && (
          <Modal
            maskClosable={false}
            width={250}
            title="Custom Quantity"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okButtonProps={{ style: { background: "black" } }}
          >
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter custom quantity"
            />
            {(quantity < 0 || quantity == "") && (
              <span className="text-[#ff0505]">Quantity is require</span>
            )}
          </Modal>
        )}
      </Spin>
    </>
  );
};

export default ProductDetail;
