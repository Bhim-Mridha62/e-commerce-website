import React, { useState } from "react";
// import Contact from "@/components/ContactUs/contact";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
const Contact = dynamic(() => import("@/components/ContactUs/contact"), {
  loading:()=> <Loading />,
});
function Contactus() {
  return (
    <div>
      <Contact />
    </div>
  );
}

export default Contactus;
