import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import NavItem from "../NavItem/NavItem";
import useBreakpoint from "../../../utils/useBreakpoint";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { getIcon } from "../../../utils/iconMapper";
import { gsap } from "gsap";
import AboutIcon from "../../../assets/lottie/avatar.json";
import ProjectsIcon from "../../../assets/lottie/briefcase.json";
import DetailsIcon from "../../../assets/lottie/lightning.json";
import ContactIcon from "../../../assets/lottie/plane.json";
import { ReactComponent as GyLogo } from "../../../assets/logos/gy-logo.svg";
import { ReactComponent as CatIcon } from "../../../assets/images/arun-sleepypooka.svg";
import "./Sidebar.scss";

const NAV_API_URL = "https://portfolio-cms-n9hb.onrender.com/api/navigation?populate=*";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [homePageUrl, setHomePageUrl] = useState(null);
  const [activeNavLabel, setActiveNavLabel] = useState(null);
  const [previousNavLabel, setPreviousNavLabel] = useState(null);
  const { isMobile, isMobileView, isTablet } = useBreakpoint();
  
  const sidebarContentsRef = useRef(null);
  const sidebarContentsContainerRef = useRef(null);
  const catRef = useRef(null);
  const currentAnimationRef = useRef(null);

  const handleSetActive = (label) => {
    if (label !== activeNavLabel) {
      setPreviousNavLabel(activeNavLabel);
      setActiveNavLabel(label);
    }
  };

  const lottieIcons = {
    about: AboutIcon,
    projects: ProjectsIcon,
    details: DetailsIcon,
    contact: ContactIcon,
  };

  useEffect(() => {
    if (!isMobileView && isOpen) {
      setIsOpen(false);
    }
  }, [isMobileView, isOpen]);

  // Reset opacity when leaving mobile view
  useEffect(() => {
    if (!isMobile && sidebarContentsRef.current) {
      gsap.set(sidebarContentsRef.current, { opacity: 1 });
      gsap.set(sidebarContentsContainerRef.current, { x: "0%" });
      if (catRef.current) {
        gsap.set(catRef.current, { yPercent: 20, opacity: 0 });
      }
    }
  }, [isMobile]);

  // Set initial state on mount
  useEffect(() => {
    if (isMobile && sidebarContentsRef.current && sidebarContentsContainerRef.current) {
      gsap.set(sidebarContentsRef.current, { opacity: 0 });
      gsap.set(sidebarContentsContainerRef.current, { x: "-120%" });
      if (catRef.current) {
        gsap.set(catRef.current, {xPercent: 50, opacity: 0});
      }
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile && isOpen && !isClosing && !isAnimating) {
      // Kill any existing animation
      if (currentAnimationRef.current) {
        currentAnimationRef.current.kill();
      }
      
      setIsAnimating(true);
      
      // Animate in
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false);
          currentAnimationRef.current = null;
        }
      });
      
      currentAnimationRef.current = tl;
      
      tl.to(sidebarContentsRef.current, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut"
      })
      .to(sidebarContentsContainerRef.current, {
        x: "0%",
        duration: 0.2,
        ease: "power2.inOut"
      }, "-=0.1");
      
      if (catRef.current) {
        tl.to(catRef.current, {
          yPercent: -40,
          xPercent: 50,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)"
        }, "-=0.05");
      }
    }
  }, [isOpen, isMobile, isClosing, isAnimating]);

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const response = await fetch(NAV_API_URL);
        const data = await response.json();

        if (data?.data?.NavLinks) {
          setNavLinks(data.data.NavLinks);
          const homepageLink = data.data.NavLinks.find(link => link.isHomepage);
          setHomePageUrl(homepageLink ? homepageLink.url : null);
        }

        if (data?.data?.SocialLinks) {
          setSocialLinks(data.data.SocialLinks);
        }
      } catch (error) {
        console.error("Error fetching navigation:", error);
      }
    };

    fetchNavigation();
  }, []);

  const closeMenu = () => {
    if (isMobile && isOpen) {
      // Kill any existing animation
      if (currentAnimationRef.current) {
        currentAnimationRef.current.kill();
      }
      
      setIsClosing(true);
      setIsAnimating(true);
      
      const tl = gsap.timeline({
        onComplete: () => {
          setIsOpen(false);
          setIsClosing(false);
          setIsAnimating(false);
          currentAnimationRef.current = null;
        }
      });
      
      currentAnimationRef.current = tl;
      
      if (catRef.current) {
        tl.to(catRef.current, {
          yPercent: 0,
          opacity: 0,
          duration: 0.2,
          delay: 0.2,
          ease: "power2.inOut"
        });
      }
      
      tl.to(sidebarContentsContainerRef.current, {
        x: "-120%",
        duration: 0.2,
        ease: "power2.inOut"
      }, "-=0.1")
      .to(sidebarContentsRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.inOut"
      }, "-=0.1");
    } else if (!isMobileView) {
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    if (isOpen && isMobile) {
      // Always allow closing, even during animation
      closeMenu();
    } else if (!isAnimating) {
      // Only allow opening if not currently animating
      setIsOpen(true);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""} ${isClosing ? "closing" : ""}`}>
      <div className="sidebar-wrapper">
        <div className="mobile-header">
          <div className="theme-toggle-wrapper">
            <ThemeToggle />
          </div>
          {isMobile && (
            <Link to="/" className="brand-wordmark" onClick={closeMenu}>
              <GyLogo />
            </Link>
          )}
          <div className="hamburger-button-wrapper">
            <button
              className={`hamburger-button ${isOpen ? "open" : ""}`}
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                className="hamburger-icon"
              >
                <line className="line top" x1="3" y1="12" x2="21" y2="12" />
                <line className="line middle" x1="3" y1="12" x2="21" y2="12" />
                <line className="line bottom" x1="3" y1="12" x2="21" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="sidebar-contents" ref={sidebarContentsRef} onClick={closeMenu}>

        {isMobile && (
          <div className="cat-container">
            <CatIcon className="cat-icon" ref={catRef}/>
          </div>
        )}

          <div className="sidebar-contents-container" ref={sidebarContentsContainerRef} onClick={(e) => e.stopPropagation()}>
            <nav>
              <ul>
                {navLinks.map(({ id, label, url, iconName }) => {
                  const lottieData = lottieIcons[iconName];
                  const isActive = label === activeNavLabel;

                  return (
                    <li key={id}>
                      <NavItem
                        to={url === homePageUrl ? "/" : `/${url}`}
                        label={label}
                        lottieData={lottieData}
                        isActive={isActive}
                        isMobileView={isMobileView}
                        onClick={() => {
                          closeMenu();
                          handleSetActive(label);
                        }}
                        onBecomingInactive={label === previousNavLabel}
                        hideLabel={isTablet}
                      />
                    </li>
                  );
                })}
              </ul>
            </nav>

            <footer>
              <div className="social-links">
                {socialLinks.map(({ id, name, url, ariaLabel }) => {
                  const Icon = getIcon(name);
                  return (
                    <a
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ariaLabel}
                      className="social-link"
                    >
                      {Icon && <Icon className="social-icon" />}
                    </a>
                  );
                })}
              </div>

              <small>
                &copy;{new Date().getFullYear()}{" "}
                <span className="author">George Yiakoumi</span>
              </small>
            </footer>

          </div>
          
          
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;