import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Details from "./pages/Details";
import Entry from "./pages/Entry";
import NotFound from "./pages/NotFound";
import "./styles/main.scss";

const NAV_API_URL = "https://portfolio-cms-n9hb.onrender.com/api/navigation?populate=*";
// SEO_API_URL is kept for future use
const SEO_API_URL = "https://portfolio-cms-n9hb.onrender.com/api/global-seo?populate=*";
const version = process.env.REACT_APP_VERSION;

const AppContent = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState(null);
  const [navRoutes, setNavRoutes] = useState({});
  const [, setHomePageUrl] = useState("about");

  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const response = await fetch(NAV_API_URL);
        const data = await response.json();
        if (data?.data?.NavLinks) {
          const dynamicRoutes = {};
          let detectedHomePage = "about";

          data.data.NavLinks.forEach(({ label, url }) => {
            dynamicRoutes[url] = label.toLowerCase();
            if (label.toLowerCase() === "about") {
              detectedHomePage = url;
            }
          });

          setNavRoutes(dynamicRoutes);
          setHomePageUrl(detectedHomePage);
        }
      } catch (error) {
        console.error("Error fetching navigation:", error);
      }
    };
    fetchNavigation();
  }, []);

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const res = await fetch(SEO_API_URL);
        const data = await res.json();
        if (data?.data) {
          setSeoData(data.data);
        }
      } catch (err) {
        console.error("Error fetching SEO data:", err);
      }
    };
    fetchSeo();
  }, []);


  useEffect(() => {
    console.log(
      `Sup, fellow dev 👋 \n\nCheers for peeking under the hood. \n\n- \n\n v${version}`,

    );

  }, []);

  return (
    <>
      {seoData && (
        <Helmet>
          <title>{seoData.siteTitle || "Default Title"}</title>
          <meta name="description" content={seoData.siteDescription || "Default description"} />
          <meta property="og:title" content={seoData.ogTitle || seoData.siteTitle} />
          <meta property="og:description" content={seoData.ogDescription || seoData.siteDescription} />
          {seoData.ogImage?.data?.attributes?.url && (
            <meta property="og:image" content={seoData.ogImage.data.attributes.url} />
          )}
          <meta name="twitter:card" content={seoData.twitterCard || "summary_large_image"} />
          {seoData.favicon?.data?.attributes?.url && (
            <link rel="icon" type="image/x-icon" href={seoData.favicon.data.attributes.url} />
          )}
          {seoData.appleTouchIcon?.data?.attributes?.url && (
            <link rel="apple-touch-icon" href={seoData.appleTouchIcon.data.attributes.url} />
          )}
        </Helmet>
      )}

      <Sidebar />

      <AnimatePresence mode="wait">
        <motion.main
          className="motion-wrapper"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<About />} />
            {Object.entries(navRoutes).map(([url, caseValue]) => {
              let Component;
              switch (url) {
                case "projects":
                  Component = <Portfolio collection="projects" />;
                  break;
                case "ui-lab":
                  Component = <Portfolio collection="creative-outputs" />;
                  break;
                case "contact":
                  Component = <Contact />;
                  break;
                case "details":
                  Component = <Details />;
                  break;
                default:
                  Component = <NotFound />;
              }
              return <Route key={url} path={`/${url}`} element={Component} />;
            })}
            <Route path="/projects/:slug" element={<Entry collection="projects" />} />
            <Route path="/ui-lab/:slug" element={<Entry collection="creative-outputs" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;