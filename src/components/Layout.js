import dynamic from "next/dynamic";
import React from "react";
// import Navbar from "./common/Navbar/Navbar";
// import Footer from "./common/Footer/Footer";
const Navbar = dynamic(() => import('./common/Navbar/Navbar'));
const Footer = dynamic(() => import('./common/Footer/Footer'))
import { FaCalculator } from "react-icons/fa6";
function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <main className="min-h-80">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
