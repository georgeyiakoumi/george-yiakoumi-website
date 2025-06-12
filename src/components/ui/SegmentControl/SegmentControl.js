import React, { useState, useRef, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import "./SegmentControl.scss";

const SegmentControl = ({
  options,
  selectedOption,
  setSelectedOption,
  size = "medium",
}) => {
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const updateHighlight = () => {
      const activeButton = containerRef.current?.querySelector(
        ".segment-option.active"
      );
      if (!activeButton) return;

      const rect = activeButton.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setHighlightStyle({
        left: rect.left - containerRect.left,
        width: rect.width,
      });
    };

    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [selectedOption]);

  return (
    <div className={`segment-control-wrapper size-${size}`}>
      <div className="segment-control" ref={containerRef}>
        <div className="segment-control-border"></div>
        <div
          className="segment-highlight"
          style={highlightStyle}
        />
        {options.map(({ value, label, icon }) => (
          <button
            key={value}
            className={`segment-option ${selectedOption === value ? "active" : ""}`}
            onClick={() => setSelectedOption(value)}
            aria-label={`Select ${label}`}
          >
            {icon && <span className="segment-icon">{icon}</span>}
            <span className="segment-label">{label}</span>
          </button>
        ))}
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