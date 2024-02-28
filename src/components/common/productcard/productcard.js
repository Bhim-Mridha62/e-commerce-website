import React from 'react';
import { Rate } from 'antd'; 
import { BsCurrencyRupee } from 'react-icons/bs';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import stylehome from './ProductCard.module.css'; 
import { calculateDiscountedPrice } from '@/utils/discountUtils';
import { useRouter } from 'next/router';
const ProductCard = ({ product}) => {
    const router = useRouter();
    const Productdetails = (id) => {
        console.log(id, "id");
        router.push(`/${id}`);
      };
  return (
    <div onClick={() => Productdetails(product.id)} className={stylehome.Productshow}>
      <img className={stylehome.ProductshowImg} src={product.thumbnail} alt="Image here" />
      <p className={stylehome.productTitle}>{product.title}</p>
      <p className={stylehome.ratingText}>
        <Rate allowHalf disabled value={product.rating} />
        <span>{product.rating}</span>
      </p>
      <p className='inline font-bold text-sm'>
        <span className='text-black'>
          <BsCurrencyRupee className='inline text-black'/>
          {calculateDiscountedPrice(product.price, product.discountPercentage)}
        </span>
        <del className='text-black'>
          <BsCurrencyRupee className='inline text-black'/>
          {product.price}
        </del>
        <span className='text-[#26a541]'>{Math.round(product.discountPercentage)}%OFF</span>
      </p>
      <div className={stylehome.buyandadddiv}>
        <button style={{ background: 'rgb(235 154 101)' }} onClick={() => buynowbutton({ product, count: 1 })}>Buy now</button>
        <button onClick={() => HandelAddtoCart(product)} className={stylehome.Productaddbutton}>
          Add to <RiShoppingCart2Fill />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
