"use client";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { navItems, waLink, defaultWaMessage } from "@/lib/site";
import { RollText } from "./ui";
import { BookingButton } from "./BookingButton";

// Matches the real technique found in Own the Patch's shipped JS (Pf()):
// each zone of the sidebar (logo, nav list, foot links) gets its OWN
// `data-rail` value, computed from THAT ZONE's own vertical center
// against whichever [data-nav-theme] section is behind it — not one
// shared theme for the whole sidebar. That's what makes the contrast
// correct even mid-scroll, when the logo and the nav list can briefly
// sit over two different sections at once. (An earlier pass here used
// a single shared theme value, then mix-blend-mode — both wrong.)
type Theme = "dark" | "light";

function useZoneTheme(ref: React.RefObject<HTMLElement>) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    let sections: { top: number; bottom: number; theme: Theme }[] = [];

    function computeSections() {
      sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
      ).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
          theme: el.getAttribute("data-nav-theme") as Theme,
        };
      });
    }

    function update() {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = window.scrollY + rect.top + rect.height / 2;
      const match = sections.find((s) => center >= s.top && center < s.bottom);
      setTheme(match?.theme ?? "dark");
    }

    computeSections();
    update();
    window.addEventListener("scroll", update, { passive: true });
    const onResize = () => {
      computeSections();
      update();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", onResize);
    };
  }, [ref]);

  return theme;
}

// TX wordmark with the growth arrow sweeping up through the X, from the
// supplied brand logo. Clean display "TX" with an overlaid arrow swoosh
// (single colour, inherits the rail theme).
export function Logo({
  theme = "dark",
  href = "#top",
}: {
  theme?: Theme;
  href?: string;
}) {
  // dark logo (dark ink on transparent) reads on light rails; light logo on dark.
  const src = theme === "light" ? "/tx-logo-dark.png" : "/tx-logo-light.png";
  return (
    <a
      href={href}
      aria-label="TXagency — Dental growth online"
      className="inline-flex items-center leading-none"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="TX Agency" className="h-14 w-auto sm:h-16" />
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  // No section is "active" until one is genuinely in view. This stays empty on
  // pages that don't contain the home sections (e.g. the articles list and
  // individual articles), so the sidebar never falsely marks you as being on
  // "01 Lösningen" while you're really reading an article.
  const [activeHref, setActiveHref] = useState<string>("");
  // Off the home page, point the menu back to the home sections so the same
  // sidebar works everywhere (e.g. "/#losningen" from an article).
  const pathname = useLocation().pathname;
  const base = pathname === "/" ? "" : "/";

  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const footRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [markerTop, setMarkerTop] = useState(0);
  const [markerVisible, setMarkerVisible] = useState(false);

  const logoTheme = useZoneTheme(logoRef);
  const navTheme = useZoneTheme(navRef);
  const footTheme = useZoneTheme(footRef);

  // Active-section spy: matches the real site's rootMargin exactly
  // ("-40% 0px -55% 0px"), tracking a set of intersecting sections and
  // taking the first one in nav order — same tie-break as their Of().
  useEffect(() => {
    const sectionEls = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        const match = navItems.find((item) =>
          intersecting.has(item.href.slice(1)),
        );
        // Clear the active state when no section is in view, so the marker
        // disappears instead of sticking on the last-seen item.
        setActiveHref(match ? match.href : "");
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Slide the marker to the active link's position — mirrors Mf().
  useEffect(() => {
    const index = navItems.findIndex((item) => item.href === activeHref);
    const el = linkRefs.current[index];
    if (!el) {
      setMarkerVisible(false);
      return;
    }
    setMarkerTop(el.offsetTop + el.offsetHeight / 2 - 7);
    setMarkerVisible(true);
  }, [activeHref]);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col justify-between px-8 py-10 lg:flex">
        <div>
          <div ref={logoRef}>
            <Logo theme={logoTheme} href={`${base}#top`} />
          </div>
          <nav ref={navRef} className="relative mt-16 flex flex-col items-start gap-3 pl-6">
            <span
              aria-hidden="true"
              className={`absolute left-0 h-3.5 w-3.5 bg-brand transition-[top,opacity] duration-500 ease-osmo ${
                markerVisible ? "opacity-100" : "opacity-0"
              }`}
              style={{ top: markerTop }}
            />
            {navItems.map((item, i) => {
              const isActive = activeHref === item.href;
              const isLight = navTheme === "light";
              return (
                <a
                  key={item.href}
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  href={`${base}${item.href}`}
                  className={`roll text-xs font-semibold uppercase tracking-wide transition-opacity ${
                    isLight
                      ? isActive
                        ? "text-ink opacity-100"
                        : "text-ink opacity-60 hover:opacity-100"
                      : isActive
                        ? "text-cream opacity-100"
                        : "text-cream opacity-60 hover:opacity-100"
                  } ${isActive ? "is-active font-bold" : ""}`}
                >
                  <span className={isLight ? "text-sage" : "text-cream/60"}>
                    {item.number}_
                  </span>
                  <RollText>{item.label}</RollText>
                </a>
              );
            })}
          </nav>
        </div>
        <div
          ref={footRef}
          className={`flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide ${
            footTheme === "light" ? "text-ink/45" : "text-cream/50"
          }`}
        >
          <a
            href={waLink(defaultWaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 ${footTheme === "light" ? "hover:text-ink" : "hover:text-cream"}`}
          >
            Whatsapp <span aria-hidden="true">↗</span>
          </a>
          <div
            className={`my-1 h-px w-6 ${footTheme === "light" ? "bg-ink/20" : "bg-cream/20"}`}
          />
          <a
            href={`${base}#start`}
            className={footTheme === "light" ? "hover:text-ink" : "hover:text-cream"}
          >
            Kontakt
          </a>
        </div>
      </aside>

      {/* Mobile top bar — opaque background, its own fixed cream-on-ink colors */}
      <div className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-ink-line bg-ink/95 px-5 py-4 backdrop-blur-sm lg:hidden">
        <Logo href={`${base}#top`} />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Öppna meny"
          aria-expanded={open}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-cream/20 bg-ink/70"
        >
          <span className="h-px w-5 bg-cream" />
          <span className="h-px w-5 bg-cream" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink px-6 py-6 lg:hidden">
          <div className="flex items-center justify-between">
            <Logo href={`${base}#top`} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Stäng meny"
              className="flex h-11 w-11 items-center justify-center border border-cream/20 text-2xl leading-none text-cream"
            >
              ×
            </button>
          </div>
          <nav className="mt-16 flex flex-col gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={`${base}${item.href}`}
                onClick={() => setOpen(false)}
                className="text-2xl font-bold uppercase tracking-tight text-cream"
              >
                <span className="text-brand-light">{item.number}</span>
                <span className="text-cream/30">_</span>
                {item.label}
              </a>
            ))}
          </nav>
          <span onClick={() => setOpen(false)} className="mt-auto">
            <BookingButton full>Boka samtal</BookingButton>
          </span>
        </div>
      )}

      {/* Top-right CTA (desktop) — red, pops over any section */}
      <div className="fixed right-6 top-6 z-40 hidden lg:block">
        <BookingButton>Boka samtal</BookingButton>
      </div>
    </>
  );
}
