import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './Button.scss';

function Button({
  label,
  size = 'medium',
  tone = 'brand',
  variant = 'primary',
  state = 'default',
  iconLeft: IconLeft,
  iconRight: IconRight,
  onClick = () => {},
  type = 'button',
  to = null,
}) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  return (
    <button
      className={`button size-${size} tone-${tone} variant-${variant} ${state}`}
      onClick={handleClick}
      disabled={state === 'disabled'}
      type={type}
    >
      {IconLeft && <IconLeft className="icon icon-left" />}
      {label && <span className="label">{label}</span>}
      {IconRight && <IconRight className="icon icon-right" />}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  tone: PropTypes.oneOf(['brand', 'neutral', 'destructive', 'inverse', 'white']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  state: PropTypes.oneOf(['default', 'hover', 'press', 'focus', 'disabled']),
  iconLeft: PropTypes.elementType,
  iconRight: PropTypes.elementType,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  to: PropTypes.string,
};

export default Button;