import { Tooltip } from "antd";
import React from "react";
interface QuantityButtonProps {
  quantity: number;
  className?: string;
  setQuantity?: (value: number) => void;
  onQuantityChange?: (value: number) => void;
}
const QuantityButton: React.FC<QuantityButtonProps> = ({
  quantity,
  setQuantity,
  onQuantityChange,
  className,
}) => {
  // Function to handle increment
  const increment = () => {
    console.log("am i call");

    if (quantity < 5) {
      const newQuantity = quantity + 1;
      setQuantity?.(newQuantity);
      onQuantityChange?.(newQuantity); //for cart page
    }
  };

  // Function to handle decrement
  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity?.(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  // Handle direct input (to prevent invalid values)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 5) {
      setQuantity?.(newValue);
      onQuantityChange?.(newValue);
    }
  };
  return (
    <div className={`${className} flex items-center border rounded-md w-fit`}>
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
};

export default QuantityButton;
