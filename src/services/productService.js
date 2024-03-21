import { message } from "antd";
import axios from "axios";

export async function getProductById(id) {
    try {
        axios.get(`https://dummyjson.com/products/${id}`)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            message.error("Error al obtener el producto");
            console.log("Error fetching product:", error)
        })
      } catch (error) {
        console.error('Error fetching product:', error);
      }
}
