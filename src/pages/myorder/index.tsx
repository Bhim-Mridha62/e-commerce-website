import React, { Suspense, lazy } from "react";
import Loading from "@/components/Loading/Loading";
import Head from "next/head";

// Lazy import of the MyOrderContent component
const MyOrderContent = lazy(
  () => import("@/components/MyOrderContent/MyOrderContent")
);

const MyOrder: React.FC = () => {
  return (
    <>
      <Head>
        <title>My-Order</title>
      </Head>
      <Suspense fallback={<Loading className="mt-20" />}>
        <MyOrderContent />
      </Suspense>
    </>
  );
};

export default MyOrder;
