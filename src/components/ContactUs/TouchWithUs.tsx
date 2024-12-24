"use client";
import React, { memo } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import Link from "next/link";
const TouchWithUs = memo(() => {
  const SERVICE_PHONE = process.env.NEXT_PUBLIC_SERVICE_PHONE;
  const SERVICE_EMAIL = process.env.NEXT_PUBLIC_SERVICE_EMAIL;
  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-black">
      {/* <ToastContainer position="top-center" theme="light" /> */}
      <div className="contactdiv" data-aos="fade-right">
        <h3 className="text-2xl font-bold mb-4">Get In Touch With Us</h3>
        <div className="contactdiv1 flex items-center mb-4">
          <BiCurrentLocation className="mr-2" />
          <a href="" target="blank">
            Address
          </a>
        </div>
        <div className="contactdiv1 flex items-center mb-4">
          <BsFillTelephoneForwardFill className="mr-2" />
          <Link href="tel:11111111" target="blank">
            Call Us:+91 {SERVICE_PHONE}
          </Link>
        </div>
        <div className="contactdiv1 flex items-center mb-4">
          <MdEmail className="mr-2" />
          <a href={`mailto:${SERVICE_EMAIL}`} target="blank">
            {SERVICE_EMAIL}
          </a>
        </div>
        <div className="sociallink flex justify-center gap-3">
          <a href="" target="blank">
            <FaFacebookSquare className="mr-2 text-2xl" />
          </a>
          <a href="" target="blank">
            <AiFillTwitterCircle className="mr-2 text-2xl" />
          </a>
          <a href="" target="blank">
            <AiFillLinkedin className="mr-2 text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
});

export default TouchWithUs;
