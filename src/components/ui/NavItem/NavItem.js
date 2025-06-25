import PropTypes from "prop-types";
import React, { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import "./NavItem.scss";

const NavItem = ({
  to,
  label,
  lottieData,
  isActive,
  isMobileView,
  onClick,
  onBecomingInactive = false,
  hideLabel = false,
}) => {
  const lottieRef = useRef();
  const [justClicked, setJustClicked] = useState(false);

  const playHoverIn = () => {
    if (!isMobileView && !isActive) {
      lottieRef.current?.playSegments([0, 16], true);
    }
  };

  const playHoverOut = () => {
    if (!isMobileView && !isActive) {
      lottieRef.current?.playSegments([15, 30], true);
    }
  };

  const handleClick = () => {
    if (isMobileView) {
      setJustClicked(true);
      lottieRef.current?.playSegments([0, 16], true);

      setTimeout(() => {
        setJustClicked(false);
        onClick();
      }, 1000);
    } else {
      onClick();
    }
  };

  useEffect(() => {
    if (isActive && !justClicked) {
      lottieRef.current?.goToAndStop(15, true);
    }
  }, [isActive, justClicked]);

  useEffect(() => {
    if (onBecomingInactive && !isActive) {
      lottieRef.current?.playSegments([15, 30], true);
    }
  }, [onBecomingInactive, isActive]);

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={`nav-link${isActive ? " active" : ""}`}
      onMouseEnter={playHoverIn}
      onMouseLeave={playHoverOut}
    >
      <div className="hover-layer" aria-hidden="true" />
      {lottieData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={lottieData}
          loop={false}
          autoplay={false}
          className="icon"
        />
      )}
      {!hideLabel && <span className="nav-item-label">{label}</span>}
    </NavLink>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  lottieData: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  isMobileView: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onBecomingInactive: PropTypes.bool,
  hideLabel: PropTypes.bool,
};

export default NavItem;