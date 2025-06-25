import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./PortfolioCard.scss";

const PortfolioCard = ({ slug, thumbnail, title, routePrefix = "project" }) => {
  return (
    <Link to={`/${routePrefix}/${slug}`} className="portfolio-item-card-link">
      <div className="portfolio-item-card">
        {thumbnail ? (
          <img 
            className="portfolio-item-thumb" 
            src={thumbnail} 
            alt={title} 
            width={400}
            height={128}
            loading="lazy"
          />
        ) : (
          <div className="portfolio-item-thumb-placeholder">No Image</div>
        )}

        <div className="portfolio-item">
          <h2>{title}</h2>
          <Button
            variant="primary"
            label="Read more"
            size="medium"
            tone="brand"
            type="submit"
            onClick={() => {}}
          />
        </div>
      </div>
    </Link>
  );
};

PortfolioCard.propTypes = {
  slug: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  title: PropTypes.string.isRequired,
  routePrefix: PropTypes.string,
};

export default PortfolioCard;