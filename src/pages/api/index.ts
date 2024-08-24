import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../database/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectDB();
      res.status(200).json({ message: "This is a GET request" });
    } catch (error: any) {
      res.status(500).json({
        message: "Error connecting to the database",
        error: error.message,
      });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
