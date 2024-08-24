import { UserProvider } from "@/context/authContext";
import dynamic from "next/dynamic";
import React from "react";
import Navbar from "./common/Navbar/Navbar";
import { Ichildren } from "@/types/types";
const Footer = dynamic(() => import("./common/Footer/Footer"));
const Layout: React.FC<Ichildren> = ({ children }) => {
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
