import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import useBreakpoint from "../utils/useBreakpoint";
import SegmentControl from "../components/ui/SegmentControl/SegmentControl";
import Badge from "../components/ui/Badge/Badge";
import { ReactComponent as ServerIcon } from "../assets/icons/server.svg";
import { ReactComponent as DatabaseIcon } from "../assets/icons/database.svg";
import { ReactComponent as CodeIcon } from "../assets/icons/code.svg";
import { ReactComponent as CheckCircle } from "../assets/icons/check-circle.svg";
import { ReactComponent as AlertTriangle } from "../assets/icons/alert-triangle.svg";

import "./Details.scss";

const API_URL = "https://portfolio-cms-n9hb.onrender.com/api/detail-page?populate[tools][populate]=logo";

const Details = () => {
  const [viewMode, setViewMode] = useState("development");
  const [tools, setTools] = useState({ development: [], backend: [], hosting: [] });
  const [svgIcons, setSvgIcons] = useState({});
  const [content, setContent] = useState([]);
  const svgRefs = useRef({});
  const [loading, setLoading] = useState(true);
  const { isMobile } = useBreakpoint();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data?.data) {
          const categorizedTools = {
            development: [],
            backend: [],
            hosting: [],
          };

          data.data.tools.forEach((tool) => {
            const { name, description, category, paid, logo } = tool;
            const categoryKey = category.toLowerCase();

            if (categorizedTools[categoryKey]) {
              categorizedTools[categoryKey].push({
                name,
                description,
                paid,
                logoUrl: logo?.url || null,
              });
            }
          });

          setTools(categorizedTools);
          setContent(data.data.content || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSvgs = async () => {
      setSvgIcons({});
      const newSvgIcons = {};

      for (const category in tools) {
        for (const tool of tools[category]) {
          if (tool.logoUrl && tool.logoUrl.endsWith(".svg")) {
            try {
              const response = await fetch(tool.logoUrl);
              const svgText = await response.text();
              newSvgIcons[tool.name] = svgText;
            } catch (error) {
              console.error(`Failed to fetch SVG for ${tool.name}:`, error);
            }
          }
        }
      }

      setSvgIcons(newSvgIcons);
    };

    if (Object.keys(tools).some((key) => tools[key].length > 0)) {
      fetchSvgs();
    }
  }, [tools]);

  useEffect(() => {
    Object.keys(svgIcons).forEach((toolName) => {
      if (svgRefs.current[toolName]) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgIcons[toolName], "image/svg+xml");
        const svgElement = doc.querySelector("svg");

        if (svgElement) {
          svgRefs.current[toolName].replaceWith(svgElement);
        }
      }
    });
  }, [svgIcons, viewMode]);

  const renderTextNode = (child, i) => {
    let node = child.text;
    if (child.bold) node = <strong key={i}>{node}</strong>;
    if (child.italic) node = <em key={i}>{node}</em>;
    if (child.underline) node = <u key={i}>{node}</u>;
    return node;
  };

  const renderContent = () =>
    content.map((block, index) => {
      const children = block.children.map(renderTextNode);
      if (block.type === "heading") {
        return React.createElement(`h${block.level || 1}`, { key: index }, children);
      }
      if (block.type === "paragraph") {
        return <p key={index}>{children}</p>;
      }
      return null;
    });

  const renderTools = (category) =>
    tools[category].map((tool, index) => (
      <div
        key={index}
        className="details-container"
        ref={(el) => {
          if (!el || !svgIcons[tool.name]) return;

          const parser = new DOMParser();
          const doc = parser.parseFromString(svgIcons[tool.name], "image/svg+xml");
          const svgElement = doc.querySelector("svg");

          if (svgElement) {
            el.innerHTML = "";
            el.append(svgElement);

            const wrapper = document.createElement("div");
            wrapper.className = "details-wrapper-container";

            const header = document.createElement("header");
            header.innerHTML = `<h2>${tool.name}</h2>`;

            const badgeContainer = document.createElement("div");
            header.appendChild(badgeContainer);

            const description = document.createElement("p");
            description.textContent = tool.description;

            wrapper.appendChild(header);
            wrapper.appendChild(description);
            el.append(wrapper);

            const root = createRoot(badgeContainer);
            root.render(
              <Badge
                tone={tool.paid ? "warning" : "success"}
                label={tool.paid ? "Paid" : "Free"}
                icon={tool.paid ? AlertTriangle : CheckCircle}
              />
            );
          }
        }}
      ></div>
    ));

  // Don't render anything until data is loaded to prevent sequential loading
  if (loading) {
    return null;
  }

  return (
    
      <section className="details">
        <header>{renderContent()}</header>

        <SegmentControl
          options={[
            { value: "development", 
              label: isMobile  ? "Dev" : "Development", 
              icon: isMobile  ? undefined : <CodeIcon /> 
            },
            { value: "backend",
              label: "Backend",
              icon: isMobile  ? undefined : <DatabaseIcon /> 
            },
            { value: "hosting",
              label: "Hosting",
              icon: isMobile  ? undefined : <ServerIcon />
            },
          ]}
          selectedOption={viewMode}
          setSelectedOption={setViewMode}
          
        />

        <div className="details-content">{renderTools(viewMode)}</div>
      </section>
    
  );
};

export default Details;