import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";
import "./Loading.scss";

const Loading = ({ title, description }) => {
  return (
    <section className="loading">
      <Spinner />
      <h3>{title}</h3>
      <p>{description}</p>
    </section>
  );
};

Loading.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Loading;