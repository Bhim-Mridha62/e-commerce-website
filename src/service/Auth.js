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
  } else if (res?.status == 409 || res?.status == 422) {
    message.error(res?.data?.message);
  }
};
const Apimethod = async (url, method, body, auth) => {
  console.log(url, method, body, auth, "url, method, body, auth");
  console.log(Cookie(), "Cookie()");
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
export const HandelverifyOTP = (data) => {
  return Apimethod("/api/auth/verify", "post", data, true);
};
const LoginUser = async (loginUser) => {
  return Apimethod("/api/auth/Sign-in", "post", loginUser, true);
};
const AddToCart = async (productId) => {
  return Apimethod("/api/cart", "post", { productId }, false);
};
const FetchProductDetail = async (id) => {
  return Apimethod(`/api/product/ProductDetails?id=${id}`, "get", {}, true);
};
export const useAuthData = () => ({
  HandelSignUp,
  HandelverifyOTP,
  LoginUser,
  AddToCart,
  FetchProductDetail,
});
