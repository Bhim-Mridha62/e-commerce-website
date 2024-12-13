import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAuthData } from "@/service/Auth";
import EmptyCart from "./EmptyCart";
import Loading from "../Loading/Loading";
import { useUser } from "@/context/authContext";
import { ProductData } from "@/types/types";
import CartProductPricingDetails from "./cartProductPricingDetails";

const CartContent = () => {
  const [priceDetails, setPriceDetails] = useState<ProductData>([]);
  const { AllCartData, RemoveCartData } = useAuthData();
  const [loading, setLoading] = useState(true);
  const { user, cartCountRef } = useUser();
  const fetchData = async () => {
    try {
      const res = await AllCartData();
      if (res?.status === 200) {
        setPriceDetails(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  const HandelRemove = async (id: string) => {
    try {
      const res = await RemoveCartData({ productId: id });
      if (res?.status === 200) {
        fetchData();
        cartCountRef.current && cartCountRef?.current();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const UpdateProductData = (Size: string, productId: string, qty: number) => {
    let updateData = priceDetails?.map((data: any) => {
      if (data?._id == productId) {
        return { ...data, quantity: qty, Size: Size };
      } else return data;
    });
    setPriceDetails(updateData);
  };

  if (loading) {
    return <Loading className="mt-4" />;
  }

  return (
    <div className="mx-auto">
      {user ? (
        priceDetails.length ? (
          <div className="mdb:flex">
            <div className="mdb:w-[65%] mdb:border-r border-theme-border mdb:pl-10">
              {priceDetails.map((product: any) => (
                <ProductCard
                  key={product?._id}
                  product={product}
                  HandelRemove={HandelRemove}
                  UpdateProductData={UpdateProductData}
                />
              ))}
            </div>
            <div className="mdb:w-[35%] bg-[#f5f5f5] md:px-10">
              <CartProductPricingDetails priceDetails={priceDetails} />
            </div>
          </div>
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
