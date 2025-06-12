import React, { useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import Lottie from "lottie-react";
import animationData from "../../../assets/lottie/ThemeToggle.json";
import "./ThemeToggle.scss";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLight = theme === "light";
  const lottieRef = useRef();

  useEffect(() => {
    if (!lottieRef.current) return;

    if (isLight) {
      lottieRef.current.playSegments([15, 30], true); // moon → sun
    } else {
      lottieRef.current.playSegments([0, 15], true); // sun → moon
    }
  }, [isLight]);

  return (
    <div className="theme-toggle-container">
      <button
        className={`theme-toggle ${isLight ? "" : "dark"}`}
        onClick={toggleTheme}
        aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      >
        <div className={`theme-toggle-border ${isLight ? "" : "dark"}`} />
        <div className={`toggle-slider ${isLight ? "" : "dark"}`}>
          <div className="toggle-icon">
            <Lottie
              lottieRef={lottieRef}
              animationData={animationData}
              loop={false}
              autoplay={false}
              style={{ width: 24, height: 24 }}
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;