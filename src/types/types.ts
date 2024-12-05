import React from "react";

export interface SignInFormValues {
  email?: string;
  password?: string;
}
export interface Product {
  _id: string;
  title: string;
  price: number;
  discountPercentage: number;
  rating?: number;
  thumbnail: string;
  quantity: number;
  Size: string;
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
  HandelLogout: () => void;
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
  onClick?: () => void;
}
export interface Ichildren {
  children: React.ReactNode;
}
export interface IReview {
  comment?: string;
  dislike?: boolean;
  images?: string[];
  like?: number;
  postdAt?: string;
  rating?: number;
  userId?: string;
  userImage?: string;
  username?: string;
  _id?: string;
}
export interface IProduct {
  gender?: string;
  color?: string;
  fabric?: string;
  _id: string;
  title?: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
  Originalprice?: number;
}
export interface IOrder {
  _id?: string;
  productID?: string;
  quantity?: number;
  title?: string;
  size?: string;
  image?: string;
  price?: number;
  address?: IAddress;
  StatusOrder?: {
    Order_Received: {
      status?: string;
      time?: string;
    };
    Order_Shipped?: {
      status?: string;
      time?: string;
    };
    Order_Picked: {
      status?: string;
      time?: string;
    };
    Out_for_delivery?: {
      status?: string;
      time?: string;
    };
    Order_Delivered: {
      status?: string;
      time?: string;
    };
  };
  OrderStatus: string;
  cancelReason?: string;
  DeliveryDate?: string;
  OrderDate: string;
}
export interface IContactUs {
  phone: string;
  message: string;
  email: string;
  name: string;
  address: string;
}
export interface IAddress {
  village?: string;
  alternatePhone?: string;
  buildingAddress?: string;
  district?: string;
  name?: string;
  phone?: string;
  pincode?: string;
  state?: string;
}
export interface IProfileCartWishlist {
  productID: string;
  Size: string;
  quantity: number;
  _id: string;
  thumbnail: string;
  price: number;
  title: string;
}
export interface INamePicId {
  name_pic_id: NamePicId;
  updateProfile: any;
  setName_pic_id: React.Dispatch<
    React.SetStateAction<{
      name: string;
      profile_pic: string;
      _id: string;
    }>
  >;
}
export interface NamePicId {
  name: string;
  profile_pic: string;
  _id: string;
}
export interface Icategory {
  _id?: string;
  image?: string;
  category: string;
}
export interface ICarousel {
  imageUrl: string;
  _id: string;
  title: string;
  description: string;
}
export interface IHomePageSectionHeading {
  className: string;
  bottomHeading: string;
  topHeading: string;
}
