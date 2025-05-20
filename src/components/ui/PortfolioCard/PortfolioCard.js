
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./PortfolioCard.scss";

const PortfolioCard = ({ slug, thumbnail, title, tags = [], routePrefix = "project" }) => {
  return (
    <Link to={`/${routePrefix}/${slug}`} className="portfolio-item-card-link">
      <div className="portfolio-item-card">
        {thumbnail ? (
          <img className="portfolio-item-thumb" src={thumbnail} alt={title} />
        ) : (
          <div className="portfolio-item-thumb-placeholder">No Image</div>
        )}

        <div className="portfolio-item">
          <h3>{title}</h3>
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

export default PortfolioCard;