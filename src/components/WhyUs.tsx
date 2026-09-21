import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";

const rows = [
  { them: "Bindande avtal och uppstartsavgift", us: "Ingen bindning, 0 kr i uppstart" },
  { them: "Ni pratar med en account manager", us: "Ni pratar direkt med Hugo" },
  { them: "Tre byråer för webb, ads och SEO", us: "Allt under ett tak, samspelat" },
  { them: "Optimerar mot klick och trafik", us: "Optimerar mot bokade patienter" },
  { them: "Veckor av onboarding innan start", us: "Igång inom dagar, inte veckor" },
  { them: "Rapport en gång i månaden, om ens det", us: "Nåbar löpande + kvartalssammanfattning" },
  { them: "Kontona står i byråns namn", us: "Ni äger alla konton och all data" },
];

export function WhyUs() {
  return (
    <section
      id="varfor-oss"
      data-nav-theme="dark"
      className="scroll-mt-20 border-t border-ink-line bg-ink px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
          Varför oss
        </div>
        <HighlightReveal
          as="h2"
          barTheme="dark"
          className="mt-4 text-3xl font-display font-bold leading-tight tracking-tightest text-cream sm:text-4xl md:text-5xl"
          lines={["Inte som en vanlig byrå."]}
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
          Ni har förmodligen blivit uppringda av byråer förr. Så här skiljer
          vi oss från de flesta av dem.
        </p>
      </Reveal>

      <div className="mt-14 border-t border-cream/15">
        {/* header row (desktop) */}
        <div className="hidden grid-cols-2 gap-8 pb-3 sm:grid">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-cream/40">
            Vanlig byrå
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
            Med TXagency
          </span>
        </div>
        {rows.map((row, i) => (
          <Reveal
            key={row.us}
            delay={i * 50}
            className="grid grid-cols-1 gap-1 border-t border-cream/15 py-5 sm:grid-cols-2 sm:gap-8"
          >
            <span className="flex items-baseline gap-3 text-sm leading-relaxed text-cream/45 line-through decoration-cream/25">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cream/25 no-underline" aria-hidden="true" />
              {row.them}
            </span>
            <span className="flex items-baseline gap-3 text-base font-semibold leading-relaxed text-cream">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand" aria-hidden="true" />
              {row.us}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
