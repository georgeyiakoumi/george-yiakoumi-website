import React, { useState, useEffect } from "react";
import { ReactLenis } from "lenis/react";
import PortfolioCard from "../components/ui/PortfolioCard/PortfolioCard";
import SegmentControl from "../components/ui/SegmentControl/SegmentControl";
import SwiperComponent from "../components/ui/SwiperComponent/SwiperComponent";
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
  const PAGE_API = `${API_BASE}/api/${collection}?populate=*`;
  const [entries, setEntries] = useState([]);
  const [, setPageData] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  
  const isProjects = collection === "projects";
  const introHeading = isProjects
    ? "Solving problems through design"
    : "Where pixels go to party";

    const introMainParagraph = isProjects
    ? "A collection of projects, case studies, and insights that showcase my approach to UX, UI, and digital product design."
    : "This is my sandbox for testing visual languages, micro-interactions, and UI polish — a place for pushing creative boundaries.";
  
  const introSecondaryLink = isProjects ? (
    <>
      <h4>For something more visual...</h4>
      <Button 
      to="/ui-lab" 
      label="Go to UI Lab" 
      size="small"
      variant="secondary"
      />
    </>
  ) : (
    <>
      <h4>For applied strategy or design thinking...</h4>
      <Button 
      to="/projects" 
      label="Projects"
      size="small"
      variant="tertiary"
      />
    </>
  );

  const routePrefix = collection === "projects" ? "projects" : "ui-lab";

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
    const handleResize = () => {
      const width = window.innerWidth;
      const isNowMobile = width <= 768;
      const isNowTablet = width > 768 && width <= 1024;
  
      setIsMobile(isNowMobile);
      setViewMode(isNowMobile ? "swiper" : isNowTablet ? "list" : "grid");
    };
  
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  

  // Utility function for future use
  // const extractTextFromBlocks = (blocks, type) => {
  //   if (!blocks || !Array.isArray(blocks)) return "";
  //   const filtered = blocks.filter((block) => block.type === type);
  //   return filtered.length > 0
  //     ? filtered[0].children.map((child) => child.text).join(" ")
  //     : "";
  // };

  
  const allTags = [...new Set(entries.flatMap((item) => item.Tags?.map((tag) => tag.name) || []))];

  const filteredEntries = selectedTags.length
    ? entries.filter((entry) => entry.Tags?.some((tag) => selectedTags.includes(tag.name)))
    : entries;

  

  if (loading) {
    return <Loading title="Fetching entries..." description="This may take a few seconds." />;
  }

  if (entries.length === 0) {
    return (
      <section className="blank">
        <Arun />
        <h1>Nothing to see here, yet.</h1>
        <p>I'm still adding to this, but would hate for it to be the reason we don't work together. If you're keen, and are open to a having a chat, I can show you some stuff over a call.</p>
        <Button
          to="/contact?from=ui-lab"

          label="Get in touch"
          iconLeft={Send}
          
          
        />
      </section>
    );
  }

  return (
    <ReactLenis>
      <section className="portfolio">
      <header>
        <h1>{introHeading}</h1>
        <p>{introMainParagraph}</p>
      </header>
      <section className="other-side">
        {introSecondaryLink}
      </section>

        <div className="portfolio-filters">
          {!isMobile && window.innerWidth > 1024 && (
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

          {allTags.length > 0 && (
              <TagDropdown
                allTags={allTags}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
          )}

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
                  routePrefix={routePrefix}
                />
              ))}
            </div>
          )}

          {viewMode === "swiper" && (
            <SwiperComponent
              items={filteredEntries}
              slidesPerView={1}
              renderSlide={(item) => (
                <PortfolioCard
                  slug={item.Slug || item.slug || ""}
                  thumbnail={item.Thumbnail.url || ""}
                  title={item.Title || "Untitled"}
                  tags={item.Tags || []}
                  routePrefix={routePrefix}
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

export default Portfolio;
