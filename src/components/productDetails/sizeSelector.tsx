import { Tooltip } from "antd";
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
        <Tooltip title={count === 0 ? "Not available" : ""}>
          <button
            key={size}
            onClick={() => handleSizeClick(size)}
            disabled={count === 0}
            className={`relative w-8 h-8 flex items-center justify-center border border-gray rounded-md text-sm font-medium ${
              count === 0
                ? "bg-theme-grey cursor-not-allowed text-theme-text-grey"
                : ""
            } ${
              selectedSize === size
                ? "bg-red-500 text-white border-red-500"
                : ""
            }`}
          >
            {size}
          </button>
        </Tooltip>
      ))}
    </div>
  );
};

export default SizeSelector;
