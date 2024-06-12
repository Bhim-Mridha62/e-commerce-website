import { Phone,Mail } from "@/utils/client/svg-icon";
import Image from "next/image";
import Link from "next/link";
import React from "react";
function Footer() {
  return (
    <>
      <div className=" footer   bg-slate-700  text-white pb-2  w-full h-[auto] text-base ">
        <div className="md:text-start text-left py-[5%] px-[4%] flex flex-col  md:flex-row justify-center md:justify-around align-middle Msm:gap-5 msm:gap-3">
          <div className="flex flex-col gap-1   ">
            <span>
              <Link href="tel:+7655883526">
                <Phone className="inline mr-2" />
                7655883526
              </Link>
            </span>
            <span>
              <Link href="mailto:bhimmridha62@gmail.com">
                <Mail className="inline mr-2" />
                bhimmridha62@gmail.com
              </Link>{" "}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span>
              <Link href="/" >
                Home
              </Link>
            </span>
            <span>
              <Link
                href="/login"
              >
                Sign In{" "}
              </Link>
            </span>
            <span>
              <Link
                href="/login"
              >
                Create Account
              </Link>
            </span>
            <span>
              <Link
                href="/contact-us"
              >
                Contact Us
              </Link>
            </span>
          </div>

          <div
            className= "justify-start flex h-max"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
