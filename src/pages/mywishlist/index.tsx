import SEO from "@/components/common/seo";
import Loading from "@/components/Loading/Loading";
import dynamic from "next/dynamic";
import React from "react";
const WishlistContent = dynamic(
  () => import("@/components/wishlist/WishlistContent"),
  {
    loading: () => <Loading />,
  }
);

function MyWishlist() {
  return (
    <>
      <SEO
        title="My Wishlist"
        description="View your favorite items saved in your wishlist at SD FASHION SHOP."
        url="mywishlist"
      />
      <div>
        <WishlistContent />
      </div>
    </>
  );
}

export default MyWishlist;
