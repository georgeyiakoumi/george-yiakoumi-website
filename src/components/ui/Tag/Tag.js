import React, { useState } from "react";
import PropTypes from "prop-types";
import { ReactComponent as CheckIcon } from "../../../assets/icons/check.svg";
import { ReactComponent as CloseIcon } from "../../../assets/icons/close.svg";
import "./Tag.scss";

const Tag = ({ label, selectable, selected, onClick, size, state, dismissible }) => {
  const [hovering, setHovering] = useState(false);

  const handleClick = (e) => {
    if (selectable || dismissible) {
      e.stopPropagation();
      onClick(label);
    }
  };

  return (
    <div
      className={`tag ${size} ${state} ${selected ? "selected" : ""} ${selectable ? "selectable" : ""} ${dismissible ? "dismissible" : ""}`}
      onClick={handleClick}
      onMouseEnter={() => selectable && selected && setHovering(true)}
      onMouseLeave={() => selectable && selected && setHovering(false)}
      role={selectable || dismissible ? "button" : "presentation"}
      tabIndex={selectable || dismissible ? 0 : -1}
    >
      {selectable && selected && !dismissible && (
        hovering ? <CloseIcon className="selected-icon" /> : <CheckIcon className="selected-icon" />
      )}
      
      <span className="tag-label">{label}</span>

      {dismissible && (
         <CloseIcon />
      )}
    </div>
  );
};

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  selectable: PropTypes.bool,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(["medium", "small"]),
  state: PropTypes.oneOf(["default", "hover", "press", "focus", "disabled"]),
  dismissible: PropTypes.bool,
};

Tag.defaultProps = {
  selectable: false,
  selected: false,
  onClick: () => {},
  size: "medium",
  state: "default",
  dismissible: false,
};

export default Tag;