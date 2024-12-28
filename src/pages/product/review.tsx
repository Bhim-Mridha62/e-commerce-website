import SEO from "@/components/common/seo";
import AddReviewPage from "@/components/Review/AddReviewPage";
import { useRouter } from "next/router";
import React, { FC } from "react";

const Review: FC = () => {
  const router = useRouter();
  const productId = router?.query?.productId;
  return (
    <>
      <SEO
        title={`Reviews for ${productId}`}
        description={`Read customer reviews for ${productId} at SD FASHION SHOP.`}
        url={`/product/review?productId=${productId}`}
      />
      <div>
        <AddReviewPage ReviewProductId={productId as string} />
      </div>
    </>
  );
};

export default Review;
