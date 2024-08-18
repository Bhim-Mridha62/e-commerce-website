import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import PriceDetails from "../common/PriceDetails";
import { useAuthData } from "@/service/Auth";
import EmptyCart from "./EmptyCart";
import Loading from "../Loading/Loading";
import { useUser } from "@/context/authContext";
import { ProductData } from "@/types/types";

const CartContent = () => {
  const [productData, setProductData] = useState<ProductData>([]);
  const { AllCartData, RemoveCartData } = useAuthData();
  const [loading, setLoading] = useState(true);
  const { user, cartCountRef } = useUser();

  const fetchData = async () => {
    try {
      const res = await AllCartData();
      if (res?.status === 200) {
        setProductData(res?.data?.data);
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
    let updateData = productData?.map((data: any) => {
      if (data?._id == productId) {
        return { ...data, quantity: qty, Size: Size };
      } else return data;
    });
    setProductData(updateData);
  };

  if (loading) {
    return <Loading className="mt-4" />;
  }

  return (
    <div className="container mx-auto mt-4">
      {user ? (
        productData.length ? (
          <>
            {productData.map((product: any) => (
              <ProductCard
                key={product?._id}
                product={product}
                HandelRemove={HandelRemove}
                UpdateProductData={UpdateProductData}
              />
            ))}
            <PriceDetails productData={productData} />
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
