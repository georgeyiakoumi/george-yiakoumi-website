import { useEffect, useState } from "react";

const breakpoints = {
  mobile: 548,
  mobileWide: 767,
  tablet: 1024,
};

const useBreakpoint = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 0);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = width < 548;
  const isTablet = width >= 548 && width < 1024;
  const isDesktop = width >= 1024;
  const isMobileView = isMobile || isTablet; // 👈 includes both mobile + tablet
  const isReady = typeof width === "number";

  return { width, isMobile, isTablet, isDesktop, isMobileView, isReady };

};

export default useBreakpoint;
