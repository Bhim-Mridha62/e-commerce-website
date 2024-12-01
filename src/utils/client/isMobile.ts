import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen width is smaller than 768px
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check on mount
    checkIfMobile();

    // Add event listener to handle screen resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []); // Empty dependency array ensures this effect runs only once

  return isMobile;
};

export default useIsMobile;
