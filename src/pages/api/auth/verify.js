import User from "../../../Schemas/server/UserSchema";
import CreateToken from "../../../utils/server/SecretToken";
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allow" });
  }
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Email not exists" }).end();
    }
    if (otp != user.otp) {
      res.status(422).json({ message: "Invalid OTP" }).end();
    }
    const token = CreateToken(user._id);
    user.otpVerify = true;
    user.SecretToken = token;
    user.save();
    const sanitizedUser = {
      _id: user._id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      email: user.email,
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
