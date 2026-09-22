"use client";

import { Reveal } from "./Reveal";

// A real result, presented as restrained, verifiable business data — not a
// marketing badge. Anonymised Swedish dental clinic. Estimated figures
// (first-visit value, ROAS, annual patient value) are clearly labelled as
// estimates, never guaranteed or future actual revenue.

const METRICS: { v: string; l: string; est?: boolean }[] = [
  { v: "~2 200 kr", l: "Annonskostnad" },
  { v: "~14 946 kr", l: "Första-besöksvärde", est: true },
  { v: "~6,8×", l: "Första-besöks-ROAS", est: true },
];

const BREAKDOWN = [
  "4 patienter via 599 kr-erbjudandet",
  "10 patienter via övriga kampanjer",
  "1 patient med behov av rotfyllning",
];

export function CaseStudy() {
  return (
    <section
      id="case"
      data-nav-theme="dark"
      className="scroll-mt-20 border-t border-ink-line bg-ink-deep px-6 py-24 lg:pl-72 lg:pr-16 lg:py-28"
    >
      {/* Headline: the number + what it was */}
      <Reveal>
        <div className="grid grid-cols-1 items-end gap-x-16 gap-y-8 lg:grid-cols-[auto_1fr]">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-light">
              Case · Riktigt resultat
            </div>
            <div className="mt-6 flex items-end gap-5">
              <span className="font-display text-[96px] font-bold leading-[0.82] tracking-tightest text-cream sm:text-[128px]">
                14
              </span>
              <span className="pb-2 font-display text-2xl font-bold leading-[1.05] tracking-tightest text-cream sm:text-3xl">
                nya patienter
                <span className="mt-1 block text-brand-light">på 7 dagar</span>
              </span>
            </div>
          </div>
          <div className="lg:border-l lg:border-ink-line lg:pl-16">
            <p className="max-w-md text-lg leading-relaxed text-cream/75">
              Från fyra Google Ads-kampanjer för en svensk tandvårdsklinik — den
              första veckan efter lansering.
            </p>
            <ul className="mt-6 space-y-2">
              {BREAKDOWN.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-[13px] leading-snug text-cream/55">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 bg-brand" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* Verifiable metrics — a quiet data strip */}
      <Reveal delay={100}>
        <dl className="mt-14 grid grid-cols-1 gap-x-12 gap-y-8 border-t border-ink-line pt-10 sm:grid-cols-3">
          {METRICS.map((m) => (
            <div key={m.l}>
              <dt className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-cream/40">
                {m.l}
                {m.est && (
                  <span className="rounded-sm bg-cream/10 px-1.5 py-0.5 text-[8.5px] tracking-[0.1em] text-cream/50">
                    Est.
                  </span>
                )}
              </dt>
              <dd className="mt-2 font-display text-3xl font-bold tabular-nums tracking-tightest text-cream sm:text-4xl">
                {m.v}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Secondary, long-term datapoint — kept deliberately subtle */}
      <Reveal delay={160}>
        <div className="mt-10 flex flex-col gap-3 border-t border-ink-line pt-6 sm:flex-row sm:items-baseline sm:justify-between">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm text-cream/55">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-cream/40">
              Estimerat årligt patientvärde
            </span>
            <span className="font-display font-bold tabular-nums text-cream/80">
              ~10 000–20 000 kr
            </span>
            <span className="text-cream/40">/ patient · potentiellt långsiktigt värde</span>
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-cream/35">
          Första-besöksvärde, ROAS och årligt patientvärde är estimerade
          beräkningar utifrån behandlingstyp och normala priser — inte
          garanterad eller framtida faktisk intäkt. Annonskostnad och antal
          patienter är uppmätta i kampanjperioden.
        </p>
      </Reveal>
    </section>
  );
}
