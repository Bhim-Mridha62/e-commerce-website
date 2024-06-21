import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  productID: { type: String, require: true },
  quantity: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
  },
  image: {
    type: String,
  },
  size: {
    type: String,
  },
  price: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  OrderStatus: {
    type: String,
    default: "pending",
  },
  OrderDate: {
    type: Date,
    default: () => {
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000;
      return new Date(now.getTime() + istOffset);
    },
  },
  DeliveryDate: {
    type: Date,
  },
});
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
