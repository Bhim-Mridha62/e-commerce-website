import React from "react";
import { SlEarphonesAlt } from "react-icons/sl";
import { TbTruckDelivery } from "react-icons/tb";
import { VscWorkspaceTrusted } from "react-icons/vsc";
const FeaturesSection = () => {
  const features = [
    {
      icon: <TbTruckDelivery className="text-2xl" />,
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over ₹1000",
    },
    {
      icon: <SlEarphonesAlt className="text-2xl" />,
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: <VscWorkspaceTrusted className="text-2xl" />,
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];
  return (
    <>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-7 text-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-1 md:space-y-2"
            >
              {/* Icon with circular background */}
              <div className="bg-gray-200 w-14 h-14 flex items-center justify-center rounded-full bg-gray shadow-md">
                <div className="bg-black w-10 h-10 flex items-center justify-center rounded-full text-white">
                  {feature?.icon}
                </div>
              </div>
              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold">
                {feature?.title}
              </h3>
              {/* Description */}
              <p className="text-sm text-theme-text-grey">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;
