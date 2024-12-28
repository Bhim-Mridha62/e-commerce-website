import mongoose from "mongoose";

// Define the schema for product reviews
export const Review_Schema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
    required: [true, "Username is required"],
  },
  userId: {
    type: String,
    default: "",
    required: [true, "User ID is required"],
  },
  userImage: { type: String, default: "" },
  rating: {
    type: Number,
    default: 0,
    required: [true, "Rating is required"],
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot exceed 5"],
  },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  comment: {
    type: String,
    default: "",
    required: [true, "Comment is required"],
  },
  images: { type: [String], default: [] },
  postdAt: { type: Date, default: Date.now },
});
// mongoose.model("Review", Review_Schema);
const productSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  Originalprice: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  brand: { type: String, default: "" },
  category: { type: String, default: "" },
  thumbnail: { type: String, default: "" },
  images: { type: [String], default: [] },
  reviews: { type: [Review_Schema], default: [] },
  gender: { type: String, default: "" },
  color: { type: String, default: "" },
  fabric: { type: String, default: "" },
  sizes: {
    S: { type: Number, default: 0 },
    M: { type: Number, default: 0 },
    L: { type: Number, default: 0 },
    XL: { type: Number, default: 0 },
    "2XL": { type: Number, default: 0 },
    "3XL": { type: Number, default: 0 },
  },
});
// export const Product = mongoose.model('Products', productSchema);
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
