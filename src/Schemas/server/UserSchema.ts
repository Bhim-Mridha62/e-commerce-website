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
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emailOrPhone: {
      type: String,
      required: true,
      unique: true,
    },
    profile_pic: {
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
    address: {
      type: {
        village: { type: String, required: false, default: "" },
        alternatePhone: { type: String, default: "" },
        buildingAddress: { type: String, required: false, default: "" },
        district: { type: String, required: false, default: "" },
        name: { type: String, required: false, default: "" },
        phone: { type: String, required: false, default: "" },
        pincode: { type: String, required: false, default: "" },
        state: { type: String, required: false, default: "" },
      },
      default: {}, // Default the entire address object to an empty object
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
  },
  {
    timestamps: true,
  }
);
// const User = mongoose.model("User", UserSchema);
export default mongoose.models.User || mongoose.model("User", UserSchema);
// export default User;
