import { useEffect, useState } from "react";

const breakpoints = {
  mobile: 548,
  mobileWide: 767,
  tablet: 1024,
};

const useBreakpoint = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024 // SSR-safe default
  );

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 0); // debounce resize
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = width < breakpoints.mobile;
  const isMobileWide = width >= breakpoints.mobile && width < breakpoints.tablet;
  const isTablet = width >= breakpoints.mobile && width < breakpoints.tablet;
  const isDesktop = width >= breakpoints.tablet;
  const isReady = typeof width === "number";

  return { width, isMobile, isMobileWide, isTablet, isDesktop, isReady };
};

export default useBreakpoint;
