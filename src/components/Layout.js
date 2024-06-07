import { UserProvider } from "@/context/authContext";
import dynamic from "next/dynamic";
import React from "react";
const Navbar = dynamic(() => import("./common/Navbar/Navbar"));
const Footer = dynamic(() => import("./common/Footer/Footer"));
const Layout = ({ children }) => {
  return (
    <div>
      <UserProvider>
        <Navbar />
        <main className="min-h-64">{children}</main>
        <Footer />
      </UserProvider>
    </div>
  );
};

export default Layout;
