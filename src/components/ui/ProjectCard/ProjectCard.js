
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import useBreakpoint from "../../../utils/useBreakpoint";
import useIntersectionObserver from "../../../utils/useIntersectionObserver";
import { getToolIcon } from "../../../utils/toolsMapper";
import "./ProjectCard.scss";

const ProjectCard = ({ slug, thumbnail, title, routePrefix = "project", description, viewMode, tools = [] }) => {
  const descRef = useRef(null);
  const contentRef = useRef(null);
  const thumbRef = useRef(null);
  const initialContentHeight = useRef(null);
  const { isDesktop } = useBreakpoint();
  const { ref: intersectionRef, hasIntersected } = useIntersectionObserver({
    rootMargin: '100px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (viewMode === 'grid' && isDesktop) {
      // Set initial states only for grid view on desktop
      gsap.set(descRef.current, { 
        height: 0,
        opacity: 0,
        y: 0
      });

      // Store the initial height of the content area
      gsap.set(contentRef.current, { height: "auto" });
      initialContentHeight.current = contentRef.current.offsetHeight;
      
      gsap.set(contentRef.current, { 
        height: initialContentHeight.current
      });
    } else {
      // Reset styles for other view modes or non-desktop
      gsap.set(descRef.current, { 
        height: "auto",
        opacity: 1,
        y: 0 
      });
      
      gsap.set(contentRef.current, { 
        height: "100%"
      });
    }
  }, [viewMode, isDesktop]);

  const handleMouseEnter = () => {
    if (viewMode === 'grid' && isDesktop) {
      // Kill any existing animations
      gsap.killTweensOf(descRef.current);
      gsap.killTweensOf(contentRef.current);
      gsap.killTweensOf(thumbRef.current);
      
      gsap.to(thumbRef.current, {
        scale: 1.5,
        rotation: 5,
        filter: "blur(.25rem)",
        duration: 0.4,
        ease: "power2.out"
      });
      
      gsap.to(contentRef.current, {
        height: "100%",
        duration: 0.4,
        ease: "power2.out"
      });
      
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
      gsap.killTweensOf(contentRef.current);
      gsap.killTweensOf(thumbRef.current);
      
      gsap.to(thumbRef.current, {
        scale: 1,
        rotation: 0,
        filter: "blur(0px)",
        duration: 0.3,
        delay: 0.05,
        ease: "power2.inOut"
      });
      
      gsap.to(descRef.current, {
        height: 0,
        opacity: 0,
        y: 0,
        duration: 0.3,
        delay: 0.05,
        ease: "power2.inOut"
      });
      
      gsap.to(contentRef.current, {
        height: initialContentHeight.current,
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
          ref={(node) => {
            thumbRef.current = node;
            intersectionRef.current = node;
          }}
          className="project-item-thumb"
          role="img"
          aria-label={title}
          style={{ 
            backgroundImage: hasIntersected ? `url(${thumbnail})` : 'none',
            backgroundColor: hasIntersected ? 'transparent' : '#f0f0f0'
          }}
        />

        <div ref={contentRef} className="project-item-content">
          <h2>{title}</h2>
          <p ref={descRef}>{description}</p>

          {tools.length > 0 && (
          <div className="project-item-tools">
            {tools.map((tool, index) => {
              const ToolIcon = getToolIcon(tool.Slug);
              if (!ToolIcon) {
                console.warn(`Icon not found for tool: ${tool.Name} (${tool.Slug})`);
                return null;
              }
              return (
                <div key={index} className="tool-icon" title={tool.Name}>
                  <ToolIcon className="tool-svg" />
                </div>
              );
            })}
          </div>
        )}
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
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Slug: PropTypes.string.isRequired,
    })
  ),
};

export default ProjectCard;