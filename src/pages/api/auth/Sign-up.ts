import bcrypt from "bcrypt";
import User from "../../../Schemas/server/UserSchema";
import { sendOTPByEmail } from "../../../utils/server/emailUtils";
import connectDB from "@/database/db";
import { NextApiRequest, NextApiResponse } from "next";
// Make sure the path to User model is correct based on your project structure

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, emailOrPhone, password } = req.body;
  try {
    const existingUser = await User.findOne({ emailOrPhone });
    if (existingUser?.otpVerify) {
      return res.status(409).json({ message: "User already exists" });
    } else if (!emailOrPhone.includes("@")) {
      return res.status(400).json({ message: "Please enter a valid email" });
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000);
      sendOTPByEmail(emailOrPhone, otp);
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        emailOrPhone,
        password: hashedPassword,
        name,
        otp,
        otpVerify: false,
      });
      newUser.save();
      res.status(201).json({ message: "Please verify your OTP." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
