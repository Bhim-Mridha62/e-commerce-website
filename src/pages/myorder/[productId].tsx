import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading"; // Assuming you have a Loading component

// Dynamically import AddReviewPage with a fallback
const AddReviewPage = dynamic(
  () => import("@/components/Review/AddReviewPage"),
  {
    ssr: false, // Render only on the client
    loading: () => <Loading />, // Loading fallback
  }
);

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <title>Give Review</title>
      </Head>
      <div>
        <AddReviewPage />
      </div>
    </>
  );
};

export default Index;
