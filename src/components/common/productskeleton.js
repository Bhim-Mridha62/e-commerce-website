import { Badge, Card, Rate, Skeleton } from 'antd'
import React from 'react'
import stylehome from './productskeleton.module.css'
import { BsCurrencyRupee } from 'react-icons/bs';
import { RiShoppingCart2Fill } from 'react-icons/ri';
function Productskeleton() {
  return (
    <div className={`p-0 ${stylehome.Productshow}`}>
             <Skeleton.Image className={stylehome.ProductshowImg} active={true}/>
             <Skeleton.Input active={true} size={25} block={false} />
             <Skeleton.Input active={true} size={25} block={false} />
             <Skeleton.Input active={true} size={25} block={false} />
             <div className={`${stylehome.buyandadddiv}`}>
             <Skeleton.Button active={true} size={25} block={false} />
             <Skeleton.Button active={true} size={25} block={false} />
</div>           
<Badge count={80} overflowCount={9}>

                      <RiShoppingCart2Fill />
                    </Badge>
  {/* <div  className={stylehome.Productshow}>
            <p className={stylehome.productTitle}>{}</p>
            <p> <Rate allowHalf defaultValue={1} /><span className={stylehome.ratingText}>{}</span></p>
            <p className='inline'>
              <span><BsCurrencyRupee className='inline'/>{}</span>
              <del><BsCurrencyRupee className='inline'/>{}</del>
            <span className='text-[#26a541]'> {}%OFF</span>
           </p>
            <div className={stylehome.buyandadddiv}>
              <button style={{ background: 'rgb(235 154 101)' }} onClick={() => buynowbutton({ product, count: 1 })}>Buy now</button>
              <button onClick={() => HandelAddtoCart(product)} className={stylehome.Productaddbutton}>Add to cart</button>
            </div>
          </div> */}

  </div>
  )
}

export default Productskeleton;