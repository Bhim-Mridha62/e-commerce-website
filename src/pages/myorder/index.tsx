import React from "react";
import Loading from "@/components/Loading/Loading";
import Head from "next/head";
import dynamic from "next/dynamic";

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
      <Head>
        <title>My-Order</title>
      </Head>
      <MyOrderContent />
    </>
  );
};

export default MyOrder;
