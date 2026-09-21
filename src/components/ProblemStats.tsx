import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";
import { Counter } from "./Counter";

type Stat = {
  to?: number;
  value?: string;
  unit: string;
  label: string;
  body: string;
};

const stats: Stat[] = [
  {
    value: "10×",
    unit: "ROAS",
    label: "Bevisat i e-handel",
    body: "Byggt och drivit Google Ads-kampanjer inom konkurrensutsatt e-handel — med upp till 10× avkastning på investerad annonskrona.",
  },
  {
    value: "0",
    unit: "kr uppstart",
    label: "Inga startavgifter",
    body: "Ni betalar inget för att komma igång. En fast månadsavgift, annonsbudgeten separat — och alltid er egen.",
  },
  {
    to: 4,
    unit: "under ett tak",
    label: "Hemsida · Ads · SEO · Spårning",
    body: "Samma team sköter alla fyra delarna och optimerar dem mot ett enda mål: fler bokade tider.",
  },
  {
    value: "~10×",
    unit: "målet",
    label: "Behandlingsvärde tillbaka",
    body: "Vad ni realistiskt når beror på budget och behandlingsmix. Vi lovar aldrig ett exakt patientantal — men det är avkastningen vi optimerar mot.",
  },
];

export function ProblemStats() {
  return (
    <section
      id="siffror"
      data-nav-theme="dark"
      className="scroll-mt-20 border-t border-ink-line bg-ink px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-3xl">
        <HighlightReveal
          as="h2"
          barTheme="dark"
          className="text-3xl font-display font-bold leading-tight tracking-tightest text-cream sm:text-4xl md:text-5xl"
          lines={["Ni vill inte ha en hemsida.", "Ni vill ha fler bokade tider."]}
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
          Ingen öppnade en klinik för att fixa marknadsföring, så det behöver
          ni inte göra heller. Vi bygger hemsidan, sköter Google Ads och mäter
          varje steg fram till bokad tid. Hur många nya patienter det blir
          beror på budget och behandlingsmix — men målet vi optimerar mot är
          runt 10× tillbaka på annonsbudgeten i behandlingsvärde.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 80}
            className="border-t border-cream/15 pt-6 first:border-t lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <div className="flex items-baseline gap-2">
              {stat.value !== undefined ? (
                <span className="text-5xl font-display font-bold tabular-nums tracking-tightest text-cream">
                  {stat.value}
                </span>
              ) : (
                <Counter
                  to={stat.to as number}
                  className="text-5xl font-display font-bold tabular-nums tracking-tightest text-cream"
                />
              )}
              <span className="text-sm font-bold uppercase tracking-wide text-brand-light">
                {stat.unit}
              </span>
            </div>
            <span
              className="grow-x mt-3 block h-[3px] w-12 bg-brand"
              aria-hidden="true"
            />
            <div className="mt-3 text-xs font-bold uppercase tracking-wide text-cream/50">
              {stat.label}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-cream/60">
              {stat.body}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
