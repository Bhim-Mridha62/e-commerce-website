import React, { useState, useEffect } from "react";
function text() {
  const [combinedData, setCombinedData] = useState([]);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      console.log(scrollTop, clientHeight, scrollHeight, "scroll");
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("Reached end of scroll");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="h-[1000px] bg-red-500"></div>
    </div>
  );
}

export default text;
