import React, { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Tag from "../components/ui/Tag/Tag";
import TextLink from "../components/ui/TextLink/TextLink";
import Button from "../components/ui/Button/Button";
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg";
import { ReactComponent as TagIcon } from "../assets/icons/tag.svg";
import { ReactComponent as ArrowLeft } from "../assets/icons/arrow-left.svg";
import NotFound from "./NotFound";
import "./Entry.scss";

const API_BASE = process.env.REACT_APP_STRAPI_URL.replace(/\/$/, "");

const fetchEntry = async (collection, slug) => {
  try {
    const res = await fetch(
      `${API_BASE}/api/${collection}?filters[slug][$eq]=${slug}` +
        `&populate[Challenge][populate]=Image` +
        `&populate[Solution][populate]=Image` +
        `&populate[Role][populate]=Image` +
        `&populate[Impact][populate]=Image` +
        `&populate[Takeaway][populate]=Image` +
        `&populate=Banner`
    );
    const json = await res.json();
    if (!json?.data || json.data.length === 0) return null;
    return json.data[0];
  } catch (err) {
    console.error(`Error fetching ${collection} entry:`, err);
    return null;
  }
};

const sectionLabels = {
  challenge: "The challenge",
  solution: "The solution",
  role: "My role",
  impact: "The impact",
  takeaway: "Key takeaways",
};

const sections = ["challenge", "solution", "role", "impact", "takeaway"];

const Entry = ({ collection }) => {
  const { slug } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTags, setShowTags] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await fetchEntry(collection, slug);
      setEntry(data);
      setLoading(false);
    };
    load();
  }, [slug, collection]);

  if (!entry && !loading) return <NotFound />;
  if (!entry) return null; // Still loading

  const sectionContentMap = {
    challenge: {
      content: entry?.Challenge?.content,
      image: entry?.Challenge?.Image?.url,
    },
    solution: {
      content: entry?.Solution?.content,
      image: entry?.Solution?.Image?.url,
    },
    role: {
      content: entry?.Role?.content,
      image: entry?.Role?.Image?.url,
    },
    impact: {
      content: entry?.Impact?.content,
      image: entry?.Impact?.Image?.url,
    },
    takeaway: {
      content: entry?.Takeaway?.content,
      image: entry?.Takeaway?.Image?.url,
    },
  };

  const backPath = collection === "projects" ? "/projects" : "/ui-lab";

  return (
    <ReactLenis>
      <section className="entry">
        <header
          style={{
            backgroundImage: entry.Banner?.url ? `url(${entry.Banner.url})` : undefined,
          }}
        >
          <div className="header-overlay"></div>
          <div className="back-wrapper">
            <TextLink
              to={backPath}
              label={`Back to ${collection === "projects" ? "projects" : "UI Lab"}`}
              iconLeft={ArrowLeft}
              size="tiny"
            />
          </div>
          <section className="header-details">
            <h1>{entry.Title || "Untitled"}</h1>
            <p>{entry.Description || ""}</p>
            <div className="entry-tags-container">
              {showTags &&
                entry.Tags?.map((tag, i) => (
                  <Tag
                    key={i}
                    label={tag.name}
                    selected={false}
                    size="small"
                    state="default"
                    dismissible={false}
                  />
                ))}
              <Button
                onClick={() => setShowTags(!showTags)}
                label={showTags ? "Hide tags" : "Show tags"}
                size="small"
                tone="white"
                variant="secondary"
                iconLeft={showTags ? CloseIcon : TagIcon}
              />
            </div>
          </section>
        </header>

        {sections.map((section) => {
            const sectionData = sectionContentMap[section];
            if (!sectionData?.content) return null;

            return (
              <div className="entry-section" key={section}>
                <div className="entry-section-content">
                  <h2>{sectionLabels[section]}</h2>
                  <BlocksRenderer content={sectionData.content} />
                </div>
                {sectionData.image && (
                  <img
                    src={sectionData.image}
                    alt={`${sectionLabels[section]} visual`}
                    className="entry-section-image"
                  />
                )}
              </div>
            );
          })}

          <div className="back-wrapper">
            <TextLink
              to={backPath}
              label={`Back to ${collection === "projects" ? "projects" : "UI Lab"}`}
              iconLeft={ArrowLeft}
              size="tiny"
            />
          </div>
      </section>
    </ReactLenis>
  );
};

Entry.propTypes = {
  collection: PropTypes.string.isRequired,
};

export default Entry;