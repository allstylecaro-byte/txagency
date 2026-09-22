"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Shared primitives for the interactive calculators (homepage revenue tool +
// per-article formulas). Framework-agnostic, brand-styled, works on both the
// dark petrol panels and the light cream sections.

export function formatKr(n: number): string {
  return Math.round(n).toLocaleString("sv-SE") + " kr";
}

export function formatNum(n: number, digits = 0): string {
  return n.toLocaleString("sv-SE", { maximumFractionDigits: digits });
}

// Smoothly tween a displayed number whenever the target changes (so results
// feel alive as you drag a slider).
export function useTween(target: number, ms = 420): number {
  const [val, setVal] = useState(target);
  const fromRef = useRef(target); // always holds the latest displayed value
  const rafRef = useRef(0);
  useEffect(() => {
    const from = fromRef.current;
    let start = 0;
    cancelAnimationFrame(rafRef.current);
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      const cur = from + (target - from) * e;
      fromRef.current = cur;
      setVal(cur);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, ms]);
  return val;
}

type Variant = "dark" | "light";

// A labelled slider with a live value read-out.
export function CalcSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  prefix = "",
  hint,
  variant = "light",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  prefix?: string;
  hint?: string;
  variant?: Variant;
}) {
  const dark = variant === "dark";
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  const track = dark ? "rgba(233,230,221,0.16)" : "rgba(16,61,69,0.12)";
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className={`text-[13px] font-semibold ${dark ? "text-cream/80" : "text-ink/80"}`}>
          {label}
        </label>
        <span
          className={`rounded-md px-2 py-0.5 font-display text-sm font-bold tabular-nums ${
            dark ? "bg-cream/10 text-cream" : "bg-ink/[0.06] text-ink"
          }`}
        >
          {prefix}
          {formatNum(value)}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="tx-range mt-2.5 w-full cursor-pointer"
        style={{
          background: `linear-gradient(to right, #f0573f 0%, #f0573f ${pct}%, ${track} ${pct}%, ${track} 100%)`,
        }}
        aria-label={label}
      />
      {hint && (
        <p className={`mt-1.5 text-[11px] leading-snug ${dark ? "text-cream/40" : "text-ink/45"}`}>
          {hint}
        </p>
      )}
    </div>
  );
}

// The ONE calculator shell used everywhere (homepage + every article), so the
// "räkna på er klinik" tool looks identical across the site — only the content
// differs. Dark petrol panel with a coral accent, matching the brand.
export function CalcPanel({
  eyebrow,
  title,
  intro,
  inputs,
  result,
  note,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  inputs: ReactNode;
  result: ReactNode;
  note?: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl p-8 sm:p-10"
      style={{ background: "linear-gradient(135deg,#0e343b,#0a2b31 60%,#123f47)" }}
    >
      <span
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {eyebrow}
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold tracking-tightest text-cream sm:text-3xl">
          {title}
        </h3>
        {intro && <p className="mt-2 max-w-xl text-sm leading-relaxed text-cream/60">{intro}</p>}
        <div className="mt-7 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_16rem] lg:gap-12">
          <div className="space-y-5">{inputs}</div>
          <div className="lg:self-center">{result}</div>
        </div>
        {note && <p className="mt-6 max-w-2xl text-xs leading-relaxed text-cream/45">{note}</p>}
      </div>
    </div>
  );
}

// The highlighted headline result inside a CalcPanel.
export function CalcResult({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-cream/12 bg-white/[0.06] p-6 text-center">
      <div className="font-display text-3xl font-bold tabular-nums tracking-tightest text-cream sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
        {label}
      </div>
      {sub && <div className="mt-5 border-t border-cream/10 pt-4">{sub}</div>}
    </div>
  );
}

// A single output stat (used in result panels / breakdowns).
export function CalcStat({
  label,
  value,
  accent = false,
  variant = "light",
}: {
  label: string;
  value: string;
  accent?: boolean;
  variant?: Variant;
}) {
  const dark = variant === "dark";
  return (
    <div>
      <div
        className={`font-display text-lg font-bold tabular-nums tracking-tightest ${
          accent ? "text-brand" : dark ? "text-cream" : "text-ink"
        }`}
      >
        {value}
      </div>
      <div
        className={`mt-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${
          dark ? "text-cream/45" : "text-sage"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
