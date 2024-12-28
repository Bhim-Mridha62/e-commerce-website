import React, {
  lazy,
  Suspense,
  useEffect,
  useState,
  startTransition,
} from "react";
import Loading from "@/components/Loading/Loading";
import SEO from "@/components/common/seo";

const CartContent = lazy(() => import("@/components/cart/CartContent"));

function Index() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setIsHydrated(true);
    });
  }, []);

  return (
    <>
      <SEO
        title="Cart"
        description="View and manage the items in your cart at SD FASHION SHOP."
        url="cart"
      />
      <div>
        {isHydrated ? (
          <Suspense fallback={<Loading className="mt-40" />}>
            <CartContent />
          </Suspense>
        ) : (
          <Loading className="mt-40" />
        )}
      </div>
    </>
  );
}

export default Index;
