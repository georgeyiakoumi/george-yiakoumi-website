import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./TextLink.scss";

const TextLink = ({
  to,
  label,
  iconLeft: IconLeft,
  iconRight: IconRight,
  size = "small",
  tone = "default",
  bold = false,
  underline = true,
  disabled = false,
  className = "",
  onClick,
}) => (
  <RouterLink
    to={disabled ? "#" : to}
    className={`text-link size-${size} tone-${tone} ${bold ? "weight-bold" : ""} ${underline ? "underline" : ""} ${disabled ? "disabled" : ""} ${className}`}
    aria-disabled={disabled}
    onClick={onClick}
  >
    {IconLeft && <IconLeft />}
    {label}
    {IconRight && <IconRight />}
  </RouterLink>
);

TextLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  iconLeft: PropTypes.elementType,
  iconRight: PropTypes.elementType,
  size: PropTypes.oneOf(["tiny", "small"]),
  tone: PropTypes.oneOf(["default", "neutral", "neutral-strong", "neutral-weak", "destructive", "inverse-strong", "inverse-weak"]),
  bold: PropTypes.bool,
  underline: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default TextLink;