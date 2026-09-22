"use client";

import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";

// The economics, distilled to a principle a visitor gets in ~3 seconds:
// empty chair-time is already paid for, so marketing that fills it with the
// right patients is mostly margin. A simple left-to-right flow — no calculator,
// no big numbers. (The full interactive maths lives inside the articles.)

const FLOW: { label: string; sub?: string; accent?: boolean }[] = [
  { label: "10 000 kr", sub: "annonsbudget" },
  { label: "Relevant trafik", sub: "rätt sökning, rätt ort" },
  { label: "Bokade patienter", sub: "spårade hela vägen" },
  { label: "Fler fyllda tider", sub: "nästan ren marginal", accent: true },
];

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 rotate-90 text-brand sm:rotate-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarBooking() {
  return (
    <section
      id="ekonomi"
      data-nav-theme="light"
      className="scroll-mt-20 border-t border-ink/10 bg-cream-soft px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
          Ekonomin bakom
        </div>
        <HighlightReveal
          as="h2"
          barTheme="light"
          className="mt-4 font-display text-3xl font-bold leading-tight tracking-tightest text-ink sm:text-4xl"
          lines={["Tomma tider kostar pengar."]}
        />
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-sage">
          Stolen, lokalen och teamet är redan betalda. Marknadsföring som fyller
          tiderna med rätt patienter blir därför till stor del ren marginal.
        </p>
      </Reveal>

      {/* The flow — read in three seconds */}
      <Reveal delay={100}>
        <div className="mt-12 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {FLOW.map((step, i) => (
            <div key={step.label} className="flex items-center gap-3 sm:flex-1">
              <div
                className={`flex-1 rounded-xl border px-4 py-4 ${
                  step.accent
                    ? "border-brand/30 bg-white shadow-[0_1px_0_rgba(16,61,69,0.03),0_18px_36px_-26px_rgba(16,61,69,0.3)]"
                    : "border-ink/12 bg-white/60"
                }`}
              >
                <div
                  className={`font-display text-base font-bold tracking-tightest ${
                    step.accent ? "text-brand" : "text-ink"
                  }`}
                >
                  {step.label}
                </div>
                {step.sub && (
                  <div className="mt-0.5 text-[12px] leading-snug text-ink/50">{step.sub}</div>
                )}
              </div>
              {i < FLOW.length - 1 && (
                <div className="flex justify-center sm:px-1">
                  <Arrow />
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink/45">
          Illustration av principen. Vill ni se siffrorna för er egen klinik går
          vi igenom dem i ett samtal.
        </p>
      </Reveal>
    </section>
  );
}
