import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";

// "How we work" + plain terms. Built from the agency's own model so the
// site stands on how TX Agency operates, not on a single client story.
const terms = [
  {
    big: "0 kr",
    label: "Uppstartsavgift",
    body: "Ni betalar inget för att komma igång — konton, hemsida och kampanjer sätts upp utan startkostnad.",
  },
  {
    big: "Fast",
    label: "Månadsavgift",
    body: "Ett pris ni känner till i förväg. Annonsbudgeten är separat och alltid er egen.",
  },
  {
    big: "Ert",
    label: "Ni äger allt",
    body: "Konton, hemsida och data står i ert namn. Ni är aldrig inlåsta i våra system.",
  },
];

const points = [
  {
    title: "Allt under ett tak",
    body: "Hemsida, Google Ads, SEO och spårning sköts av samma team, så delarna drar åt samma håll — istället för tre byråer som aldrig pratas vid.",
  },
  {
    title: "Personligt, ingen byråkänsla",
    body: "Ni pratar direkt med den som faktiskt gör jobbet. Inga account managers i flera led, inga vidarekopplingar.",
  },
  {
    title: "Snabb start",
    body: "Vi är igång inom dagar, inte veckor. Ni behöver inte förbereda något — vi tar det därifrån.",
  },
  {
    title: "Löpande optimering",
    body: "Vi justerar kampanjer och sidor kontinuerligt, inte bara när det är dags för en rapport.",
  },
  {
    title: "Nåbara när ni behöver",
    body: "Direktkontakt via WhatsApp och telefon. Frågor besvaras samma dag — inte nästa vecka.",
  },
  {
    title: "Kvartalsrapport med hela bilden",
    body: "Löpande insyn hela tiden, och en tydlig sammanfattning varje kvartal: vad som hänt, vad vi ändrar och varför.",
  },
];

export function HowWeWork() {
  return (
    <section
      id="sa-jobbar-vi"
      data-nav-theme="light"
      className="scroll-mt-20 border-t border-ink/10 bg-cream-soft px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
          Så jobbar vi
        </div>
        <HighlightReveal
          as="h2"
          barTheme="light"
          className="mt-4 font-display text-3xl font-bold leading-tight tracking-tightest text-ink sm:text-4xl md:text-5xl"
          lines={["Enkelt att börja.", "Inga överraskningar."]}
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-sage">
          Ni ska kunna säga ja utan att läsa finstilt. Därför håller vi både
          upplägget och priset rakt — och ni äger allt vi bygger.
        </p>
      </Reveal>

      {/* Terms strip */}
      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-ink/12 bg-ink/12 sm:grid-cols-3">
        {terms.map((t, i) => (
          <Reveal key={t.label} delay={i * 80} className="bg-cream-soft p-6">
            <div className="font-display text-4xl font-bold tracking-tightest text-ink">
              {t.big}
            </div>
            <span
              className="grow-x mt-3 block h-[3px] w-10 bg-brand"
              aria-hidden="true"
            />
            <div className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-sage">
              {t.label}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{t.body}</p>
          </Reveal>
        ))}
      </div>

      {/* Working model */}
      <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 border-t border-ink/12 pt-10 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((p, i) => (
          <Reveal key={p.title} delay={i * 60}>
            <h3 className="flex items-baseline gap-3 font-display text-lg font-bold tracking-tightest text-ink">
              <span
                className="h-2 w-2 shrink-0 translate-y-[-1px] bg-brand"
                aria-hidden="true"
              />
              {p.title}
            </h3>
            <p className="mt-2 pl-5 text-sm leading-relaxed text-sage">
              {p.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
