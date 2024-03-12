import bcrypt from "bcrypt";
import User from "../models/UserSchema";
import { sendOTPByEmail } from "../utils/emailUtils";
// Make sure the path to User model is correct based on your project structure

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { FirstName, LastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000);
      sendOTPByEmail(email, otp);
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({ email,
        password: hashedPassword,
        FirstName,
        LastName,
        otp,
        otpVerify:false
      });
       newUser.save();
      res.status(201).json({ message: "Please verify your OTP." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
