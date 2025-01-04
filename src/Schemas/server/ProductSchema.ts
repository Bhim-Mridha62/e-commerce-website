import mongoose from "mongoose";

// Define the schema for product reviews
const reviewSchema = new mongoose.Schema({
  username: { type: String, default: "" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: "" },
  userImage: { type: String, default: "" },
  rating: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  comment: { type: String, default: "" },
  images: { type: [String], default: [] },
});

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
  reviews: { type: [reviewSchema], default: [] },
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
