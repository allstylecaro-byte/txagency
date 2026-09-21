"use client";

import { useInView } from "./useInView";

// The rent-vs-own cost chart, drawn in real time when it scrolls into view:
// the wedge fades in, both lines draw left-to-right, and the "month 12"
// vesting marker pops in last. Illustration only — no fabricated figures.
export function CostChart() {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);

  const draw = (delay: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: inView ? 0 : 1,
    transition: `stroke-dashoffset 1.5s var(--ease-osmo) ${delay}s`,
  });

  return (
    <div ref={ref} className="relative">
      <svg
        viewBox="0 0 100 56"
        preserveAspectRatio="none"
        className="block h-56 w-full overflow-visible"
        role="img"
        aria-label="Illustration: hyrda leads är en kostnad utan kvarvarande värde, medan egen synlighet byggs upp till en tillgång ni äger."
      >
        {/* grid */}
        <g
          stroke="rgba(15,61,52,0.12)"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        >
          <line x1="0" y1="0" x2="0" y2="56" />
          <line x1="25" y1="0" x2="25" y2="56" />
          <line x1="50" y1="0" x2="50" y2="56" />
          <line x1="75" y1="0" x2="75" y2="56" />
          <line x1="100" y1="0" x2="100" y2="56" />
          <line x1="0" y1="56" x2="100" y2="56" stroke="rgba(15,61,52,0.3)" />
        </g>
        {/* wedge between the two lines */}
        <polygon
          points="0,56 100,20 100,8"
          fill="rgba(15,61,52,0.07)"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 1.2s ease 0.7s" }}
        />
        {/* rent line (muted) */}
        <polyline
          points="0,56 100,20"
          fill="none"
          stroke="#5f7169"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          style={draw(0.1)}
        />
        {/* own line (forest, prominent) */}
        <polyline
          points="0,56 100,8"
          fill="none"
          stroke="#0f3d34"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          style={draw(0.25)}
        />
        {/* vesting marker at month 12 */}
        <g
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.5s ease 1.5s",
          }}
        >
          <line
            x1="50"
            y1="0"
            x2="50"
            y2="56"
            stroke="rgba(15,61,52,0.35)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <rect x="48.7" y="30.2" width="2.6" height="2.6" fill="#0f3d34" />
        </g>
        {/* leading dot on the own line */}
        <circle
          cx="100"
          cy="8"
          r="1.8"
          fill="#0f3d34"
          className={inView ? "tx-pulse" : ""}
          vectorEffect="non-scaling-stroke"
          style={{ opacity: inView ? 1 : 0, transition: "opacity 0.3s ease 1.6s" }}
        />
      </svg>
    </div>
  );
}
