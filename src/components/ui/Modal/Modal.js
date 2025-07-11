import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { modalAnimations } from "../../../utils/gsapAnimations";
import { ReactComponent as Close } from '../../../assets/icons/close.svg';
import Button from "../Button/Button";
import "./Modal.scss";

const Modal = ({ isOpen, onClose, title, children, buttonLabel }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      modalAnimations.enter(overlayRef.current, contentRef.current);
    } else if (isVisible) {
      modalAnimations.exit(overlayRef.current, contentRef.current, () => {
        setIsVisible(false);
      });
    }
  }, [isOpen, isVisible]);

  if (!isVisible) return null;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <div 
      ref={overlayRef}
      className="modal-overlay"
      onClick={onClose}
      onKeyDown={(e) => e.key === 'Escape' && onClose()}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div className="modal-wrapper">
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div
          ref={contentRef}
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          role="document"
        >
              <button className="close-button" onClick={onClose} aria-label="Close modal">
                <Close />
              </button>
              <h3>{title}</h3>
              <div className="modal-body">{children}</div>
              <Button
                variant="primary"
                label={buttonLabel}
                size="medium"
                tone="brand"
                type="submit"
                onClick={onClose}
              />
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  buttonLabel: PropTypes.string,
};

export default Modal;