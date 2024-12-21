import React from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading"; // Assuming you have a Loading component
import { useRouter } from "next/router";
import SEO from "@/components/common/seo";

// Dynamically import AddReviewPage with a fallback
const AddReviewPage = dynamic(
  () => import("@/components/Review/AddReviewPage"),
  {
    ssr: false, // Render only on the client
    loading: () => <Loading />, // Loading fallback
  }
);

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
        <AddReviewPage ReviewProductId={productId as string} />
      </div>
    </>
  );
};

export default Index;
