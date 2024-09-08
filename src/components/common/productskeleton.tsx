import { Skeleton } from "antd";
import React from "react";
import stylehome from "./productskeleton.module.css";
function Productskeleton() {
  return (
    <div className={`p-0 ${stylehome.Productshow}`}>
      <Skeleton.Image className={stylehome.ProductshowImg} active={true} />
      <Skeleton.Input active={true} size="default" block={false} />
      <Skeleton.Input active={true} size="default" block={false} />
      <Skeleton.Input active={true} size="default" block={false} />
      <div className={`${stylehome.buyandadddiv}`}>
        <Skeleton.Button active={true} size="default" block={false} />
        <Skeleton.Button active={true} size="default" block={false} />
      </div>
    </div>
  );
}

export default Productskeleton;
