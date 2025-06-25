import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./SegmentControl.scss";

const SegmentControl = ({ options, selectedOption, setSelectedOption }) => {
  const containerRef = useRef(null);
  const activeButtonRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const activeButton = activeButtonRef.current;

    if (container && activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      const containerWidth = container.offsetWidth;

      const leftPercent = (offsetLeft / containerWidth) * 100;
      const rightPercent = 100 - ((offsetLeft + offsetWidth) / containerWidth) * 100;

      container.style.clipPath = `inset(0 ${rightPercent.toFixed()}% 0 ${leftPercent.toFixed()}% round 1000px)`;
    }
  }, [selectedOption]);

  return (
    <div className="segment-wrapper">
      <ul className="segment-list">
        {options.map(({ value, label, icon }) => (
          <li key={value}>
            <button
              ref={selectedOption === value ? activeButtonRef : null}
              className="segment-button"
              onClick={() => setSelectedOption(value)}
            >
              {icon && <span className="segment-icon">{icon}</span>}
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className="segment-overlay-shadow">
        <div
          className="segment-overlay-container"
          ref={containerRef}
          aria-hidden="true"
          role="presentation"
        >
          <ul className="segment-list segment-list-overlay">
            {options.map(({ value, label, icon }) => (
              <li key={value}>
                <button
                  className="segment-button segment-button-overlay"
                  tabIndex={-1}
                >
                  {icon && <span className="segment-icon">{icon}</span>}
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
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

SegmentControl.defaultProps = {
  size: "medium",
};

export default SegmentControl;