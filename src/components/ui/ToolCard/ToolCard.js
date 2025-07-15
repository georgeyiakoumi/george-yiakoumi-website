import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { createRoot } from "react-dom/client";
import Badge from "../Badge/Badge";
import { ReactComponent as CheckCircle } from "../../../assets/icons/check-circle.svg";
import { ReactComponent as AlertTriangle } from "../../../assets/icons/alert-triangle.svg";
import "./ToolCard.scss";

const ToolCard = ({ tool, svgIcon }) => {
  const cardRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !svgIcon) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(svgIcon, "image/svg+xml");
    const svgElement = doc.querySelector("svg");

    if (svgElement) {
      cardRef.current.innerHTML = "";
      cardRef.current.append(svgElement);

      const wrapper = document.createElement("div");
      wrapper.className = "tool-card-text";

      const header = document.createElement("header");
      header.innerHTML = `<h2>${tool.name}</h2>`;

      const badgeContainer = document.createElement("div");
      header.appendChild(badgeContainer);

      const description = document.createElement("p");
      description.textContent = tool.description;

      wrapper.appendChild(header);
      wrapper.appendChild(description);
      cardRef.current.append(wrapper);

      if (rootRef.current) {
        rootRef.current.unmount();
      }
      rootRef.current = createRoot(badgeContainer);
      rootRef.current.render(
        <Badge
          tone={tool.paid ? "warning" : "success"}
          label={tool.paid ? "Paid" : "Free"}
          icon={tool.paid ? AlertTriangle : CheckCircle}
        />
      );
    }

    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
    };
  }, [tool, svgIcon]);

  return <div className="tool-card" ref={cardRef}></div>;
};

ToolCard.propTypes = {
  tool: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    paid: PropTypes.bool.isRequired,
  }).isRequired,
  svgIcon: PropTypes.string,
};

export default ToolCard;