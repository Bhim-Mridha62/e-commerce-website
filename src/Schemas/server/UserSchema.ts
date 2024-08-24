import mongoose from "mongoose";
const CartItemSchema = new mongoose.Schema({
  productID: {
    type: String,
    require: false,
  },
  Size: {
    type: String,
    require: false,
    default: "",
  },
  quantity: {
    type: Number,
    default: 1,
    require: false,
  },
});
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  emailOrPhone: {
    type: String,
    required: true,
    unique: true,
  },
  profile_pic_path: {
    type: String,
    required: false,
    unique: true,
  },
  password: {
    type: String,

    required: true,
  },
  otp: {
    type: Number,
    required: false,
  },
  otpVerify: {
    type: Boolean,
    required: false,
  },
  SecretToken: {
    type: String,
    required: false,
  },
  cart: [CartItemSchema],
  wishlist: [
    {
      productID: {
        type: String,
        require: false,
      },
    },
  ],
});
// const User = mongoose.model("User", UserSchema);
export default mongoose.models.User || mongoose.model("User", UserSchema);
// export default User;
