import React from "react";
import Loading from "@/components/Loading/Loading";
import dynamic from "next/dynamic";
import SEO from "@/components/common/seo";

// Lazy import of the MyOrderContent component
const MyOrderContent = dynamic(
  () => import("@/components/MyOrderContent/MyOrderContent"),
  {
    ssr: false,
    loading: () => <Loading className="mt-20" />,
  }
);

const MyOrder: React.FC = () => {
  return (
    <>
      <SEO
        title="Orders"
        description="View your order history at SD FASHION SHOP."
        url="order"
      />
      <MyOrderContent />
    </>
  );
};

export default MyOrder;
