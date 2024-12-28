import React from "react";
import { useRouter } from "next/router";
import SEO from "@/components/common/seo";
import OrderDetails from "@/components/MyOrderContent/orderDetails";

const Index: React.FC = () => {
  const router = useRouter();
  const productId = router?.query?.productId;
  return (
    <>
      <SEO
        title={`Reviews for ${productId}`}
        description={`Read customer reviews for ${productId} at SD FASHION SHOP.`}
        url={`/order/=${productId}`}
      />
      <div>
        <OrderDetails />
      </div>
    </>
  );
};

export default Index;
