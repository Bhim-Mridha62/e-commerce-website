import mongoose, { Document, Schema } from "mongoose";
export interface IProductReview extends Document {
  user_id: mongoose.Types.ObjectId; // Reference to the User collection
  product_id: mongoose.Types.ObjectId; // Reference to the Product collection
  rating: number; // Rating for the product
  like: number; // Count of likes
  comment: string; // User's comment
  images: string[]; // Array of image URLs
  createdAt: Date; // Date of creation
}
const ProductReviewSchema = new Schema<IProductReview>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required."],
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required."],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required."],
      min: [1, "Rating must be at least 1."],
      max: [5, "Rating cannot exceed 5."],
    },
    like: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
      default: "",
      trim: true,
      minlength: [3, "Comment must be at least 3 characters long."],
      maxlength: [300, "Comment cannot exceed 300 characters."],
    },
    images: {
      type: [String],
      default: [],
      validate: {
        validator: (value: string[]) => {
          return value.length <= 5;
        },
        message: "You can only upload up to 5 images.",
      },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);
export default mongoose.models.ProductReview ||
  mongoose.model("ProductReview", ProductReviewSchema);
