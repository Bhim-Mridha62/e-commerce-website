import Navbar from "@/components/common/Navbar";
import { Html, Head, Main, NextScript } from "next/document";
import { Badge } from "antd";
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navbar/>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
