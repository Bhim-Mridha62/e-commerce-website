import { NextApiResponse } from "next";

export const handleError = (
  error: any,
  res: NextApiResponse,
  status: number,
  message: string
) => {
  // Check All error message
  console.log(error, "handleError");

  // Catch validation errors
  if (error?.name === "ValidationError") {
    let message = "";
    for (const key in error.errors) {
      message += error?.errors[key]?.message + " ";
      console.log(error?.errors[key]?.message);
    }

    return res.status(400).json({
      error: "Validation Error",
      message: message,
    });
  }

  // Catch CastError when object id invalid
  if (error?.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID",
      message: "Please provide a valid ID",
    });
  }

  // Handle generic errors
  return res.status(status).json({
    error: error,
    message: message,
  });
};
