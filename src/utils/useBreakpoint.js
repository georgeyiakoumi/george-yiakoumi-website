import { useEffect, useState } from "react";

const breakpoints = {
  mobile: 548,
  tablet: 1024,
};

// Helper function for SSR compatibility
// const getWindowWidth = () => (typeof window !== "undefined" ? window.innerWidth : 1024);

const useBreakpoint = () => {
  const [width, setWidth] = useState(null); // start as null so we know when ready

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    // Set initial width
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isReady = width !== null;
  const isMobile = isReady && width < breakpoints.mobile;
  const isTablet = isReady && width >= breakpoints.mobile && width < breakpoints.tablet;
  const isDesktop = isReady && width >= breakpoints.tablet;

  return { width, isMobile, isTablet, isDesktop, isReady };
};

export default useBreakpoint;
