// import SidebarContent from "@/components/Sidebar/SidebarContent";
import { Badge, Drawer, Space, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { TfiMenu } from "react-icons/tfi";
import isMobile from "@/utils/client/isMobile";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const SidebarContent = dynamic(
  () => import("@/components/Sidebar/SidebarContent"),
  {
    loading: () => <Loading />,
  }
);
function Navbar() {
  const [visible, setVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const Mobile = isMobile();
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
      <div className="w-full sticky top-0 z-[999] justify-between items-center h-16 bg-slate-700 flex text-white p-1 md:px-10">
        <div className="flex items-center gap-2">
          <div onClick={() => router.push("/")} className="cursor-pointer">
            Namelogo
          </div>
          {/* {Mobile ? (
          <IoSearchSharp />
        ) : ( */}
          <Input
            placeholder="input search text"
            // enterButton="Search"
            // size="small"
            loading={false}
          />
          {/* )} */}
        </div>
        {false && (
          <div>
            <ul className="flex gap-5">
              <li
                className="cursor-pointer"
                onClick={() => router.push("/allproduct")}
              >
                Add product
              </li>
              <li>All product</li>
            </ul>
            <div className="text-2xl msm:text-3xl"></div>
          </div>
        )}
        <div>
          <ul className="flex items-center gap-1 md:gap-5">
            <Link href="/login" className="">
              Sign
            </Link>
            <Link href={`/cart`}>
              <Badge
                count={cartCount}
                overflowCount={9}
                style={{ background: "green" }}
              >
                <RiShoppingCart2Fill className="text-2xl msm:text-3xl text-white cursor-pointer" />
              </Badge>
            </Link>
            <TfiMenu
              onClick={opensidebar}
              className="text-2xl msm:text-3xl cursor-pointer"
            />
          </ul>
        </div>
      </div>
      {/* open sidebar */}
      <Drawer
        title={`Drawer`}
        placement="right"
        // size="small"
        width={isMobile ? 290 : 378}
        onClose={opensidebar}
        open={visible}
        extra={<Space className="text-black">Logo and name</Space>}
      >
        <div>
          <SidebarContent opensidebar={opensidebar} />
        </div>
      </Drawer>
    </>
  );
}

export default Navbar;
