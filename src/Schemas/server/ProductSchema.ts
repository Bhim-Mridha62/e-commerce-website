import mongoose from "mongoose";

// Define the schema for product reviews
const reviewSchema = new mongoose.Schema({
  username: { type: String, default: "" }, // The name of the user who wrote the review
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: "" }, // The ID of the user who wrote the review
  userImage: { type: String, default: "" }, // The profile image of the user
  rating: { type: Number, default: 0 }, // The rating given by the user
  like: { type: Number, default: 0 }, // The number of likes the review received
  dislike: { type: Number, default: 0 }, // The number of dislikes the review received
  comment: { type: String, default: "" }, // The comment text of the review
  images: { type: [String], default: [] }, // Any images attached to the review
  postdAt: { type: Date, default: Date.now },
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
