import { Badge } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
function PriceDetails({
  priceDetails,
  isSticky = false,
}: {
  priceDetails: any;
  isSticky?: boolean;
}) {
  const [navbarHeight, setNavbarHeight] = useState<number>(112);
  const products = Array.isArray(priceDetails) ? priceDetails : [priceDetails];
  console.log(products, "Price Price Details");
  const TOTAL = products.reduce(
    (acc, itme) => acc + itme?.price * itme?.quantity,
    0
  );
  useEffect(() => {
    const navbar = document?.querySelector("#navbar-header") as HTMLElement;
    if (navbar && isSticky) {
      setNavbarHeight(navbar?.offsetHeight);
    }
  }, []);
  console.log(isSticky, "issticky", navbarHeight);

  return (
    <div
      className={isSticky ? `sticky` : ""}
      style={isSticky ? { top: `${navbarHeight}px` } : {}}
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Price Details</h2>
      </div>
      {products.map((itme) => (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Badge count={itme?.quantity || 0} color="#707070">
                <Image
                  src={itme?.thumbnail}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-20 h-20 object-contain bg-theme-white border border-theme-text-grey p-1 rounded-md"
                />
              </Badge>
              <p>{itme?.title}</p>
            </div>
            <p>
              {((itme?.price * itme?.discountPercentage) / 100 + itme?.price) *
                itme?.quantity}
            </p>
          </div>
          <div className="flex justify-between">
            <p>
              Subtotal <span>(-{itme?.discountPercentage}% )</span>
            </p>
            <p>
              <span className="text-theme-green">
                (-
                {((itme?.price * itme?.discountPercentage) / 100) *
                  itme?.quantity}
                )
              </span>
              {itme?.price * itme?.quantity}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p className="text-theme-green">FREE</p>
          </div>
        </div>
      ))}
      <hr className="my-2" />
      <div className="mb-4 flex justify-between">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">₹{TOTAL}</span>
      </div>
    </div>
  );
}

export default PriceDetails;
