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
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(FirstName, LastName, email, password);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      
    }
    
      // res.status(400).json({ message: "Email already exists" });
      // Generate OTP (6-digit random number)
      sendOTPByEmail(email, otp);
      
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      FirstName,
      LastName,
      otp
    });
    await newUser.save();
    res.status(201).json({ message: "Create Account successfully" });
  } catch (error) {
    console.log(error, "create user");
    res.status(500).json({ message: "Server error" });
  }
}
