
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import useBreakpoint from "../../../utils/useBreakpoint";
import "./ProjectCard.scss";

const ProjectCard = ({ slug, thumbnail, title, routePrefix = "project", description, viewMode }) => {
  const descRef = useRef(null);
  const { isDesktop } = useBreakpoint();

  useEffect(() => {
    if (viewMode === 'grid' && isDesktop) {
      // Set initial states only for grid view on desktop
      gsap.set(descRef.current, { 
        height: 0,
        opacity: 0,
        y: 0
      });
    } else {
      // Reset styles for other view modes or non-desktop
      gsap.set(descRef.current, { 
        height: "auto",
        opacity: 1,
        y: 0 
      });
    }
  }, [viewMode, isDesktop]);

  const handleMouseEnter = () => {
    if (viewMode === 'grid' && isDesktop) {
      // Kill any existing animations
      gsap.killTweensOf(descRef.current);
      
      gsap.to(descRef.current, {
        height: "auto",
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 0.1,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (viewMode === 'grid' && isDesktop) {
      // Kill any existing animations
      gsap.killTweensOf(descRef.current);
      
      gsap.to(descRef.current, {
        height: 0,
        opacity: 0,
        y: 0,
        duration: 0.3,
        delay: 0.05,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <Link
      to={`/${routePrefix}/${slug}`}
      className="project-item-card-link"
      aria-label={`View project: ${title}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className="project-item-card">
        <div
          className="project-item-thumb"
          role="img"
          aria-label={title}
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
        <div className="project-item-content">
          <h2>{title}</h2>
          <p ref={descRef}>{description}</p>
        </div>
      </article>
    </Link>
  );
};

ProjectCard.propTypes = {
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  routePrefix: PropTypes.string,
  viewMode: PropTypes.string,
};

export default ProjectCard;