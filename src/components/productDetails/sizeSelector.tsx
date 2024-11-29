import React from "react";

interface SizeSelectorProps {
  sizes: { [key: string]: number };
  setSelectedSize: (size: string) => void;
  selectedSize: string;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  setSelectedSize,
  selectedSize,
}) => {
  const handleSizeClick = (size: string) => {
    if (sizes[size] > 0) {
      setSelectedSize(size);
    }
  };
  console.log(selectedSize);

  return (
    <div className="flex space-x-3">
      {Object.entries(sizes || {}).map(([size, count]) => (
        <button
          key={size}
          onClick={() => handleSizeClick(size)}
          disabled={count === 0}
          className={`relative w-8 h-8 flex items-center justify-center border border-gray rounded-md text-sm font-medium ${
            count === 0
              ? "bg-theme-border border-theme-red cursor-not-allowed"
              : ""
          } ${
            selectedSize === size ? "bg-red-500 text-white border-red-500" : ""
          }`}
        >
          {size}
          {count === 0 && (
            <hr
              style={{ transform: "rotate(135deg)" }}
              className="w-[130%] border-theme-red absolute rotate-[130] border"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
