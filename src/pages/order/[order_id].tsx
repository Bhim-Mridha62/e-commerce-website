import React from "react";
import { useRouter } from "next/router";
import SEO from "@/components/common/seo";
import OrderDetails from "@/components/MyOrderContent/orderDetails";

const Index: React.FC = () => {
  const router = useRouter();
  const order_id = router?.query?.order_id as string;
  console.log(order_id, "order_id");

  return (
    <>
      <SEO
        title={`Reviews for ${order_id}`}
        description={`Read customer reviews for ${order_id} at SD FASHION SHOP.`}
        url={`/order/=${order_id}`}
      />
      <div>
        <OrderDetails order_id={order_id} />
      </div>
    </>
  );
};

export default Index;
