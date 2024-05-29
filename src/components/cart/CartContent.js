import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import PriceDetails from "../common/PriceDetails";
import { useAuthData } from "@/service/Auth";
import EmptyCart from "./EmptyCart";

const productData = [
  {
    title: "iPhone 9",
    price: 549,
    discountPercentage: 12.96,
    rating: 4.69,
    stock: 94,
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    quantity: 1,
  },
  {
    title: "iPhone X",
    price: 899,
    discountPercentage: 17.94,
    rating: 4.44,
    stock: 34,
    thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
    quantity: 1,
  },
];

const CartContent = () => {
  const [productData, setProductData] = useState([]);
  const { AddToCart, AllCartData, RemoveCartData } = useAuthData();
  const [user, setUser] = useState(null);
  const fetchData = async () => {
    try {
      const res = await AllCartData();
      if (res?.status === 200) {
        setProductData(res?.data?.data);
      }
      console.log(res, "AllCartData");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserString = localStorage.getItem("User");
      const storedUser = storedUserString ? JSON.parse(storedUserString) :"";
      setUser(storedUser);
    }
    fetchData();
  }, []);
  const HandelRemove = async (id) => {
    try {
      const res = await RemoveCartData({ productId: id });
      if (res?.status === 200) {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const totalItems = productData?.length;
  const totalPrice = productData
    .reduce((acc, product) => acc + product.price * product.quantity, 0)
    .toFixed(0);
  const totalDiscount = productData
    .reduce(
      (acc, product) =>
        acc +
        ((product.price * product.discountPercentage) / 100) * product.quantity,
      0
    )
    .toFixed(0);
  const totalAmount = (totalPrice - totalDiscount).toFixed(0);
  const totalSavings = totalDiscount;
  console.log(productData, "productData");
  console.log(user, "user");
  return (
    <div className="container mx-auto mt-4">
      {user ? (
        productData.length ? (
          <>
            {productData.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                HandelRemove={HandelRemove}
              />
            ))}
            <PriceDetails
              totalItems={totalItems}
              totalPrice={totalPrice}
              totalDiscount={totalDiscount}
              totalAmount={totalAmount}
              totalSavings={totalSavings}
            />
          </>
        ) : (
          <EmptyCart IsLogin={true} />
        )
      ) : (
        <EmptyCart IsLogin={false} />
      )}
    </div>
  );
};

export default CartContent;
