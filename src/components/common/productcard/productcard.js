import React from "react";
import { Rate } from "antd";
import { BsCurrencyRupee } from "react-icons/bs";
import { RiShoppingCart2Fill } from "react-icons/ri";
import stylehome from "./ProductCard.module.css";
import { calculateDiscountedPrice } from "@/utils/client/discountUtils";
import { useRouter } from "next/router";
const ProductCard = ({ product }) => {
  const router = useRouter();
  const Productdetails = (id) => {
    router.push(`/product/${id}`);
  };
  const HandelAddtoCart = (productId) => {
    let updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    let productIndex = updatedCart.findIndex((item) => item.id === productId);
    if (productIndex !== -1) {
      updatedCart[productIndex].count = 2;
    } else {
      updatedCart.push({ id: productId, count: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  return (
    <div
      onClick={() => Productdetails(product._id)}
      className={stylehome.Productshow}
    >
      <img
        className={stylehome.ProductshowImg}
        src={product.thumbnail}
        alt="Image here"
      />
      <p className={stylehome.productTitle}>{product.title}</p>
      <p className={stylehome.ratingText}>
        <Rate allowHalf disabled value={product.rating} />
        <span>{product.rating}</span>
      </p>
      <p className="inline text-sm">
        <span className="text-black">
          <BsCurrencyRupee className="inline text-black" />
          {calculateDiscountedPrice(product.price, product.discountPercentage)}
        </span>
        <del className="text-black ml-1 font-bold">
          {/* <BsCurrencyRupee className='inline text-black'/> */}
          {product.price}
        </del>
        <span className="text-[#26a541] font-bold">
          {Math.round(product.discountPercentage)}%OFF
        </span>
      </p>
      {/* <div className={stylehome.buyandadddiv}>
        <button style={{ background: 'rgb(235 154 101)' }} onClick={() => buynowbutton({ product, count: 1 })}>Buy now</button>
        <button onClick={() => HandelAddtoCart(product.id)} className={stylehome.Productaddbutton}>
          Add to <RiShoppingCart2Fill />
        </button>
      </div> */}
    </div>
  );
};

export default ProductCard;
