import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  username: String,
  userImage: String,
  rating: Number,
  comment: String,
  postdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  thumbnail: String,
  images: [String],
  reviews: [reviewSchema],
});
export const Product = mongoose.model('Product', productSchema);