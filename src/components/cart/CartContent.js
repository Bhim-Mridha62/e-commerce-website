import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import PriceDetails from "../common/PriceDetails";
import { useAuthData } from "@/service/Auth";
import EmptyCart from "./EmptyCart";
import Loading from "../Loading/Loading";
import { useUser } from "@/context/authContext";
const CartContent = () => {
  const [productData, setProductData] = useState([]);
  const { AddToCart, AllCartData, RemoveCartData } = useAuthData();
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user,cartCountRef} = useUser();
  const fetchData = async () => {
    try {
      const res = await AllCartData();
      if (res?.status === 200) {
        setProductData(res?.data?.data);
      }
      console.log(res, "AllCartData");
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const HandelRemove = async (id) => {
    try {
      const res = await RemoveCartData({ productId: id });
      if (res?.status === 200) {
        fetchData();
        cartCountRef.current && cartCountRef?.current()
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
  if (loading) {
    return <Loading className="mt-4"/>;
  }
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
