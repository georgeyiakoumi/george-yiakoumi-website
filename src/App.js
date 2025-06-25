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

const SEO_API_URL = "https://portfolio-cms-n9hb.onrender.com/api/global-seo?populate=*";
const version = process.env.REACT_APP_VERSION;

const AppContent = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState(null);

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
      `Sup, nerds 👋 \n\nCheers for peeking under the hood. \n\n- \n\n v${version}`
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
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Portfolio collection="projects" />} />
            <Route path="/projects/:slug" element={<Entry collection="projects" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/details" element={<Details />} />
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