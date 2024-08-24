import bcrypt from "bcrypt";
import User from "../../../Schemas/server/UserSchema";
import CreateToken from "../../../utils/server/SecretToken";
import connectDB from "@/database/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  const { emailOrPhone, password } = req.body;
  try {
    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "invalid Password" });
    }
    const jwtToken = CreateToken(user._id);
    user.SecretToken = jwtToken;
    const sanitizedUser = {
      _id: user._id,
      name: user.name,
      emailOrPhone: user.emailOrPhone,
      cart: user.cart,
      wishlist: user.wishlist,
      SecretToken: user.SecretToken,
    };
    await user.save();
    res.status(201).json({ message: "Sign sucessfully", user: sanitizedUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error occurred" });
  }
}
