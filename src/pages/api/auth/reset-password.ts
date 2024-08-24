import connectDB from "@/database/db";
import User from "../../../Schemas/server/UserSchema";
import { sendOTPByEmail } from "../../../utils/server/emailUtils";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  try {
    const { emailOrPhone, otp, password } = req.body;
    const existingUser = await User.findOne({ emailOrPhone });
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist" });
    }
    if (otp) {
      if (otp == existingUser.otp) {
        existingUser.otpVerified = true;
        await existingUser.save();
        return res.status(200).json({ message: "OTP verified successfully" });
      } else {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    }
    if (password) {
      existingUser.password = await bcrypt.hash(password, 10);
      await existingUser.save();
      return res.status(200).json({ message: "Password changed successfully" });
    }
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    sendOTPByEmail(emailOrPhone, generatedOTP);
    existingUser.otp = generatedOTP;
    await existingUser.save();
    return res
      .status(200)
      .json({ message: "OTP sent. Please verify your OTP." });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
