import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { HiShoppingBag } from "react-icons/hi2";
import { FaCartArrowDown, FaRegCircleUser } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdContactSupport } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useUser } from "@/context/authContext";

const SidebarContent = ({ opensidebar }: { opensidebar: () => void }) => {
  const { user } = useUser();

  const handleLogout = () => {
    localStorage?.clear();
    window?.location?.reload();
  };
  return (
    <div>
      <ul className="list-none text-black">
        <li onClick={opensidebar} className="mb-4 text-lg cursor-pointer">
          <Link href={`/category`}>
            <span>
              <BiCategory className="inline mr-3 text-3xl" />
            </span>{" "}
            All Categories
          </Link>
        </li>
        <hr className="my-2" />
        <li onClick={opensidebar} className="mb-4 text-lg cursor-pointer">
          <Link href={`/myorder`}>
            <span>
              <HiShoppingBag className="inline mr-3 text-3xl" />
            </span>{" "}
            My Order
          </Link>
        </li>
        <hr className="my-2" />
        <li onClick={opensidebar} className="mb-4 text-lg cursor-pointer">
          <Link href={`/cart`}>
            <span>
              <FaCartArrowDown className="inline mr-3 text-3xl" />
            </span>
            My Cart
          </Link>
        </li>
        <hr className="my-2" />
        <li onClick={opensidebar} className="mb-4 text-lg cursor-pointer">
          <Link href={`/mywishlist`}>
            <span>
              <IoMdHeartEmpty className="inline mr-3 text-3xl" />
            </span>{" "}
            My Wishlist
          </Link>
        </li>
        <hr className="my-2" />
        <li onClick={opensidebar} className="mb-4 text-lg cursor-pointer">
          <Link href={`/account`}>
            <span>
              <FaRegCircleUser className="inline mr-3 text-3xl" />
            </span>{" "}
            My Account
          </Link>
        </li>
        <hr className="my-2" />
        <li onClick={opensidebar} className="mb-4 text-lg cursor-pointer">
          <Link href={`/contact-us`}>
            <span>
              <MdContactSupport className="inline mr-3 text-3xl" />
            </span>{" "}
            Contact Us
          </Link>
        </li>
        {user && (
          <>
            <hr className="my-2" />
            <li
              onClick={() => {
                opensidebar();
                handleLogout();
              }}
              className="mb-4 text-lg cursor-pointer"
            >
              <span>
                <FiLogOut className="inline mr-3 text-3xl" />
              </span>{" "}
              Logout
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default SidebarContent;
