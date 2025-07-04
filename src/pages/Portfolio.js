import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { ReactLenis } from "lenis/react";
import useBreakpoint from "../utils/useBreakpoint";
import PortfolioCard from "../components/ui/PortfolioCard/PortfolioCard";
import SegmentControl from "../components/ui/SegmentControl/SegmentControl";
import Loading from "../components/ui/Loading/Loading";
import TagDropdown from "../components/ui/TagDropdown/TagDropdown";
import Button from "../components/ui/Button/Button";
import { ReactComponent as Arun } from "../assets/images/arun-sleepypooka.svg";
import { ReactComponent as GridIcon } from "../assets/icons/grid.svg";
import { ReactComponent as ListIcon } from "../assets/icons/list.svg";
import { ReactComponent as CarouselIcon } from "../assets/icons/carousel.svg";
import { ReactComponent as Send } from "../assets/icons/send.svg";
import "./Portfolio.scss";

const API_BASE = process.env.REACT_APP_STRAPI_URL.replace(/\/$/, "");

const Portfolio = ({ collection }) => {
  const COLLECTION_API = `${API_BASE}/api/${collection}?populate=*`;
  const PAGE_API = `${API_BASE}/api/portfolio-page?populate=*`;

  const [entries, setEntries] = useState([]);
  const [pageData, setPageData] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [SwiperComponent, setSwiperComponent] = useState(null);

  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [entriesRes, pageRes] = await Promise.all([
          fetch(COLLECTION_API).then((res) => res.json()),
          fetch(PAGE_API).then((res) => res.json()),
        ]);

        if (entriesRes?.data) setEntries(entriesRes.data);
        if (pageRes?.data) setPageData(pageRes.data);
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collection, COLLECTION_API, PAGE_API]);

  useEffect(() => {
    if (isMobile) {
      setViewMode("swiper");
      import("../components/ui/SwiperComponent/SwiperComponent").then((mod) =>
        setSwiperComponent(() => mod.default)
      );
    } else if (isTablet) {
      setViewMode("list");
    } else {
      setViewMode("grid");
    }
  }, [isMobile, isTablet]);

  const allTags = useMemo(() => {
    return [...new Set(entries.flatMap((item) => item.Tags?.map((tag) => tag.name) || []))];
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return selectedTags.length
      ? entries.filter((entry) =>
          entry.Tags?.some((tag) => selectedTags.includes(tag.name))
        )
      : entries;
  }, [entries, selectedTags]);

  const renderContent = () => {
    return pageData?.projectsContent ? <BlocksRenderer content={pageData.projectsContent} /> : null;
  };

  if (loading) {
    return <Loading title="Fetching entries..." description="This may take a few seconds." />;
  }

  if (entries.length === 0) {
    return (
      <section className="blank">
        <Arun />
        <h1>Nothing to see here, yet.</h1>
        <p>
          I&apos;m still adding to this, but would hate for it to be the reason we don&apos;t work together.
          If you&apos;re keen, and are open to having a chat, I can show you some stuff over a call.
        </p>
        <Button to="/contact" label="Get in touch" iconLeft={Send} />
      </section>
    );
  }

  return (
    <ReactLenis>
      <section className="portfolio">
        {pageData && (
          <header>
            {renderContent()}
          </header>
        )}

        <div className="portfolio-filters">
          {allTags.length > 0 && (
            <div className="tag-dropdown-wrapper">
              <TagDropdown
                allTags={allTags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </div>
          )}

          <div className="segment-control-wrapper">
            {isDesktop && (
              <SegmentControl
                options={[
                  { value: "grid", label: "Grid", icon: <GridIcon /> },
                  { value: "list", label: "List", icon: <ListIcon /> },
                ]}
                selectedOption={viewMode}
                setSelectedOption={setViewMode}
              />
            )}

            {isMobile && (
              <SegmentControl
                size="small"
                options={[
                  { value: "swiper", label: "Carousel", icon: <CarouselIcon /> },
                  { value: "list", label: "List", icon: <ListIcon /> },
                ]}
                selectedOption={viewMode}
                setSelectedOption={setViewMode}
              />
            )}
          </div>
        </div>

        <div className={`portfolio-display ${viewMode}`}>
          {(viewMode === "grid" || viewMode === "list") && (
            <div className={`entries-container portfolio-${viewMode}`}>
              {filteredEntries.map((item) => (
                <PortfolioCard
                  key={item.id}
                  slug={item.Slug || item.slug || ""}
                  thumbnail={item.Thumbnail.url || ""}
                  title={item.Title || "Untitled"}
                  tags={item.Tags || []}
                  routePrefix="projects"
                />
              ))}
            </div>
          )}

          {viewMode === "swiper" && SwiperComponent && (
            <SwiperComponent
              items={filteredEntries}
              slidesPerView={1}
              renderSlide={(item) => (
                <PortfolioCard
                  slug={item.Slug || item.slug || ""}
                  thumbnail={item.Thumbnail.url || ""}
                  title={item.Title || "Untitled"}
                  tags={item.Tags || []}
                  routePrefix="projects"
                />
              )}
              customClass="portfolio-swiper"
            />
          )}
        </div>
      </section>
    </ReactLenis>
  );
};

Portfolio.propTypes = {
  collection: PropTypes.string.isRequired,
};

export default Portfolio;