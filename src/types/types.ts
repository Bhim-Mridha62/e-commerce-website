import React from "react";

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
export interface UserContextType {
  user: any; // Replace with specific user type if known
  // cartCountRef: RefObject<HTMLDivElement | undefined>;
  cartCountRef: React.MutableRefObject<(() => void) | null>;
  UpdateUser: () => void;
}
export interface AutoCompleteOptions {
  label: string;
  options: { label: string };
}
export interface IAutoComplete {
  value: string;
  label: string;
  category?: string;
  image?: string;
}
export interface IClassName {
  className?: string;
}
export interface Ichildren {
  children: React.ReactNode;
}
