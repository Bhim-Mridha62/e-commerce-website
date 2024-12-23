import useIsMobile from "@/utils/client/isMobile";
import { Phone, Mail } from "@/utils/client/svg-icon";
import Link from "next/link";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoCartOutline, IoHomeOutline } from "react-icons/io5";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { LuSend } from "react-icons/lu";
import { MdOutlineHeadsetMic } from "react-icons/md";
function Footer() {
  const SERVICE_PHONE = process.env.NEXT_PUBLIC_SERVICE_PHONE;
  const SERVICE_EMAIL = process.env.NEXT_PUBLIC_SERVICE_EMAIL;
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? (
        <div className="fixed bottom-0 z-[999] bg-theme-grey border-t border-theme-border w-full">
          <div className="flex justify-around">
            <div className="flex items-center flex-col text-xs py-1 border-l border-theme-border flex-grow hover:text-theme-red">
              <Link href={`/`}>
                <IoHomeOutline className="text-lg mx-auto" />
                <span>Home</span>
              </Link>
            </div>
            <div className="flex items-center flex-col text-xs py-1 border-l border-theme-border flex-grow hover:text-theme-red">
              <Link href={`/account`}>
                <FiUser className="text-lg mx-auto" />
                <span>Account</span>
              </Link>
            </div>
            <div className="flex items-center flex-col text-xs py-1 border-l border-theme-border flex-grow hover:text-theme-red">
              <Link href={`/order`}>
                <LiaShoppingBagSolid className="text-lg mx-auto" />
                <span>Order</span>
              </Link>
            </div>
            <div className="flex items-center flex-col text-xs py-1 border-l border-theme-border flex-grow hover:text-theme-red">
              <Link href={`/mywishlist`}>
                <IoMdHeartEmpty className="text-lg mx-auto" />
                <span>Wishlist</span>
              </Link>
            </div>
            <div className="flex items-center flex-col text-xs py-1 border-l border-theme-border flex-grow hover:text-theme-red">
              <Link href="/cart">
                <IoCartOutline className="text-lg mx-auto" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div
        className={`bg-theme-black text-theme-white ${
          isMobile ? "pt-10 pb-20" : "py-6"
        }`}
      >
        <div className="border-b px-4 border-theme-border pb-6 w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Exclusive Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Exclusive</h3>
            <p className="text-sm mb-4">Subscribe</p>
            <p className="text-sm mb-4">Get 10% off your first order</p>
            <div className="relative flex items-center rounded-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-[80%] p-2 pl-4 pr-10 text-white bg-theme-black rounded-md border-2 border-theme-grey"
              />
              <button className="absolute right-[20%] top-1/2 transform -translate-y-1/2 px-2 py-2 text-white rounded-md">
                <LuSend className="text-lg" />
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <p className="text-sm mb-2">
              <Link
                href="/contact-us"
                className="flex items-center hover:text-theme-red w-fit"
              >
                <MdOutlineHeadsetMic className="mr-2" />
                <span>Contact Us</span>
              </Link>
            </p>
            <p className="text-sm mb-2">
              <Link
                href="https://www.google.com/maps/search/?q=Kalimela,+Malkangiri,+Odisha,+India+764047"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:underline hover:text-theme-red w-fit"
              >
                <CiLocationOn className="mr-2 ml-[-2px] text-lg" />
                <span>Kalimela, Malkangiri, Odisha, India 764047</span>
              </Link>
            </p>
            <p className="text-sm mb-2">
              <Link
                href={`mailto:${SERVICE_EMAIL}`}
                className="flex items-center hover:text-theme-red w-fit"
              >
                <Mail className="mr-2" />
                {SERVICE_EMAIL}
              </Link>
            </p>
            <p className="text-sm">
              <Link
                href={`tel:+91${SERVICE_PHONE}`}
                className="flex items-center hover:text-theme-red w-fit"
              >
                <Phone className="mr-2" />
                {SERVICE_PHONE}
              </Link>
            </p>
          </div>

          {/* Account Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Account</h3>
            <ul>
              <li>
                <Link className="hover:text-theme-red" href="/account">
                  My Account
                </Link>
              </li>
              <li>
                <Link className="hover:text-theme-red" href="/sign-in">
                  Login{" "}
                </Link>{" "}
                /{" "}
                <Link className="hover:text-theme-red" href="/sign-up">
                  Register
                </Link>
              </li>
              <li>
                <Link className="hover:text-theme-red" href="/cart">
                  Cart
                </Link>
              </li>
              <li>
                <Link className="hover:text-theme-red" href="/mywishlist">
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4 text-sm">
          <p>
            &copy; {new Date().getFullYear()} SD Fashion Shop. All rights
            reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
