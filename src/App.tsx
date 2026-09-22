import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Faq } from "@/components/Faq";
import { StartCta } from "@/components/StartCta";
import { Footer } from "@/components/Footer";
import { BookingDrawer } from "@/components/BookingDrawer";
import Home from "@/pages/Home";
import Articles from "@/pages/Articles";
import Article from "@/pages/Article";

// Scroll to top on route change (hash links still scroll within a page).
// The page uses `scroll-behavior: smooth` globally, so we temporarily force
// an instant jump here — otherwise navigating from far down a long page
// animates a visible scroll-up under the transition cover.
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    const el = document.documentElement;
    const prev = el.style.scrollBehavior;
    el.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    el.style.scrollBehavior = prev;
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <PageTransition />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artiklar" element={<Articles />} />
        <Route path="/artiklar/:slug" element={<Article />} />
      </Routes>
      {/* Shared tail on every page — FAQ, the "Äg ert område" CTA, footer. */}
      <Faq />
      <StartCta />
      <Footer />
      <BookingDrawer />
    </>
  );
}
