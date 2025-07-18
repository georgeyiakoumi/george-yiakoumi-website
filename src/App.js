import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./components/ui/Sidebar/Sidebar";
import Loading from "./components/ui/Loading/Loading";
import PageTransition from "./components/PageTransition";
import About from "./pages/About";
import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import "./styles/main.scss";

// Lazy load non-critical components
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));
const Details = lazy(() => import("./pages/Details"));
const Entry = lazy(() => import("./pages/Entry"));
const NotFound = lazy(() => import("./pages/NotFound"));

const LoadingFallback = () => (
  <Loading title="Loading..." />
);

const SEO_API_URL = "https://portfolio-cms-n9hb.onrender.com/api/global-seo?populate=*";
const version = process.env.REACT_APP_VERSION;

gsap.registerPlugin(ScrollSmoother);


const AppContent = () => {
  const location = useLocation();
  const [seoData, setSeoData] = useState(null);

  useEffect(() => {
    const fetchSeo = async () => {
      try {
        const controller = new AbortController();
        const res = await fetch(SEO_API_URL, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data?.data) {
          setSeoData(data.data);
        }

        return () => controller.abort();
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching SEO data:", err);
        }
      }
    };
    fetchSeo();
  }, []);

  useEffect(() => {
    console.log(
      `Sup, nerds 👋 \n\nCheers for peeking under the hood. \n\n- \n\n v${version}`
    );
  }, []);

  // Initialize ScrollSmoother
  useEffect(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });
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

      <div id="smooth-wrapper">
        <Sidebar />
        <div id="smooth-content">
          
          <PageTransition>
            <Suspense fallback={<LoadingFallback />}>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<About />} />
                <Route path="/projects" element={<Portfolio collection="projects" />} />
                <Route path="/projects/:slug" element={<Entry collection="projects" />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/details" element={<Details />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </PageTransition>
          
        </div>
      </div>
    </>
  );
};

const App = () => (
  <ThemeProvider>
    <AppContent />
  </ThemeProvider>
);

export default App;
