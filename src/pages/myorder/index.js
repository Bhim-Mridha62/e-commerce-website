import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const MyOrderContent = dynamic(
  () => import("@/components/MyOrderContent/MyOrderContent"),
  { loading: () => <Loading /> }
);
const MyOrder = () => {
  return <MyOrderContent />;
};

export default MyOrder;
