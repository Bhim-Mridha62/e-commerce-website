// import faker from 'faker';
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  username: { type: String, default: "" },
  userId: { type: String, default: "" },
  userImage: { type: String, default: "" },
  rating: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  dislike: { type: Number, default: 0 },
  comment: { type: String, default: "" },
  postdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  brand: { type: String, default: "" },
  category: { type: String, default: "" },
  thumbnail: { type: String, default: "" },
  images: { type: [String], default: [] },
  reviews: { type: [reviewSchema], default: [] },
});
// export const Product = mongoose.model('Products', productSchema);
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
