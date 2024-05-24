import dynamic from "next/dynamic";
import React from "react";
const Navbar = dynamic(() => import("./common/Navbar/Navbar"));
const Footer = dynamic(() => import("./common/Footer/Footer"));
const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-80">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
