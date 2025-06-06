import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import NavItem from "../NavItem/NavItem";
import useBreakpoint from "../../../utils/useBreakpoint";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { getIcon } from "../../../utils/iconMapper";
import { motion } from "framer-motion";
import TextLink from "../TextLink/TextLink";
import AboutIcon from "../../../assets/lottie/avatar.json";
import ProjectsIcon from "../../../assets/lottie/briefcase.json";
import UiLabIcon from "../../../assets/lottie/lightning.json";
import ContactIcon from "../../../assets/lottie/plane.json";
import { ReactComponent as GyLogo } from "../../../assets/logos/gy-logo.svg";
import { ReactComponent as Info } from "../../../assets/icons/info.svg";
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
  const { isMobile, isMobileView } = useBreakpoint();

  const handleSetActive = (label) => {
  if (label !== activeNavLabel) {
    setPreviousNavLabel(activeNavLabel); // store previous
    setActiveNavLabel(label);
  }
};

  const lottieIcons = {
    about: AboutIcon,
    projects: ProjectsIcon,
    uilab: UiLabIcon,
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

  const detailsLink = navLinks.find(link => link.url === "details");
  const filteredNavLinks = navLinks.filter(link => link.url !== "details");

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
            <button className="hamburger-button" onClick={toggleMenu} aria-label="Toggle Menu">
              <motion.div className="line" animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
              <motion.div className="line" animate={isOpen ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.3 }} />
              <motion.div className="line" animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
            </button>
          </div>
        </div>

        <div className="sidebar-contents">
          <div className="sidebar-contents-container">
            <nav>
              <ul>
                {filteredNavLinks.map(({ id, label, url, iconName }) => {
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
                          handleSetActive(label); // ✅ Set the active label
                        }}
                        onBecomingInactive={label === previousNavLabel}
                      />
                    </li>
                  );
                })}
              </ul>
            </nav>

            <footer>
              <small>&copy;{new Date().getFullYear()} George Yiakoumi</small>
              <div className="social-links">
                {socialLinks.map(({ id, name, url, ariaLabel }) => {
                  const Icon = getIcon(name);
                  return (
                    <motion.a
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={ariaLabel}
                      className="social-link"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {Icon && <Icon className="social-icon" />}
                    </motion.a>
                  );
                })}
              </div>

              {detailsLink && (
                <TextLink
                  onClick={closeMenu}
                  to={`/${detailsLink.url}`}
                  label={detailsLink.label}
                  iconLeft={Info}
                  size="tiny"
                />
              )}
            </footer>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;