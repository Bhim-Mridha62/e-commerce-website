import axios from '@/utils/client/axios'
export const GetAllProduct=async ()=>{
  const data=await axios.get('/api/product/GetAllProduct')
  return data;
 }