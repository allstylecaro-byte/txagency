"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { BookingButton } from "./BookingButton";

// "Let Google find you" concept, rebuilt in the TXagency brand: a bold
// multi-colour Google wordmark, a search field that types real dental
// intent queries, and a Target / Optimera / Väx rail — an original take on
// the poster idea (colourful Google + search bar + icon trio), not a copy
// of anyone's creative.
const QUERIES = [
  "akut tandläkare stockholm",
  "tandimplantat pris",
  "invisalign södertälje",
  "tandläkare nära mig",
  "tandblekning stockholm",
  "billig tandläkare göteborg",
  "tandläkare öppet nu",
  "rotfyllning kostnad",
  "tandläkare utan väntetid",
  "akut tandvärk hjälp",
  "tandkrona pris",
  "barntandläkare malmö",
  "visdomstand operation pris",
  "tandläkare öppet helg",
  "porslinsfasader kostnad",
  "tandläkare ny patient uppsala",
  "implantat hela käken pris",
  "tandläkare för tandläkarrädda",
  "estetisk tandvård stockholm",
  "tandläkare delbetalning",
  "bettskena pris",
  "tandluckor laga",
  "tandläkare bra recensioner",
  "gratis första besök tandläkare",
];

const GOOGLE = [
  ["G", "#4285F4"],
  ["o", "#EA4335"],
  ["o", "#FBBC05"],
  ["g", "#4285F4"],
  ["l", "#34A853"],
  ["e", "#EA4335"],
] as const;

function GoogleWord() {
  return (
    <span className="whitespace-nowrap">
      {GOOGLE.map(([ch, color], i) => (
        <span key={i} style={{ color }}>
          {ch}
        </span>
      ))}
    </span>
  );
}

function useTyped(active: boolean) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setText(QUERIES[0]);
      return;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let q = 0;
    function typeIn(i: number) {
      if (cancelled) return;
      const target = QUERIES[q];
      if (i <= target.length) {
        setText(target.slice(0, i));
        timer = setTimeout(() => typeIn(i + 1), 70 + Math.random() * 60);
      } else {
        timer = setTimeout(() => deleteOut(target.length), 1500);
      }
    }
    function deleteOut(i: number) {
      if (cancelled) return;
      const target = QUERIES[q];
      if (i >= 0) {
        setText(target.slice(0, i));
        timer = setTimeout(() => deleteOut(i - 1), 34);
      } else {
        q = (q + 1) % QUERIES.length;
        timer = setTimeout(() => typeIn(0), 320);
      }
    }
    timer = setTimeout(() => typeIn(0), 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [active]);
  return text;
}

function Magnifier({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path
        d="m20 20-3.2-3.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Google-style four-colour microphone.
function ColorMic({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="micg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4285F4" />
          <stop offset="40%" stopColor="#EA4335" />
          <stop offset="70%" stopColor="#FBBC05" />
          <stop offset="100%" stopColor="#34A853" />
        </linearGradient>
      </defs>
      <rect x="9" y="3" width="6" height="11" rx="3" fill="url(#micg)" />
      <path
        d="M6 11a6 6 0 0 0 12 0M12 17v3"
        fill="none"
        stroke="url(#micg)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const PILLARS = [
  {
    label: "Träffa rätt",
    body: "Rätt sökningar, rätt ort, rätt patient.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    label: "Optimera",
    body: "Budget mot bokade tider, inte klick.",
    icon: (
      <>
        <path d="M4 19V10M10 19V5M16 19v-7" strokeLinecap="round" />
        <path d="M4 19h14" strokeLinecap="round" />
      </>
    ),
  },
  {
    label: "Väx",
    body: "Fler patienter, månad för månad.",
    icon: (
      <>
        <path d="M4 16l5-5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7h4v4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export function SearchSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const text = useTyped(active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sokning"
      data-nav-theme="light"
      className="scroll-mt-20 border-t border-ink/10 bg-cream px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-16">
        {/* Left: headline + search + result */}
        <Reveal>
          <div ref={ref}>
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              Syns på Google
            </div>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tightest text-ink sm:text-5xl md:text-6xl">
              Låt <GoogleWord /> hitta er.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">
              Varje dag söker någon i ert område efter exakt det ni gör. Frågan
              är bara en: dyker ni upp överst — eller gör grannkliniken det?
            </p>

            {/* Search field */}
            <div className="mt-9 max-w-xl">
              <div className="flex items-center gap-3 rounded-full border border-ink/10 bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,61,52,0.06),0_16px_34px_-14px_rgba(15,61,52,0.22)]">
                <Magnifier className="h-5 w-5 shrink-0 text-sage" />
                <span className="min-w-0 flex-1 truncate font-sans text-base text-ink sm:text-lg">
                  {text || " "}
                  <span
                    className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.15em] animate-pulse bg-brand align-middle"
                    aria-hidden="true"
                  />
                </span>
                <ColorMic className="h-5 w-5 shrink-0" />
              </div>

              {/* Top result — clearly an example */}
              <div className="mt-4 border border-ink/10 bg-white p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                    <span className="h-2 w-2 bg-brand" aria-hidden="true" />
                    Träff nr 1
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/30">
                    Exempel
                  </span>
                </div>
                <div className="text-xs text-sage">
                  er-tandklinik.se › {"{behandling}"}
                </div>
                <div className="mt-1 font-display text-lg font-bold tracking-tightest text-ink">
                  {"{Behandling} i {ort} — boka tid idag | Er klinik"}
                </div>
                <p className="mt-1 max-w-lg text-sm leading-relaxed text-ink/60">
                  Erfaret team, tydligt pris och lediga tider den här veckan.
                  Ring eller boka online på under en minut.
                </p>
              </div>

              <div className="mt-7">
                <BookingButton>Prata med oss</BookingButton>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: Target / Optimera / Väx rail */}
        <Reveal delay={140}>
          <div className="relative flex gap-6 sm:gap-10 lg:flex-col lg:gap-8">
            {PILLARS.map((p) => (
              <div
                key={p.label}
                className="flex flex-1 flex-col items-center gap-2 text-center lg:flex-none lg:flex-row lg:items-center lg:gap-4 lg:text-left"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    {p.icon}
                  </svg>
                </span>
                <span>
                  <span className="block font-display text-base font-bold tracking-tightest text-ink">
                    {p.label}
                  </span>
                  <span className="mt-0.5 hidden text-sm leading-snug text-ink/55 sm:block">
                    {p.body}
                  </span>
                </span>
              </div>
            ))}
            {/* Data-driven stamp — echoes the poster's round stamp */}
            <div
              className="pointer-events-none absolute right-0 -top-24 hidden rotate-[8deg] lg:block"
              aria-hidden="true"
            >
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-2 border-brand/70 text-center">
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-brand/70">
                  Datadrivet
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-tightest text-brand">
                  Resultat
                </span>
                <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-brand/70">
                  Mätt varje mån
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={80}>
        <p className="mt-14 max-w-xl text-sm leading-relaxed text-ink/55">
          Nästan alla klick går till de översta träffarna. Vårt jobb är att få
          er dit — med Google Ads idag och SEO som bygger över tid — och att
          sidan bakom klicket faktiskt bokar patienten.
        </p>
      </Reveal>
    </section>
  );
}
