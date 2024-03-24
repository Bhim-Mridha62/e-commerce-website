import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const Axios = axios.create({
  baseURL: publicRuntimeConfig.env.NEXT_PUBLIC_API_BASE_URl,
});
export default Axios;
