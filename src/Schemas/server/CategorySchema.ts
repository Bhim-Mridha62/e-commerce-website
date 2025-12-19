import { all_category } from "@/shared/category";
import { ICategory } from "@/types/backentType";
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema<ICategory>(
  {
    category: { type: String, required: true, trim: true, enum: all_category },
    image: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

export default Category;
