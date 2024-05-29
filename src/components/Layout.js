import dynamic from "next/dynamic";
import React from "react";
// import { CartProvider } from "@/context/authContext";
const Navbar = dynamic(() => import("./common/Navbar/Navbar"));
const Footer = dynamic(() => import("./common/Footer/Footer"));
const Layout = ({ children }) => {
  return (
    <div>
      {/* <CartProvider> */}
        <Navbar />
        <main className="min-h-80">{children}</main>
        <Footer />
      {/* </CartProvider> */}
    </div>
  );
};

export default Layout;
