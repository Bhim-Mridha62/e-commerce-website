import { IContactUs } from "@/types/types";
import Axios from "@/utils/client/axios";
// import { message } from "antd";
const Cookie = () => {
  let auth = window.localStorage.getItem("Authorization");
  return {
    Authorization: auth && `Bearer ${auth ? auth : ""}`,
  };
};
// const Errors = (res: any) => {
//   if (res?.status == 401) {
//     window.localStorage.clear();
//   } else if (res?.status == 409 || res?.status == 422 || res?.status == 404) {
//     if (res?.data?.message !== "Products not found") {
//       message.error(res?.data?.message);
//     }
//   }
// };
const Apimethod = async (
  url: string,
  method: string,
  body: any,
  auth: boolean
) => {
  const data = auth
    ? await Axios.request({
        url: url ? url : "",
        method: method ? method : "post",
        data: body ? body : "",
      }).catch(({ response }) => {
        if (response?.status == 401) {
          window.localStorage.clear();
        }
        return response;
      })
    : await Axios.request({
        url: url ? url : "",
        method: method ? method : "post",
        data: body ? body : "",
        headers: Cookie(),
      }).catch(({ response }) => {
        if (response?.status == 401) {
          window.localStorage.clear();
        }
        return response;
      });
  return data;
};
const HandelSignUp = (data: any) => {
  return Apimethod("/api/auth/Sign-up", "post", data, true);
};
const PostResetPassword = (data: any) => {
  return Apimethod("/api/auth/reset-password", "post", data, true);
};
const PostCreateUser = (data: any) => {
  return Apimethod("/api/auth/Create-User", "post", data, true);
};
export const HandelverifyOTP = (data: any) => {
  return Apimethod("/api/auth/verify", "post", data, true);
};
const LoginUser = (loginUser: any) => {
  return Apimethod("/api/auth/Sign-in", "post", loginUser, true);
};
const AddToCart = (data: any) => {
  return Apimethod("/api/cart", "post", data, false);
};
const AllCartData = (isCount = 0) => {
  return Apimethod(`/api/cart?count=${isCount}`, "get", {}, false);
};
const RemoveCartData = (id: any) => {
  return Apimethod("/api/cart", "DELETE", id, false);
};
const FetchProductDetail = (id: any) => {
  return Apimethod(`/api/product/ProductDetails?id=${id}`, "get", {}, true);
};
const Getwishlist = () => {
  return Apimethod(`/api/wishlist`, "get", {}, false);
};
const Deletewishlist = (data: any) => {
  return Apimethod(`/api/wishlist`, "DELETE", data, false);
};
const Postwishlist = (data: any) => {
  return Apimethod(`/api/wishlist`, "post", data, false);
};
const getCategories = () => {
  return Apimethod(`/api/categories`, "get", {}, true);
};
const getcarousel = () => {
  return Apimethod(`/api/carousel`, "get", {}, true);
};
const postorder = (data: any) => {
  return Apimethod(`/api/order`, "POST", data, false);
};
const getorder = () => {
  return Apimethod(`/api/order`, "get", {}, false);
};
const putorder = (data: any) => {
  return Apimethod(`/api/order`, "put", data, false);
};
const getreviews = (data: any) => {
  return Apimethod(`/api/product/review?id=${data}`, "get", {}, true);
};
const postreviews = (data: any) => {
  return Apimethod(`/api/product/review`, "POST", data, false);
};
const putreviews = (data: any) => {
  return Apimethod(`/api/product/review`, "put", data, false);
};
const Deletereviews = (data: any) => {
  return Apimethod(`/api/product/review`, "DELETE", data, false);
};
const GetAllProduct = (skip: any, limit: any) => {
  return Apimethod(
    `/api/product/GetProduct?skip=${skip}&limit=${limit}`,
    "get",
    {},
    true
  );
};
const getSearch = (q: any) => {
  return Apimethod(`api/product/search?q=${q}`, "get", {}, true);
};
const postImage = async (data: any) => {
  return Apimethod(`/api/image`, "POST", data, false);
};
const deleteImage = async (url: string) => {
  return Apimethod(`/api/image?imageUrl=${url}`, "DELETE", {}, false);
};
const postContactUs = async (data: IContactUs) => {
  return Apimethod(`/api/contact-us`, "post", data, false);
};
const getProfile = async () => {
  return Apimethod(`/api/profile`, "get", {}, false);
};
const putProfile = async (data: any) => {
  return Apimethod(`/api/profile`, "put", data, false);
};
export const useAuthData = () => ({
  HandelSignUp,
  HandelverifyOTP,
  LoginUser,
  AddToCart,
  FetchProductDetail,
  AllCartData,
  RemoveCartData,
  Getwishlist,
  Deletewishlist,
  Postwishlist,
  PostResetPassword,
  PostCreateUser,
  getCategories,
  getcarousel,
  postorder,
  getorder,
  putorder,
  getreviews,
  postreviews,
  putreviews,
  Deletereviews,
  GetAllProduct,
  getSearch,
  postImage,
  deleteImage,
  postContactUs,
  getProfile,
  putProfile,
});
