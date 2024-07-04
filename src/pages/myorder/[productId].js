"use client";
import AddReviewPage from "@/components/Review/AddReviewPage";
import Head from "next/head";
import React from "react";
const index = () => {
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

export default index;
