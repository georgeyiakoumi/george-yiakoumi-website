import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { pageTransition } from '../utils/gsapAnimations';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const mainRef = useRef(null);

  const [displayLocation, setDisplayLocation] = useState(location);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // When location changes, run exit, then update children
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname && !isTransitioning) {
      setIsTransitioning(true);

      pageTransition.exit(mainRef.current, () => {
        // Once fade-out is done, update children and run fade-in
        setDisplayLocation(location);
        setDisplayChildren(children); // This triggers rerender of new page
      });
    }
  }, [location, displayLocation, children, isTransitioning]);

  // When children update after exit, play fade-in
  useEffect(() => {
    if (displayLocation.pathname === location.pathname && mainRef.current) {
      pageTransition.enter(mainRef.current, () => {
        setIsTransitioning(false);
      });
    }
  }, [displayLocation, location.pathname]);

  return (
    <main ref={mainRef}>
      {displayChildren}
    </main>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;
