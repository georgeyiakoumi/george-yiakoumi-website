import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import NavItem from "../NavItem/NavItem";
import useBreakpoint from "../../../utils/useBreakpoint";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { getIcon } from "../../../utils/iconMapper";
import AboutIcon from "../../../assets/lottie/avatar.json";
import ProjectsIcon from "../../../assets/lottie/briefcase.json";
import DetailsIcon from "../../../assets/lottie/lightning.json";
import ContactIcon from "../../../assets/lottie/plane.json";
import { ReactComponent as GyLogo } from "../../../assets/logos/gy-logo.svg";
import "./Sidebar.scss";

const NAV_API_URL = "https://portfolio-cms-n9hb.onrender.com/api/navigation?populate=*";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [homePageUrl, setHomePageUrl] = useState(null);
  const [activeNavLabel, setActiveNavLabel] = useState(null);
  const [previousNavLabel, setPreviousNavLabel] = useState(null);
  const { isMobile, isMobileView, isTablet } = useBreakpoint();

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
    if (isMobileView) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    if (isOpen && isMobileView) {
      closeMenu();
    } else {
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

        <div className="sidebar-contents">
          <div className="sidebar-contents-container">
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