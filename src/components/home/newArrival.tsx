import React from "react";
import HomePageSectionHeading from "./homePageSectionHeading";

const NewArrival = () => {
  const items = [
    {
      title: "PlayStation 5",
      description: "Black and White version of the PS5 coming out on sale.",
      image:
        "https://dailydeals365.in/wp-content/uploads/2024/05/jbl-go-esstinal-red.webp", // Replace with your image path
      link: "/",
      size: "large", // Large image
    },
    {
      title: "Women's Collections",
      description: "Featured women collections that give you another vibe.",
      image: "https://fcity.in/images/products/180933591/xknwq_512.jpg",
      link: "/",
      size: "medium",
    },
    {
      title: "Speakers",
      description: "Amazon wireless speakers.",
      image:
        "https://m.media-amazon.com/images/I/81cQGuio4ZL._AC_UF894,1000_QL80_.jpg",
      link: "/",
      size: "small",
    },
    {
      title: "Perfume",
      description: "GUCCI INTENSE OUD Eau de Parfum.",
      image:
        "https://www.coopersofstortford.co.uk/images/products/medium/K965_FELi_1.jpg",
      link: "/",
      size: "small",
    },
  ];
  return (
    <section className="py-12">
      <div className="md:w-[90%] mx-auto px-2 md:px-0">
        {/* Header */}
        <HomePageSectionHeading className="" />
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-6 lg:h-[500px]">
          {/* Large Featured Item */}
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative ${
                item.size === "large"
                  ? "md:col-span-1 lg:col-span-2 row-span-1 lg:row-span-2"
                  : item.size === "medium"
                  ? "row-span-1 col-span-1 lg:col-span-2"
                  : "col-span-1 row-span-1"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex flex-col justify-end p-6 text-white bg-gradient-to-t from-theme-black via-transparent to-transparent">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
                <a
                  href={item.link}
                  className="mt-2 inline-block text-sm font-semibold underline"
                >
                  Shop Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
