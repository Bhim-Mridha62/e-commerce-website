import { useUser } from "@/context/authContext";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";
import { CiLogout } from "react-icons/ci";
import { FaUserShield } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline, IoCreateOutline, IoHomeOutline } from "react-icons/io5";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { SlEarphonesAlt } from "react-icons/sl";

const AccountSection = () => {
  const { user, HandelLogout } = useUser();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href="/" className="flex items-center gap-2">
          <IoHomeOutline className="text-lg" />
          <span>Home</span>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/account" className="flex items-center gap-2">
          <FiUser className="text-lg" />
          <span>Manage My Account</span>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link href="/cart" className="flex items-center gap-2">
          <IoCartOutline className="text-lg" />
          <span>Cart</span>
        </Link>
      ),
    },
    {
      key: "4",
      label: (
        <Link href="/myorder" className="flex items-center gap-2">
          <LiaShoppingBagSolid className="text-lg" />
          <span>My Order</span>
        </Link>
      ),
    },
    {
      key: "5",
      label: (
        <Link href="/mywishlist" className="flex items-center gap-2">
          <IoMdHeartEmpty className="text-lg" />
          <span>My Wishlist</span>
        </Link>
      ),
    },
    {
      key: "6",
      label: (
        <Link href="/contact-us" className="flex items-center gap-2">
          <SlEarphonesAlt className="" />
          <span>Contact Us</span>
        </Link>
      ),
    },
    {
      key: "7",
      className: user ? "!hidden" : "flex",
      label: (
        <Link href="/sign-in" className="flex items-center gap-2">
          <FaUserShield />
          <span>Sign In</span>
        </Link>
      ),
    },
    {
      key: "8",
      className: user ? "!hidden" : "flex",
      label: (
        <Link href="/sign-up" className="flex items-center gap-2">
          <IoCreateOutline />
          <span>Sign Up</span>
        </Link>
      ),
    },
    {
      key: "9",
      className: user ? "flex" : "!hidden",
      label: (
        <div onClick={HandelLogout} className="flex items-center gap-2">
          <CiLogout className="text-lg" />
          <span>Logout</span>
        </div>
      ),
    },
  ];
  return (
    <Dropdown className="flex" menu={{ items }}>
      <FiUser
        // onClick={opensidebar}
        className="text-2xl msm:text-3xl cursor-pointer text-theme-white bg-theme-red rounded-full p-[6px]"
      />
    </Dropdown>
  );
};

export default AccountSection;
