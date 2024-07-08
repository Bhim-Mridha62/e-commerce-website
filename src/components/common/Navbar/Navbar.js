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
import { IoIosSearch } from "react-icons/io";
const SidebarContent = dynamic(
  () => import("@/components/Sidebar/SidebarContent"),
  {
    loading: () => <Loading />,
  }
);
function Navbar() {
  const [visible, setVisible] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [cartLength, setCartLength] = useState(0);
  const router = useRouter();
  const { cartCountRef, user } = useUser();
  const { GetCartCount } = useAuthData();
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [hide, setHide] = useState(false);
  const opensidebar = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    if (user) {
      UpdateCartCount();
    }
  }, [user]);

  const HandeLogin = () => {
    if (user) {
      localStorage?.clear();
      window?.location?.reload();
    } else {
      router.push("/sign-in");
    }
  };
  const UpdateCartCount = async () => {
    try {
      const res = await GetCartCount();
      if (res?.status === 200) {
        setCartLength(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cartCountRef.current = UpdateCartCount;
  }, [cartCountRef]);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      setHide(
        currentScrollPosition > lastScrollPosition && currentScrollPosition > 70
      );
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);
  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      let searchvalue = encodeURIComponent(inputValue);
      // let searchvalue = inputValue.trim().replace(/\s+/g, "+");
      if (searchvalue) {
        // router.push({ pathname: "/", query: { q: searchvalue } });
        console.log(searchvalue, "searchvalue");
      }
    }
  };
  return (
    <>
      <div
        className={` bg-slate-700 p-2 sticky top-0 z-[999] transition-transform duration-300 ease-in-out ${
          hide ? "-translate-y-[59%] lsm:translate-y-0" : "translate-y-0"
        }`}
      >
        <div
          className={`w-full sticky justify-between items-center h-auto flex text-white p-1 md:px-10 `}
        >
          <div className="flex items-center gap-2 lsm:w-[70%]">
            <div onClick={() => router.push("/")} className="cursor-pointer">
              <Image src="/logo.png" alt="logo" height={40} width={100} />
            </div>
            <Input
              value={inputValue}
              prefix={<IoIosSearch className="inline-flex text-xl" />}
              onChange={(e) => setinputValue(e.target.value)}
              placeholder="Search for products, brands and more"
              className="hidden lsm:flex"
              onKeyDown={handleSearchEnter}
            />
          </div>
          <div className="flex gap-1 md:gap-5">
            {user ? (
              <span onClick={HandeLogin} className="cursor-pointer">
                Logout
              </span>
            ) : (
              <span>
                Sign {""}
                <Link href="/sign-in">in/</Link>
                <Link href="/sign-up">up</Link>
              </span>
            )}
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
          </div>
        </div>
        <div className="">
          <Input
            value={inputValue}
            prefix={<IoIosSearch className="inline-flex text-xl" />}
            onChange={(e) => setinputValue(e.target.value)}
            placeholder="Search for products, brands and more"
            className="lsm:hidden"
            onKeyDown={handleSearchEnter}
          />
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
