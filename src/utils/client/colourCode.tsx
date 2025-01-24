export function GetOrderStatusColour(status: string) {
  let colour;
  let bgColour;
  if (status === "pending") {
    colour = "#fd7e14"; // Orange
    bgColour = "#fff4e6"; // Light Orange
  } else if (status === "Delivered" || status === "Done") {
    colour = "#10b981"; // Green
    bgColour = "#e6fffa"; // Light Green
  } else if (status === "cancelled") {
    colour = "#ef4444"; // Red
    bgColour = "#ffe6e6"; // Light Red
  } else if (status === "returned") {
    colour = "#6f42c1"; // Purple
    bgColour = "#f3e8ff"; // Light Purple
  } else {
    colour = "#6b7280"; // Gray
    bgColour = "#f3f4f6"; // Light Gray
  }
  return { colour, bgColour };
}
export const getRatingColourText = (rating: number) => {
  let text = "";
  let colorCode = "";

  switch (rating) {
    case 1:
      text = "Poor";
      colorCode = "#f52833"; // Bright red
      break;
    case 2:
      text = "Average";
      colorCode = "#ec803d"; // Vibrant orange
      break;
    case 3:
      text = "Good";
      colorCode = "#f4b743"; // Warm yellow
      break;
    case 4:
      text = "Very Good";
      colorCode = "#0cd171"; // Bright green
      break;
    case 5:
      text = "Excellent";
      colorCode = "#06a759"; // Vibrant teal
      break;
    default:
      text = "Good";
      colorCode = "#f4b743"; // Neutral gray
  }

  return { text, colorCode };
};

export const getLetterColors = (letter: string) => {
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
