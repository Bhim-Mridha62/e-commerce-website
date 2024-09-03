import connectDB from "@/database/db";
import { NextApiRequest, NextApiResponse } from "next";
import verifyUser from "./middleware/verifyUser";
import User from "@/Schemas/server/UserSchema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { method } = req;

  switch (method) {
    case "GET":
      return verifyUser(getProfile)(req, res);
    case "POST":
      return verifyUser(postProfile)(req, res);
    case "PUT":
      return verifyUser(putProfile)(req, res);
    default:
      res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
async function getProfile(req: any, res: NextApiResponse) {
  const { userId } = req;
  try {
    if (!userId) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const user = await User.findById(userId).select(
      "-password -SecretToken -__v -otpVerify -otp"
    );
    res.status(200).json(user);
  } catch (error) {}
}
async function postProfile() {}
async function putProfile() {}
