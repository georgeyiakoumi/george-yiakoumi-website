import PropTypes from "prop-types";
import "./Badge.scss";
import { ReactComponent as CheckCircle } from "../../../assets/icons/check-circle.svg";

const Badge = ({ 
  label, 
  size, 
  tone, 
  icon: Icon,
 }) => {

  return (
    <div className={`badge ${size} ${tone} `} >
        {Icon && <Icon />}
        <span>{label}</span>
    </div>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["medium", "small"]),
  tone: PropTypes.oneOf(["brand", "neutral", "information", "success", "warning", "error"]),
  icon: PropTypes.elementType
};

Badge.defaultProps = {
  size: "small",
  tone: "success",
  label: "Free",
  icon: CheckCircle
};

export default Badge;