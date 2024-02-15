import React from 'react'
import { RiShoppingCart2Fill } from "react-icons/ri";
import { TfiMenu } from "react-icons/tfi";
function Navbar() {
  return (
    <div className='w-full justify-between items-center h-16 bg-slate-800 flex text-white px-10'>
        <div>Name logo</div>
        {true &&<div>
                <ul className='flex gap-5'>
                    <li>Add product</li>
                    <li>All product</li>
                </ul>
            </div>}
        <div>
        <ul className='flex items-center text-3xl gap-5'>
                    <li><RiShoppingCart2Fill /></li>
                    <li><TfiMenu /></li>
                </ul>
        </div>
    </div>
  )
}

export default Navbar