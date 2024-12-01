import React from "react";

const Button = ({
  onClick,
  text,
  className,
}: {
  className: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      className={`${className} bg-theme-red text-white px-5 py-3 rounded border-none`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
