import SidebarContent from "@/components/Sidebar/SidebarContent";
import { Badge, Button, Drawer, Space } from "antd";
import Search from "antd/es/input/Search";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { TfiMenu } from "react-icons/tfi";
function Navbar() {
  const [visible, setVisible] =useState(false);
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      let sum = 0;
      for (const item of cart) {
        sum += item.count;
      }

      setCartCount(sum);
    }
  }, []);
  const opensidebar=()=>{
    setVisible(!visible)
  }
  return (
    <>
    <div className="w-full justify-between items-center h-16 bg-slate-700 flex text-black px-10">
      <div>Name logo</div>
      {false && (
        <div>
          <ul className="flex gap-5">
            <li>Add product</li>
            <li>All product</li>
          </ul>
        </div>
      )}
      <div>
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          loading={false}
        />
      </div>
      <div>
        <ul className="flex items-center text-3xl gap-5">
          <Link href={`/cart`}>
          <Badge count={cartCount} overflowCount={9} style={{ background: "green" }}>
            <RiShoppingCart2Fill className="text-3xl cursor-pointer"/>
          </Badge>
          </Link>
          <TfiMenu onClick={opensidebar} className="cursor-pointer"/>
        </ul>
      </div>
    </div>

      {/* open sidebar */}
      <Drawer
        title={`Drawer`}
        placement="right"
        size={370}
        onClose={opensidebar}
        open={visible}
        extra={
          <Space>
            Logo and name
          </Space>
        }
      >
       <div>
        <SidebarContent opensidebar={opensidebar}/>
       </div>
      </Drawer>
    </>
  );
}

export default Navbar;
