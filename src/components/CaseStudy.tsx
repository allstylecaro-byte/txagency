"use client";

import { Reveal } from "./Reveal";

// A real result, presented as a restrained editorial proof block — not a loud
// banner or dashboard. The claim is exact and anonymised: 14 new patients in
// the first week for a Swedish dental clinic after our marketing launched.
export function CaseStudy() {
  return (
    <section
      id="case"
      data-nav-theme="dark"
      className="scroll-mt-20 border-t border-ink-line bg-ink-deep px-6 py-24 lg:pl-72 lg:pr-16 lg:py-28"
    >
      <Reveal>
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-[auto_1fr]">
          {/* The number */}
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
                <span className="mt-1 block text-brand-light">på första veckan</span>
              </span>
            </div>
          </div>

          {/* The context */}
          <div className="lg:border-l lg:border-ink-line lg:pl-16">
            <p className="max-w-md text-lg leading-relaxed text-cream/75">
              Ett verkligt resultat från en svensk tandvårdsklinik efter
              lanseringen av vår marknadsföring.
            </p>
            <div className="mt-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.14em] text-cream/45">
              <span>Svensk tandvårdsklinik</span>
              <span aria-hidden="true" className="h-1 w-1 bg-cream/25" />
              <span>Första veckan efter lansering</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
