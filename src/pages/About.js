import React, { useState, useEffect } from "react";
import SvgIcon from "../utils/SvgIcon";
import { useGSAP } from "@gsap/react";
import { companiesCarouselAnimation } from '../utils/gsapAnimations';
import "./About.scss";

const ABOUT_API_URL = "https://portfolio-cms-n9hb.onrender.com/api/about?populate[businesses][populate]=image";

// Utility to optimize Cloudinary image URLs
const optimizeCloudinaryUrl = (url) => {
  return url.includes("/upload/")
    ? url.replace("/upload/", "/upload/f_auto,q_auto/")
    : url;
};

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [svgIcons, setSvgIcons] = useState({});

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch(ABOUT_API_URL);
        const data = await response.json();
        if (data?.data) {
          setAboutData(data.data);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  useGSAP(() => {
    if (aboutData?.businesses?.length > 0) {
      companiesCarouselAnimation();
    }
  }, [aboutData?.businesses]);

  useEffect(() => {
    if (aboutData?.businesses) {
      const fetchSvgs = async () => {
        const newSvgIcons = {};
        for (const business of aboutData.businesses) {
          if (business.image?.mime === "image/svg+xml" && business.image.url) {
            try {
              const response = await fetch(business.image.url);
              const svgText = await response.text();
              newSvgIcons[business.name] = svgText;
            } catch (error) {
              console.error(`Failed to fetch SVG for ${business.name}:`, error);
            }
          }
        }
        setSvgIcons(newSvgIcons);
      };

      fetchSvgs();
    }
  }, [aboutData]);

  if (loading) return null;
  if (!aboutData) return <p>Error loading content.</p>;

  const { content, businesses } = aboutData;

  return (
    <>
      <section className="about">
        <header>
          {content &&
            content.map((block, index) => {
              switch (block.type) {
                case "heading":
                  return <h1 key={index}>{block.children[0].text}</h1>;
                case "image":
                  return (
                    <picture key={index} className="avatar-wrapper">
                      <source
                        srcSet={optimizeCloudinaryUrl(block.image.url)}
                        type="image/webp"
                      />
                      <img
                        className="avatar"
                        src={optimizeCloudinaryUrl(block.image.url)}
                        alt={block.image.alternativeText || "About image"}
                        width={block.image.width}
                        height={block.image.height}
                        loading="lazy"
                      />
                    </picture>
                  );
                case "paragraph":
                  return (
                    <p key={index}>
                      {block.children.map((child, i) =>
                        child.type === "link" ? (
                          <a
                            key={i}
                            href={child.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {child.children[0].text}
                          </a>
                        ) : (
                          child.text
                        )
                      )}
                    </p>
                  );
                default:
                  return null;
              }
            })}
          </header>
        
          {businesses.length > 0 && (
          <div className="companies-carousel-wrapper">
            <div className="companies-marquee">
              {businesses.concat(businesses).concat(businesses).map((business, index) => (
                <div className="company-logo" key={index}>
                  {business.image?.mime === "image/svg+xml" ? (
                    <SvgIcon
                      svgMarkup={svgIcons[business.name]}
                      width={`${business.imageWidth}rem`}
                    />
                  ) : (
                    <img
                      src={business.image?.url || ""}
                      alt={business.ariaLabel || business.name}
                      style={{
                        width: business.imageWidth
                          ? `${business.imageWidth}rem`
                          : "auto",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          )}

      </section>
    </>
  );
};

export default About;
