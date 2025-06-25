import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as Close } from '../../../assets/icons/close.svg';
import Button from "../Button/Button";
import "./Modal.scss";

const Modal = ({ isOpen, onClose, title, children, buttonLabel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className="modal-wrapper">
            <motion.div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
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
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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