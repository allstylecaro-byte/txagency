"use client";

import { useInView } from "./useInView";

// A sparkline that draws itself left-to-right when scrolled into view, with
// a soft area fill fading in and a pulsing dot at the leading edge — so the
// chart reads as if it's being plotted in real time.
export function Sparkline({
  points,
  stroke = "#103d45",
  fill = "rgba(16,61,69,0.08)",
  className = "",
  height = 48,
}: {
  points: number[]; // y-values in a 0..22 viewBox space
  stroke?: string;
  fill?: string;
  className?: string;
  height?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const max = 22;
  const coords = points.map(
    (y, i) => [(i / (points.length - 1)) * 100, y] as const,
  );
  const line = coords.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");
  const area = `0,${max} ${line} 100,${max}`;
  const last = coords[coords.length - 1];

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={`0 0 100 ${max}`}
        preserveAspectRatio="none"
        className="block w-full overflow-visible"
        style={{ height }}
        aria-hidden="true"
      >
        <polygon
          points={area}
          fill={fill}
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 1.1s ease 0.5s",
          }}
        />
        <polyline
          points={line}
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: inView ? 0 : 1,
            transition: "stroke-dashoffset 1.4s var(--ease-osmo)",
          }}
        />
        {/* leading dot */}
        <circle
          cx={last[0]}
          cy={last[1]}
          r={1.6}
          fill={stroke}
          className={inView ? "tx-pulse" : ""}
          style={{ opacity: inView ? 1 : 0, transition: "opacity 0.3s ease 1.3s" }}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
