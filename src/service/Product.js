import axios from "@/utils/client/axios";
export const GetAllProduct = async (skip,limit) => {
  console.log(skip,limit, "function");
  const data = await axios.get(`/api/product/GetProduct?skip=${skip}&limit=${limit}`)
  return data;
};
