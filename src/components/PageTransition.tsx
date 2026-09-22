"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

// Squares wipe, modelled on Own the Patch's .transition pixel grid — now in
// TWO steps on client navigation: the forest grid first animates IN to cover
// the viewport, we navigate under cover, then it wipes away to reveal the new
// page. On first paint it only reveals (the grid is pre-covered instantly, no
// flash). Lives in the root layout so every page gets it for free.
const COLS = 14;
const ROWS = 8;
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => ({
  r: Math.floor(i / COLS),
  c: i % COLS,
}));
// Per-cell stagger and the cell transition duration (kept in sync with the
// `.pagewipe span` transition in index.css). Snappy so navigation never feels
// like it hangs before the new page appears.
const STAGGER_MS = 12;
const CELL_MS = 340;
// Longest stagger (bottom-right cell) + the cell transition duration.
const COVER_MS = (COLS - 1 + (ROWS - 1)) * STAGGER_MS + CELL_MS;

export function PageTransition() {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [covered, setCovered] = useState(true);
  const [instant, setInstant] = useState(true);
  const first = useRef(true);

  // Reveal after each render of a new route (and the very first paint).
  useEffect(() => {
    let raf = 0;
    if (first.current) {
      first.current = false;
      raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setInstant(false);
          setCovered(false);
        }),
      );
    } else {
      raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setCovered(false)),
      );
    }
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // Intercept internal link clicks: cover first, then navigate under cover.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/")) return; // skip #hash, external, tel:, mailto:, wa.me
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(href, location.origin);
      if (url.pathname === location.pathname) return; // same page → let hash/scroll happen

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return; // no cover; let Next handle it

      e.preventDefault();
      setInstant(false);
      setCovered(true);
      window.setTimeout(() => navigate(href), COVER_MS);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  return (
    <div
      aria-hidden="true"
      className={`pagewipe ${covered ? "is-covered" : ""} ${
        instant ? "is-instant" : ""
      }`}
    >
      {CELLS.map(({ r, c }, i) => (
        <span key={i} style={{ transitionDelay: `${(c + r) * STAGGER_MS}ms` }} />
      ))}
    </div>
  );
}
