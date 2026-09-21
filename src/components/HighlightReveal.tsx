"use client";

import { useEffect, useRef, useState } from "react";

// data-highlight-marker-reveal, premium build: each line is wrapped in an
// inline-block clip so the covering bar hugs the TEXT width (not the full
// column). The bar is the line's own resting colour, so the line first
// reads as a solid block, then wipes away from the right on a slow eased
// curve, "materialising" the words. Lines stagger.
export function HighlightReveal({
  lines,
  as: Tag = "h2",
  className = "",
  barTheme = "dark",
}: {
  lines: string[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  barTheme?: "dark" | "light";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Bar colour = the line's own resting colour: cream on dark, ink on light.
  const barColor = barTheme === "light" ? "bg-ink" : "bg-cream";

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={line} className="block">
          <span
            className="relative inline-block max-w-full overflow-hidden align-bottom"
            style={{ paddingTop: "0.16em", marginTop: "-0.16em" }}
          >
            {line}
            <span
              aria-hidden="true"
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`absolute inset-0 origin-right transition-transform duration-[900ms] ease-[cubic-bezier(0.625,0.05,0,1)] ${barColor} ${
                revealed ? "scale-x-0" : "scale-x-100"
              }`}
            />
          </span>
        </span>
      ))}
    </Tag>
  );
}
