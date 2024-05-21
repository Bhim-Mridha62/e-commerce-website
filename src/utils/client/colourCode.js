export function GetOrderStatusColour(status) {
  let colour;
  if (status === "pending") {
    colour = "#3b82f6"; // Blue
  } else if (status === "Delivered") {
    colour = "#10b981"; // Green
  } else if (status === "cancelled") {
    colour = "#ef4444"; // Red
  } else {
    colour = "#6b7280"; // Gray
  }
  return colour;
}
import React from 'react';

export const getRatingSpan = (rating) => {
  let text = '';
  let colorCode = '';

  switch (rating) {
    case 1:
      text = 'Very Bad';
      colorCode = '#DC2626'; // Tailwind color code for text-red-600
      break;
    case 2:
      text = 'Bad';
      colorCode = '#EA580C'; // Tailwind color code for text-orange-600
      break;
    case 3:
      text = 'Good';
      colorCode = '#CA8A04'; // Tailwind color code for text-yellow-600
      break;
    case 4:
      text = 'Very Good';
      colorCode = '#22C55E'; // Tailwind color code for text-green-500
      break;
    case 5:
      text = 'Excellent';
      colorCode = '#15803D'; // Tailwind color code for text-green-700
      break;
    default:
      text = 'Good';
      colorCode = '#6B7280'; // Tailwind color code for text-gray-500
  }

  return <span style={{ color: colorCode }} className="font-semibold ml-2">{text}</span>;
};