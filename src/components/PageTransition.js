import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { pageTransition } from '../utils/gsapAnimations';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const mainRef = useRef(null);
  const prevLocationRef = useRef(location.pathname);

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = prevLocationRef.current;
    
    if (currentPath !== prevPath) {
      // Animate page entrance
      pageTransition.enter(mainRef.current);
      prevLocationRef.current = currentPath;
    }
  }, [location.pathname]);

  return (
    <main ref={mainRef}>
      {children}
    </main>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;