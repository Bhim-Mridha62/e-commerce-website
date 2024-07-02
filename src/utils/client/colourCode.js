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
import React from "react";

export const getRatingSpan = (rating) => {
  let text = "";
  let colorCode = "";

  switch (rating) {
    case 1:
      text = "Very Bad";
      colorCode = "#DC2626"; // Tailwind color code for text-red-600
      break;
    case 2:
      text = "Bad";
      colorCode = "#EA580C"; // Tailwind color code for text-orange-600
      break;
    case 3:
      text = "Good";
      colorCode = "#CA8A04"; // Tailwind color code for text-yellow-600
      break;
    case 4:
      text = "Very Good";
      colorCode = "#22C55E"; // Tailwind color code for text-green-500
      break;
    case 5:
      text = "Excellent";
      colorCode = "#15803D"; // Tailwind color code for text-green-700
      break;
    default:
      text = "Good";
      colorCode = "#6B7280"; // Tailwind color code for text-gray-500
  }

  return (
    <span style={{ color: colorCode }} className="font-semibold ml-2">
      {text}
    </span>
  );
};
export const getLetterColors = (letter) => {
  switch (letter.toUpperCase()) {
    case "A":
      return { backgroundColor: "#FF5733", textColor: "#FFFFFF" };
    case "B":
      return { backgroundColor: "#33FF57", textColor: "#000000" };
    case "C":
      return { backgroundColor: "#3357FF", textColor: "#FFFFFF" };
    case "D":
      return { backgroundColor: "#FF33A1", textColor: "#FFFFFF" };
    case "E":
      return { backgroundColor: "#A1FF33", textColor: "#000000" };
    case "F":
      return { backgroundColor: "#33A1FF", textColor: "#FFFFFF" };
    case "G":
      return { backgroundColor: "#FF8333", textColor: "#FFFFFF" };
    case "H":
      return { backgroundColor: "#33FF83", textColor: "#000000" };
    case "I":
      return { backgroundColor: "#8333FF", textColor: "#FFFFFF" };
    case "J":
      return { backgroundColor: "#FF3383", textColor: "#FFFFFF" };
    case "K":
      return { backgroundColor: "#83FF33", textColor: "#000000" };
    case "L":
      return { backgroundColor: "#3383FF", textColor: "#FFFFFF" };
    case "M":
      return { backgroundColor: "#FFB533", textColor: "#FFFFFF" };
    case "N":
      return { backgroundColor: "#33FFB5", textColor: "#000000" };
    case "O":
      return { backgroundColor: "#B533FF", textColor: "#FFFFFF" };
    case "P":
      return { backgroundColor: "#FF33B5", textColor: "#FFFFFF" };
    case "Q":
      return { backgroundColor: "#B5FF33", textColor: "#000000" };
    case "R":
      return { backgroundColor: "#33B5FF", textColor: "#FFFFFF" };
    case "S":
      return { backgroundColor: "#FF6633", textColor: "#FFFFFF" };
    case "T":
      return { backgroundColor: "#57FF33", textColor: "#000000" };
    case "U":
      return { backgroundColor: "#3357DD", textColor: "#FFFFFF" };
    case "V":
      return { backgroundColor: "#FF3355", textColor: "#FFFFFF" };
    case "W":
      return { backgroundColor: "#33FF99", textColor: "#000000" };
    case "X":
      return { backgroundColor: "#5733DD", textColor: "#FFFFFF" };
    case "Y":
      return { backgroundColor: "#FFA533", textColor: "#FFFFFF" };
    case "Z":
      return { backgroundColor: "#33FFFF", textColor: "#000000" };
    default:
      return { backgroundColor: "#106eaf", textColor: "#FFFFFF" };
  }
};
