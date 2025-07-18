import React, { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { projectCardsEntranceAnimation, flipLayoutTransition } from "../utils/gsapAnimations";
import useBreakpoint from "../utils/useBreakpoint";
import ProjectCard from "../components/ui/ProjectCard/ProjectCard";
import SegmentControl from "../components/ui/SegmentControl/SegmentControl";
import TagDropdown from "../components/ui/TagDropdown/TagDropdown";
import Button from "../components/ui/Button/Button";
import Loading from "../components/ui/Loading/Loading";
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
  const entriesContainerRef = useRef(null);
  const { isMobile, isTablet } = useBreakpoint();

  useEffect(() => {
    if (!loading) {
      const projCard = document.querySelectorAll('.project-item-card-link');
      projectCardsEntranceAnimation(projCard);
    }
  }, [loading]);

  // Custom function to handle view mode changes with Flip animation
  const handleViewModeChange = (newViewMode) => {
    if (newViewMode === viewMode) return;
    
    // Only animate between grid and list (not swiper)
    if ((viewMode === "grid" || viewMode === "list") && 
        (newViewMode === "grid" || newViewMode === "list") &&
        entriesContainerRef.current) {
      
      // Use the centralized flip animation function
      flipLayoutTransition(entriesContainerRef.current.children, () => {
        setViewMode(newViewMode);
      });
    } else {
      // For swiper transitions or any other case, just change without animation
      setViewMode(newViewMode);
    }
  };

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

  // Show loading spinner while data is being fetched
  if (loading) {
    return <Loading title="Loading..." />;
  }

  if (entries.length === 0) {
    return (
      <section 
        className="blank">
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

  const renderProjectCard = (item) => (
    <ProjectCard
      key={item.id}
      slug={item.Slug || item.slug || ""}
      thumbnail={item.Thumbnail?.url || ""}
      title={item.Title || "Untitled"}
      tags={item.Tags || []}
      tools={item.Tools}
      description={item.Description || ""}
      routePrefix="projects"
      viewMode={viewMode}
    />
  );

  return (
    <section className="projects">
      <header>
          {renderContent()}
          <div className="filters">
            {allTags.length > 0 && (
              <TagDropdown
                allTags={allTags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            )}
              {!isTablet && (
              <SegmentControl
                size={isMobile ? "small" : undefined}
                options={
                  isMobile
                    ? [
                        { value: "swiper", label: "Carousel", icon: <CarouselIcon /> },
                        { value: "list", label: "List", icon: <ListIcon /> },
                      ]
                    : [
                        { value: "grid", label: "Grid", icon: <GridIcon /> },
                        { value: "list", label: "List", icon: <ListIcon /> },
                      ]
                }
                selectedOption={viewMode === "grid" && isMobile ? "swiper" : viewMode}
                setSelectedOption={(val) => {
                  const translatedVal = isMobile && val === "grid" ? "swiper" : val;
                  handleViewModeChange(translatedVal);
                }}
              />
            )}
          </div>
        </header>

      {pageData && (

        <div className={`projects-wrapper`}>
          {(viewMode === "grid" || viewMode === "list") && (
          <div className={`${viewMode}`} ref={entriesContainerRef}>
            {filteredEntries.map(renderProjectCard)}
          </div>
          )}

          {viewMode === "swiper" && SwiperComponent && (
            <SwiperComponent
              items={filteredEntries}
              slidesPerView={1}
              renderSlide={renderProjectCard}
            />
          )}
        </div>
      )}
    </section>
  );
};

Portfolio.propTypes = {
  collection: PropTypes.string.isRequired,
};

export default Portfolio;