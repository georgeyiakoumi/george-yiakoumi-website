import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion, LayoutGroup } from "framer-motion";
import "./SegmentControl.scss";

const SegmentControl = ({ options, selectedOption, setSelectedOption, size = "medium" }) => {
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
  const updateHighlight = () => {
    const activeButton = containerRef.current?.querySelector(".segment-option.active");
    if (!activeButton) return;

    const rect = activeButton.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    if (rect.width && containerRect.width) {
      setHighlightStyle({
        left: rect.left - containerRect.left,
        width: rect.width,
      });
    }
  };

  
  const animationFrame = requestAnimationFrame(() => {
  
    setTimeout(updateHighlight, 10);
  });

  
  window.addEventListener("resize", updateHighlight);

  return () => {
    cancelAnimationFrame(animationFrame);
    window.removeEventListener("resize", updateHighlight);
  };
}, [selectedOption]);


  return (
    <div className={`segment-control-wrapper size-${size}`}>
      <div className="segment-control" ref={containerRef}>
        <div className="segment-control-border"></div>
        <LayoutGroup>
          <motion.div
            className="segment-highlight"
            layout
            animate={highlightStyle}
            transition={{ type: "ease", stiffness: 500, damping: 30 }}
          />
          {options.map(({ value, label, icon }) => (
            <motion.button
              key={value}
              className={`segment-option ${selectedOption === value ? "active" : ""}`}
              onClick={() => setSelectedOption(value)}
              aria-label={`Select ${label}`}
              layout
              transition={{ type: "ease", stiffness: 500, damping: 30 }}
            >
              {icon && <span className="segment-icon">{icon}</span>}
              <span className="segment-label">{label}</span>
            </motion.button>
          ))}
        </LayoutGroup>
      </div>
    </div>
  );
};

SegmentControl.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.element,
    })
  ).isRequired,
  selectedOption: PropTypes.string.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["small", "medium"]),
};

export default SegmentControl;