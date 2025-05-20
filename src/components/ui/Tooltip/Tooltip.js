import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Tooltip.scss";

const Tooltip = ({ heading, text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="tooltip-box">
          {heading && <small>{heading}</small>}
          {Array.isArray(text) ? (
            <ul>
              {text.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{text}</p>
          )}
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  heading: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]).isRequired,
  children: PropTypes.node.isRequired,
};

export default Tooltip;