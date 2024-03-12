import User from "../models/UserSchema";
import CreateToken from "../utils/SecretToken";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allow" });
  }
  const { email, otp } = req.body;
  try {
    const user=await User.findOne({email});
    console.log(user,"sdfgh");
    if (!user) {
      res.status(400).json({ message: "Email already exists" }).end();
    }
    if (otp != user.otp) {
      res.status(422).json({ message: "Invalid OTP" }).end();
    }
    console.log(otp, user, "abcd");
    const token = CreateToken(user._id);
    user.otpVerify = true;
    user.SecretToken = token;
    user.save();
    console.log(token, "Token");
    res
      .status(201)
      .json({ message: "OTP Verified Successfully", Token: token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
