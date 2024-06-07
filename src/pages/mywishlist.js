import Loading from "@/components/Loading/Loading";
import dynamic from "next/dynamic";
import React from "react";
const WishlistContent = dynamic(() => import("@/components/wishlist/WishlistContent"), {
  loading: () => <Loading />,
});

function MyWishlist() {
  return (
    <div>
      <WishlistContent />
    </div>
  );
}

export default MyWishlist;
