import { Document } from "mongoose";

export interface ISchemaWishlist {
  _id?: string;
  productID?: string;
}
export interface ICategory extends Document {
  category: string;
  image: string;
  createdAt: Date;
}
