import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
import Head from "next/head";
const MyOrderContent = dynamic(
  () => import("@/components/MyOrderContent/MyOrderContent"),
  { loading: () => <Loading className="mt-20" /> }
);
const MyOrder = () => {
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
