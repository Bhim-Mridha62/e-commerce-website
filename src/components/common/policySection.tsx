import Image from "next/image";
import CashOnDeliveryImage from "/public/policyImage/cash_on_delivery.png";
import ReturnImage from "/public/policyImage/return.png";
import LowestPriceImage from "/public/policyImage/lowest_price.png";
import { Fragment, memo } from "react";

const PolicySection = memo(() => {
  const features = [
    {
      src: LowestPriceImage,
      alt: "Lowest Price",
      label: "Lowest Price",
    },
    {
      src: CashOnDeliveryImage,
      alt: "Cash on Delivery",
      label: "Cash on Delivery",
    },
    {
      src: ReturnImage, // Use the imported image directly
      alt: "7-day Returns",
      label: "7-day Returns",
    },
  ];

  return (
    <div className="flex items-center justify-around py-2">
      {features.map((feature, index) => (
        <Fragment key={index}>
          <div className="flex flex-col items-center text-center space-y-2">
            <Image
              src={feature.src}
              alt={feature.alt}
              width={1000}
              height={1000}
              className="object-contain size-10"
            />
            <p className="text-[10px] font-medium text-theme-text-grey mt-[2px]">
              {feature.label}
            </p>
          </div>
          {index !== 2 && (
            <p className="border border-theme-border w-[1px] h-[60px] md:h-full"></p>
          )}
        </Fragment>
      ))}
    </div>
  );
});

export default PolicySection;
