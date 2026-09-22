import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";
import { Evidence } from "./Evidence";

const entries = [
  {
    title: "En hemsida byggd för att få telefonen att ringa",
    body: "Laddar på under en sekund, ert nummer högst upp, ett bokningsformulär för de som planerar och klicka-för-att-ringa för de akuta.",
  },
  {
    title: "Syns där patienterna faktiskt letar",
    body: "Google, Google Maps — och nu AI-verktyg som ChatGPT, som redan svarar på ”bästa tandläkaren nära mig”. Vi bygger det de letar efter och kontrollerar att ni dyker upp.",
  },
  {
    title: "Recensioner som jobbar för er",
    body: "Era bästa omdömen, betyg och områden framför varje besökare som just då bestämmer sig för vilken klinik de ska boka.",
  },
  {
    title: "Bevis, svart på vitt",
    body: "Hur många besökte sidan, hur många hörde av sig, hur många tryckte för att ringa. Löpande insyn och en tydlig sammanfattning varje kvartal — ni vet exakt vad sidan gör för er.",
  },
];

export function Solution() {
  return (
    <section
      id="losningen"
      data-nav-theme="light"
      className="scroll-mt-20 bg-cream px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <div className="relative">
        <Reveal className="relative max-w-2xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
            Lösningen
          </div>
          <HighlightReveal
            as="h2"
            barTheme="light"
            className="mt-4 text-3xl font-display font-bold leading-tight tracking-tightest text-ink sm:text-4xl md:text-5xl"
            lines={["En patientström ni äger.", "Inte tur, inte rekommendationer."]}
          />
        </Reveal>

        <div className="relative mt-14 border-t border-ink/12">
          {entries.map((entry, i) => (
            <Reveal key={entry.title} delay={i * 80}>
              <div className="border-b border-ink/12 py-8">
                <h3 className="flex items-baseline gap-3 text-lg font-bold text-ink">
                  <span
                    className="mt-1 h-2 w-2 shrink-0 bg-brand"
                    aria-hidden="true"
                  />
                  {entry.title}
                </h3>
                <p className="mt-2 max-w-2xl pl-5 text-sm leading-relaxed text-sage">
                  {entry.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Evidence />
      </div>
    </section>
  );
}
