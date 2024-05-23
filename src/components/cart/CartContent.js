import React from "react";
import ProductCard from "./ProductCard";
import PriceDetails from "../common/PriceDetails";

const productData = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
      "https://cdn.dummyjson.com/product-images/1/2.jpg",
      "https://cdn.dummyjson.com/product-images/1/3.jpg",
      "https://cdn.dummyjson.com/product-images/1/4.jpg",
      "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    ],
    quantity: 1,
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    brand: "Apple",
    category: "smartphones",
    thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/2/1.jpg",
      "https://cdn.dummyjson.com/product-images/2/2.jpg",
      "https://cdn.dummyjson.com/product-images/2/3.jpg",
      "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    ],
    quantity: 1,
  },
];

const CartContent = () => {
  const totalItems = productData?.length;
  const totalPrice = productData.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  ).toFixed(0);
  const totalDiscount = productData.reduce(
    (acc, product) =>
      acc +
      ((product.price * product.discountPercentage) / 100) * product.quantity,
    0
  ).toFixed(0);
  const totalAmount = (totalPrice - totalDiscount).toFixed(0);
  const totalSavings = totalDiscount;
  return (
    <div className="container mx-auto mt-4">
      {productData.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <PriceDetails
        totalItems={totalItems}
        totalPrice={totalPrice}
        totalDiscount={totalDiscount}
        totalAmount={totalAmount}
        totalSavings={totalSavings}
      />
    </div>
  );
};

export default CartContent;
