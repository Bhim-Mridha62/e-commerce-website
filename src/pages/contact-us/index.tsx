import React from "react";
// import Contact from "@/components/ContactUs/contact";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading/Loading";
import SEO from "@/components/common/seo";
const Contact = dynamic(() => import("@/components/ContactUs/contact"), {
  loading: () => <Loading />,
});
function Contactus() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with us for any inquiries or assistance."
        url="contact-us"
      />
      <div>
        <Contact />
      </div>
    </>
  );
}

export default Contactus;
