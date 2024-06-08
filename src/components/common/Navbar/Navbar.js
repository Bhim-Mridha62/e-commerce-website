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
import Image from "next/image";
import { useAuthData } from "@/service/Auth";
import { useUser } from "@/context/authContext";
const SidebarContent = dynamic(
  () => import("@/components/Sidebar/SidebarContent"),
  {
    loading: () => <Loading />,
  }
);
function Navbar() {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const router = useRouter();
  const { cartCountRef } = useUser();
  const {GetCartCount} = useAuthData();
  // const CertCount = JSON.parse(localStorage.getItem("User")).cart.length || 0;
  // const Mobile = isMobile();
  useEffect(() => {
    UpdateCartCount()
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("User")) || "";
      setUser(user);
    }
  }, []);
  const opensidebar = () => {
    setVisible(!visible);
  };
  const HandeLogin = () => {
    if (user) {
      localStorage?.clear();
      window?.location?.reload();
    } else {
      router.push("/login");
    }
  };
  const UpdateCartCount = async () => {
    try {
        const res = await GetCartCount();
        if (res?.status === 200) {
          setCartLength(res?.data?.data)
        }
    } catch (error) {
        console.error(error);
    }
};

  useEffect(() => {
    cartCountRef.current = UpdateCartCount;
  }, [cartCountRef]);
  console.log(user, "user");
  return (
    <>
      <div className="w-full sticky top-0 z-[999] justify-between items-center h-16 bg-slate-700 flex text-white p-1 md:px-10">
        <div className="flex items-center gap-2">
          <div onClick={() => router.push("/")} className="cursor-pointer">
            <Image src="/logo.png" alt="logo" height={40} width={100} />
          </div>
          {/* {Mobile ? (
          <IoSearchSharp />
        ) : ( */}
          <Input
            placeholder="input search text"
            // enterButton="Search"
            // size="small"
            // loading={false}
          />
        </div>
        <div>
          <ul className="flex items-center gap-1 md:gap-5">
            <span onClick={HandeLogin} className="cursor-pointer">
              {user ? "Logout" : "Login"}
            </span>
            <Link href={`/cart`}>
              <Badge
                count={cartLength}
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
        extra={<Image src="/logo.png" alt="logo" height={20} width={20} />}
      >
        <div>
          <SidebarContent opensidebar={opensidebar} />
        </div>
      </Drawer>
    </>
  );
}

export default Navbar;
