import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name: String
  });
  
  export const Category = mongoose.model('Category', categorySchema);
  