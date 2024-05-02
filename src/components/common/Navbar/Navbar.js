import SidebarContent from "@/components/Sidebar/SidebarContent";
import { Badge, Button, Drawer, Modal, Space } from "antd";
import Search from "antd/es/input/Search";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { TfiMenu } from "react-icons/tfi";
import isMobile from "@/utils/client/isMobile";
import { IoSearchSharp } from "react-icons/io5";
function Navbar() {
  const [visible, setVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();
  const Mobile = isMobile();
  // const isMobile = window.innerWidth <= 768;
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        setResult(eval(expression).toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setExpression("");
      setResult("");
    } else {
      setExpression((prev) => prev + value);
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "400px",
      maxHeight: "80%",
      overflowY: "auto",
      borderRadius: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
  };
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
  console.log(Mobile, "isMobile");
  return (
    <>
      <div className="w-full sticky top-0 z-[999] justify-between items-center h-16 bg-slate-700 flex text-white p-1 md:px-10">
        <div className="flex gap-2">

        <div onClick={() => router.push("/")} className="cursor-pointer">
          Name logo
        </div>
        {Mobile ? (
          <IoSearchSharp />
        ) : (
          <Search
            placeholder="input search text"
            // enterButton="Search"
            // size="small"
            loading={false}
          />
        )}
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
            <div className="text-2xl msm:text-3xl">
            </div>
          </div>
        )}
        <div>
        <ul className="flex items-center gap-5">

        <Link href="/login">Sign in/up</Link>
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
