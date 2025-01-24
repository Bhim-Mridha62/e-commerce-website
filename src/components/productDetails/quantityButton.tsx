import { Tooltip } from "antd";
import React, { memo } from "react";
interface QuantityButtonProps {
  quantity: number;
  setQuantity: any;
  className?: string;
}
const QuantityButton: React.FC<QuantityButtonProps> = memo(
  ({ quantity, setQuantity, className }) => {
    // Function to handle increment
    const increment = () => {
      if (quantity < 5) setQuantity(quantity + 1);
    };

    // Function to handle decrement
    const decrement = () => {
      if (quantity > 1) setQuantity(quantity - 1);
    };

    // Handle direct input (to prevent invalid values)
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value, 10);
      if (!isNaN(newValue) && newValue >= 0 && newValue <= 5) {
        setQuantity(newValue);
      }
    };
    return (
      <div className={`flex items-center border rounded-md w-fit ${className}`}>
        {/* Decrement Button */}
        <button
          onClick={decrement}
          className={`${
            quantity > 1 ? "hover:bg-theme-red" : ""
          }  px-3 py-1 text-xl border-r border-theme-border bg-theme-grey rounded-l-md transition duration-300 ease-in-out`}
        >
          -
        </button>

        {/* Input Field */}
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          className="w-12 text-center focus:outline-none"
          min="0"
          max="5"
        />

        {/* Increment Button */}
        <Tooltip
          title={quantity === 5 ? "You can buy up to 5 products only" : ""}
        >
          <button
            onClick={increment}
            className={`px-3 py-1 ${
              quantity === 5 ? "" : "hover:bg-theme-red"
            } border-l rounded-r-md bg-theme-grey  border-theme-border text-xl transition duration-300 ease-in-out`}
          >
            +
          </button>
        </Tooltip>
      </div>
    );
  }
);

export default QuantityButton;
