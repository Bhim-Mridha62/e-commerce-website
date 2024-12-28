import { useUser } from "@/context/authContext";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo } from "react";
import { CiLogout } from "react-icons/ci";
import { FaUserShield } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline, IoCreateOutline, IoHomeOutline } from "react-icons/io5";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { SlEarphonesAlt } from "react-icons/sl";

const AccountSection = memo(() => {
  const { user, HandelLogout } = useUser();
  const { pathname } = useRouter();
  const menuData = [
    {
      key: "1",
      href: "/",
      icon: <IoHomeOutline className="text-lg" />,
      label: "Home",
    },
    {
      key: "2",
      href: "/account",
      icon: <FiUser className="text-lg" />,
      label: "Manage My Account",
    },
    {
      key: "3",
      href: "/cart",
      icon: <IoCartOutline className="text-lg" />,
      label: "Cart",
    },
    {
      key: "4",
      href: "/order",
      icon: <LiaShoppingBagSolid className="text-lg" />,
      label: "My Order",
    },
    {
      key: "5",
      href: "/mywishlist",
      icon: <IoMdHeartEmpty className="text-lg" />,
      label: "My Wishlist",
    },
    {
      key: "6",
      href: "/contact-us",
      icon: <SlEarphonesAlt />,
      label: "Contact Us",
    },
    {
      key: "7",
      href: "/sign-in",
      icon: <FaUserShield />,
      label: "Sign In",
      className: user ? "!hidden" : "flex",
    },
    {
      key: "8",
      href: "/sign-up",
      icon: <IoCreateOutline />,
      label: "Sign Up",
      className: user ? "!hidden" : "flex",
    },
  ];
  const logoutItem = {
    key: "9",
    label: (
      <div onClick={HandelLogout} className="flex items-center gap-2">
        <CiLogout className="text-lg" />
        <span>Logout</span>
      </div>
    ),
    className: user ? "flex" : "!hidden",
  };
  const items: MenuProps["items"] = [
    ...menuData.map(({ key, href, icon, label, className }) => ({
      key,
      className,
      label: (
        <Link
          href={href}
          className={`flex items-center gap-2 ${
            pathname === href ? "Active_Navbar_Menu" : ""
          }`}
        >
          {icon}
          <span>{label}</span>
        </Link>
      ),
    })),
    logoutItem, // Add logout item separately
  ];
  console.log(pathname);

  return (
    <Dropdown
      className="flex bg-black"
      overlayClassName="AccountSection-Dropdown"
      menu={{ items }}
    >
      <FiUser
        // onClick={opensidebar}
        className="text-2xl msm:text-3xl cursor-pointer text-theme-white bg-theme-red rounded-full p-[6px]"
      />
    </Dropdown>
  );
});

export default AccountSection;
