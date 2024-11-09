import React from 'react';
import PropTypes from 'prop-types';
import './scss/CtaButton.scss';

function CtaButton({ label, size, variant, iconLeft, iconRight, onClick }) {
  return (
    <button
      className={`cta-button ${size} ${variant}`}
      onClick={onClick}
    >
      {iconLeft && <span className="icon left">{iconLeft}</span>}
      <span className="label">{label}</span>
      {iconRight && <span className="icon right">{iconRight}</span>}
    </button>
  );
}

CtaButton.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  onClick: PropTypes.func,
};

CtaButton.defaultProps = {
  size: 'medium',
  variant: 'primary',
  onClick: () => {},
};

export default CtaButton;
