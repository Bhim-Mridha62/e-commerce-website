export interface SignInFormValues {
  email?: string;
  password?: string;
}
export interface Product {
  _id?: string;
  title?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  thumbnail?: string;
  quantity?: number;
  Size?: string;
}

// Define ProductData type as an array of Product objects
export type ProductData = Product[];
export interface FilterOptions {
  size: string[];
  fabric: string[];
  color: string[];
  gender: string[];
  pattern: string[];
  discount: string[];
  occasion: string[];
}
