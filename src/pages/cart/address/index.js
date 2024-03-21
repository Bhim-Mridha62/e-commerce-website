import { useRouter } from "next/router";
import React from "react";

function index() {
  const router = useRouter();
  const { productId } = router.query;
  console.log(productId,"address page");
  return <div>address</div>;
}

export default index;
