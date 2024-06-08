import Axios from "@/utils/client/axios";
import { message } from "antd";
const Cookie = () => {
  let auth = window.localStorage.getItem("Authorization");
  return {
    Authorization: auth && `Bearer ${auth ? auth : ""}`,
  };
};
const Errors = (res) => {
  console.log(res, "Errors");
  if (res?.status == 401) {
    window.localStorage.clear();
  } else if (res?.status == 409 || res?.status == 422 || res?.status == 404) {
    message.error(res?.data?.message);
  }
};
const Apimethod = async (url, method, body, auth) => {
  console.log(url, method, body, auth, "url, method, body, auth");
  const data = auth
    ? await Axios.request({
        url: url ? url : "",
        method: method ? method : "post",
        data: body ? body : "",
      }).catch(({ response }) => {
        Errors(response);
      })
    : await Axios.request({
        url: url ? url : "",
        method: method ? method : "post",
        data: body ? body : "",
        headers: Cookie(),
      }).catch(({ response }) => {
        Errors(response);
      });
  console.log(data, "useAuthData");
  return data;
};
const HandelSignUp = (data) => {
  return Apimethod("/api/auth/Sign-up", "post", data, true);
};
const PostResetPassword = (data) => {
  return Apimethod("/api/auth/reset-password", "post", data, true);
};
export const HandelverifyOTP = (data) => {
  return Apimethod("/api/auth/verify", "post", data, true);
};
const LoginUser = async (loginUser) => {
  return Apimethod("/api/auth/Sign-in", "post", loginUser, true);
};
const AddToCart = async (data) => {
  return Apimethod("/api/cart", "post", data, false);
};
const AllCartData = async () => {
  return Apimethod("/api/cart", "get", {}, false);
};
const RemoveCartData = async (id) => {
  return Apimethod("/api/cart", "DELETE", id, false);
};
const FetchProductDetail = async (id) => {
  return Apimethod(`/api/product/ProductDetails?id=${id}`, "get", {}, true);
};
const Getwishlist = async () => {
  return Apimethod(`api/wishlist`, "get", {}, false);
};
const Deletewishlist = async (data) => {
  return Apimethod(`api/wishlist`, "DELETE", data, false);
};
const Postwishlist = async (data) => {
  return Apimethod(`api/wishlist`, "post", data, false);
};
const GetCartCount = async () => {
  return Apimethod(`/api/cart/cartCount`, "get", {}, false);
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
  GetCartCount
});
