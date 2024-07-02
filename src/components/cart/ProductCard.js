import React, { useEffect } from "react";
import {
  Button,
  Divider,
  Dropdown,
  Input,
  Menu,
  Modal,
  Rate,
  Select,
} from "antd";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";
import { useAuthData } from "@/service/Auth";
import { DownOutlined } from "@ant-design/icons";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { encodeData } from "@/utils/client/encoding";
import { useRouter } from "next/router";
const ProductCard = ({ product, HandelRemove, UpdateProductData }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const { AddToCart } = useAuthData();
  useEffect(() => {
    setQuantity(product?.quantity);
    setSelectedSize(product?.Size);
  }, []);
  const HandelAddToCart = async (Size, productId, qty) => {
    try {
      await AddToCart({
        Size: Size,
        productId: productId,
        quantity: qty,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleMenuClick = (e) => {
    if (e.key === "custom") {
      setIsModalVisible(true);
    } else {
      setQuantity(Number(e.key));
      UpdateProductData(selectedSize, product?._id, Number(e.key));
      HandelAddToCart(selectedSize, product?._id, Number(e.key));
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
  const handelQuantity = (e) => {
    setQuantity(Number(e.target.value));
    UpdateProductData(selectedSize, product?._id, Number(e.target.value));
    HandelAddToCart(selectedSize, product?._id, Number(e.target.value));
  };
  const handleBuyNow = () => {
    const { title, discountPercentage, price, thumbnail, _id } = product;
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
  return (
    <>
      <div className="mb-4 p-2 md:p-4">
        <div className="flex text-black">
          <div className="w-1/4">
            <img
              src={product?.thumbnail}
              alt={product?.title}
              className="w-full h-auto rounded"
            />
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
          <div className="w-3/4 pl-4">
            <h2 className="text-lg font-bold">{product?.title}</h2>
            <p className="mb-2">
              Size:{" "}
              <Select
                style={{ width: 130 }}
                placeholder="Select Size"
                optionFilterProp="children"
                value={selectedSize}
                onChange={(value) => {
                  setSelectedSize(value),
                    UpdateProductData(value, product?._id, quantity),
                    HandelAddToCart(value, product?._id, quantity);
                }}
                options={[
                  { value: "S", label: "S" },
                  { value: "M", label: "M" },
                  { value: "L", label: "L" },
                  { value: "XL", label: "XL" },
                  { value: "2XL", label: "2XL" },
                  { value: "3XL", label: "3XL" },
                ]}
              />
            </p>
            {/* <p className="mb-2">Brand: {product.brand}</p> */}
            <div className="flex items-center mb-2">
              <Rate className="text-xs" value={product?.rating} disabled />
              <span className="ml-2 text-sm">(55)</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-gray-500 line-through">
                ₹
                {calculateDiscountedPrice(
                  product?.price,
                  product?.discountPercentage
                ) * quantity}
              </span>
              <span className="ml-2 text-xl font-bold">
                ₹{product?.price * quantity}
              </span>
              <span className="ml-2 text-green-600">
                {Math.round(product?.discountPercentage)}% off
              </span>
            </div>
          </div>
        </div>
        <p className="text-[#000000a1]">
          Delivery by {"May 24 ,fri"}{" "}
          <del className="font-semibold mx-1"> ₹40</del>
          <span className="text-green-600">FREE</span>
        </p>
        <div className="flex justify-center mt-4 gap-2">
          <Button
            onClick={() => HandelRemove(product?._id)}
            icon={<MdOutlineDeleteForever />}
            className="bg-red-500 text-white"
          >
            Remove
          </Button>
          <Button
            onClick={handleBuyNow}
            className="bg-[#1677ff]"
            type="primary"
          >
            Buy this now
          </Button>
        </div>
      </div>
      <Divider />
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
            onChange={handelQuantity}
            placeholder="Enter custom quantity"
          />
          {(quantity < 0 || quantity == "") && (
            <span className="text-[#ff0505]">Quantity is require</span>
          )}
        </Modal>
      )}
    </>
  );
};

export default ProductCard;
