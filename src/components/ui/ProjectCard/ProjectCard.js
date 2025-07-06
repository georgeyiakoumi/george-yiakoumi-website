import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./ProjectCard.scss";

const ProjectCard = ({ slug, thumbnail, title, routePrefix = "project", description }) => {
  return (
    <Link to={`/${routePrefix}/${slug}`} className="project-item-card-link">
      <div className="project-item-card">
        {thumbnail ? (
          <img 
            className="project-item-thumb" 
            src={thumbnail} 
            alt={title} 
            width={400}
            height={128}
            loading="lazy"
          />
        ) : (
          <div className="project-item-thumb-placeholder">No Image</div>
        )}

        <div className="project-item-content">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
};

ProjectCard.propTypes = {
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  routePrefix: PropTypes.string,
};

export default ProjectCard;