import React, { Suspense, lazy } from "react";
import Head from "next/head";
import Loading from "@/components/Loading/Loading"; // Assuming you have a Loading component

// Lazy import of the AddReviewPage component
const AddReviewPage = lazy(() => import("@/components/Review/AddReviewPage"));

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <title>Give Review</title>
      </Head>
      <div>
        <Suspense fallback={<Loading />}>
          <AddReviewPage />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
