import mongoose from "mongoose";

const StatusSchema = new mongoose.Schema(
  {
    Order_Received: {
      status: { type: String, default: "Done" },
      time: { type: String, default: "" },
    },
    Order_Shipped: {
      status: { type: String, default: "pending" },
      time: { type: String, default: "" },
    },
    Order_Picked: {
      status: { type: String, default: "pending" },
      time: { type: String, default: "" },
    },
    Out_for_delivery: {
      status: { type: String, default: "pending" },
      time: { type: String, default: "" },
    },
    Order_Delivered: {
      status: { type: String, default: "pending" },
      time: { type: String, default: "" },
    },
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true },
  title: { type: String, required: true },
  size: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  address: {
    village: { type: String, required: true },
    alternatePhone: { type: String },
    buildingAddress: { type: String, required: true },
    district: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    state: { type: String, required: true },
  },
  StatusOrder: { type: StatusSchema, required: true },
  OrderDate: { type: Date, default: Date.now },
  OrderStatus: { type: String, default: "pending" },
  cancelReason: { type: String, default: "" },
  DeliveryDate: { type: String, default: "" },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
