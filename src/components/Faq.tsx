"use client";

import { useState } from "react";
import { HighlightReveal } from "./HighlightReveal";
import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "Vad kostar det?",
    a: "Ingen uppstartsavgift, och en fast månadsavgift som vi sätter efter vad kliniken behöver. Annonsbudgeten är separat och alltid er egen. Boka ett kort samtal så går vi igenom upplägget — inga färdiga paket att pressa in er i.",
  },
  {
    q: "Vad behöver ni av mig?",
    a: "Ett kort samtal för att förstå kliniken, och åtkomst till era konton (Google, annonser, hemsida). Sedan sköter vi jobbet, är nåbara löpande och sammanfattar utvecklingen varje kvartal.",
  },
  {
    q: "Hur snabbt ser vi resultat?",
    a: "Google Ads kan börja generera klick och bokningar inom en vecka från kampanjstart. SEO och organisk synlighet tar längre tid att bygga — typiskt några månader innan det märks tydligt. Vi rekommenderar minst 3 månader för att kunna utvärdera det samlade resultatet rättvist.",
  },
  {
    q: "Sköter ni både hemsida och annonser?",
    a: "Ja. Hemsida, Google Ads, SEO och spårning under samma tak, så att de pratar med varandra istället för att skötas av tre olika parter som aldrig gör det.",
  },
  {
    q: "Jag har redan en hemsida — måste jag börja om?",
    a: "Inte nödvändigtvis. Vi börjar med att se var ni tappar patienter i resan från sökning till bokning och åtgärdar det som ger mest — ibland är det hemsidan, ibland annonserna, ibland spårningen.",
  },
  {
    q: "Kan ni garantera fler patienter?",
    a: "Nej — och var försiktig med den som lovar det. Vad vi kan visa är vad liknande upplägg historiskt genererat (t.ex. runt 10× tillbaka på annonsbudgeten i vårt typiska upplägg), och vi rapporterar löpande så ni ser exakt vad er egen budget faktiskt ger. Resultatet beror på område, konkurrens och behandlingsmix.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      data-nav-theme="dark"
      className="scroll-mt-20 border-t border-ink-line bg-ink-deep px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
          Raka svar
        </div>
        <HighlightReveal
          as="h2"
          barTheme="dark"
          className="mt-4 text-3xl font-display font-bold leading-tight tracking-tightest text-cream sm:text-4xl md:text-5xl"
          lines={["Frågorna ni ändå", "tänkte ställa."]}
        />
      </Reveal>

      <div className="mt-12 border-t border-ink-line">
        {faqs.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-b border-ink-line">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="grid w-full grid-cols-[3rem_1fr_auto] items-center gap-6 py-6 text-left lg:grid-cols-[5rem_1fr_auto]"
              >
                <span className="self-start pt-1 font-display text-sm font-bold tabular-nums text-cream/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl font-bold leading-tight tracking-tightest text-cream sm:text-2xl">
                  {item.q}
                </span>
                <span
                  className="relative h-4 w-4 self-center text-cream"
                  aria-hidden="true"
                >
                  <span className="absolute left-0 top-[7px] h-0.5 w-4 bg-current" />
                  <span
                    className={`absolute left-[7px] top-0 h-4 w-0.5 bg-current transition-transform duration-300 ease-osmo ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-osmo ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-6 text-base leading-relaxed text-cream/70 lg:ml-[6.5rem]">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
