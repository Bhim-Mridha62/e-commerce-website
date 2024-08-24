import connectDB from "@/database/db";
import User from "../../../Schemas/server/UserSchema";
import CreateToken from "../../../utils/server/SecretToken";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allow" });
  }
  const { emailOrPhone, otp } = req.body;
  try {
    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }
    if (otp != user.otp) {
      return res.status(422).json({ message: "Invalid OTP" });
    }
    const token = CreateToken(user._id);
    user.otpVerify = true;
    user.SecretToken = token;
    user.save();
    const sanitizedUser = {
      _id: user._id,
      name: user?.name,
      emailOrPhone: user.emailOrPhone,
      cart: user.cart,
      wishlist: user.wishlist,
      SecretToken: user.SecretToken,
    };
    res
      .status(201)
      .json({ message: "OTP Verified Successfully", user: sanitizedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
