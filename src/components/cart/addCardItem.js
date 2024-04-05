import Image from "next/image";
import React from "react";
function AddCardItem(props) {
  const {
    id,
    price,
    thumbnail,
    discountPercentage,
    stock,
    category,
    brand,
    title,
    description,
  } = props.cartItems;
  return (
    <div className="border-b mt-4">
      <div className="flex gap-2">
        <div>
          <Image src={thumbnail} width={200} height={100} />
        </div>
        <div>
          <p>
            <strong className="mr-2">Category:</strong>
            {category}
          </p>
          <p>
            <strong className="mr-2">{brand}:</strong>
            {title}
          </p>
        </div>
        <div>
          
        </div>
      </div>
      <div>
        {" "}
        <strong className="mr-2">Description:</strong> {description}
      </div>
    </div>
  );
}

export default AddCardItem;
