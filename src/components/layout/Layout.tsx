import { UserProvider } from "@/context/authContext";
import dynamic from "next/dynamic";
import React from "react";
import Navbar from "./Navbar/Navbar";
import { Ichildren } from "@/types/types";
const Footer = dynamic(() => import("./Footer/Footer"), { ssr: false });
const Layout: React.FC<Ichildren> = ({ children }) => {
  return (
    <div>
      <UserProvider>
        <Navbar />
        <main className="min-h-[50vh]">{children}</main>
        <Footer />
      </UserProvider>
    </div>
  );
};

export default Layout;
