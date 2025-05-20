import PropTypes from "prop-types";
import "./CheckBox.scss";
import { ReactComponent as CheckIcon } from "../../../assets/icons/check.svg";
import { ReactComponent as IndeterminateIcon } from "../../../assets/icons/minus.svg";

const CheckBox = ({
  checkedType,
  size,
  state,
  valid,
  label,
  onChange,
  children
}) => {
  const getIcon = () => {
    if (checkedType === "Selected") return <CheckIcon />;
    if (checkedType === "Indeterminate") return <IndeterminateIcon />;
    return null;
  };

  return (
    <label className={`checkbox ${size.toLowerCase()} ${state.toLowerCase()} ${valid ? "" : "invalid"} ${checkedType === "Selected" ? "selected" : ""}`}>
      <span className="checkbox-box">{getIcon()}</span>
      {label && <span className="checkbox-label">{children}</span>}
      <input
        type="checkbox"
        checked={checkedType === "Selected"}
        onChange={onChange}
        aria-checked={checkedType === "Indeterminate" ? "mixed" : checkedType === "Selected"}
      />
    </label>
  );
};

CheckBox.propTypes = {
  checkedType: PropTypes.oneOf(["Unselected", "Selected", "Indeterminate"]),
  size: PropTypes.oneOf(["Large", "Small"]),
  state: PropTypes.oneOf(["Default", "Hover", "Pressed", "Focused", "Disabled"]),
  valid: PropTypes.bool,
  label: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node
};

CheckBox.defaultProps = {
  size: "Small",
  state: "Default",
  valid: true,
  label: true,
  onChange: () => {}
};

export default CheckBox;