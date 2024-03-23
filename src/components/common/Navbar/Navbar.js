import SidebarContent from "@/components/Sidebar/SidebarContent";
import { Badge, Button, Drawer, Space } from "antd";
import Search from "antd/es/input/Search";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { TfiMenu } from "react-icons/tfi";
function Navbar() {
  const [visible, setVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      let sum = 0;
      for (const item of cart) {
        sum += item.count;
      }

      setCartCount(sum);
    }
  }, []);
  const opensidebar = () => {
    setVisible(!visible);
  };
  return (
    <>
      <div className="w-full sticky top-0 z-[999] justify-between items-center h-16 bg-slate-700 flex text-white px-10">
        <div onClick={() => router.push("/")} className="cursor-pointer">
          Name logo
        </div>
        {true && (
          <div>
            <ul className="flex gap-5">
              <li className="cursor-pointer" onClick={() => router.push("/allproduct")}>Add product</li>
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
          <ul className="flex items-center gap-5">
            <Link href="/login">Sign in/up</Link>
            <Link href={`/cart`}>
              <Badge
                count={cartCount}
                overflowCount={9}
                style={{ background: "green" }}
              >
                <RiShoppingCart2Fill className="text-3xl cursor-pointer" />
              </Badge>
            </Link>
            <TfiMenu onClick={opensidebar} className="cursor-pointer" />
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
        extra={<Space>Logo and name</Space>}
      >
        <div>
          <SidebarContent opensidebar={opensidebar} />
        </div>
      </Drawer>
    </>
  );
}

export default Navbar;
