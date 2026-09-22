import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";

export function About() {
  return (
    <section
      id="om-oss"
      data-nav-theme="dark"
      className="scroll-mt-20 border-t border-ink-line bg-ink px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        {/* Founder — designed portrait: a standing rectangle with a coral
            square accent (echoing the brand's square motif) and the name/role
            on a soft gradient at the base. */}
        <div className="w-[248px] max-w-full">
          <div className="relative">
            {/* coral square accent — echoes the brand's square motif */}
            <span
              className="absolute -left-3 -top-3 h-16 w-16 bg-brand"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-lg border border-cream/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/founder.webp"
                alt="Grundaren av TX Agency"
                width={800}
                height={800}
                className="aspect-[4/5] w-full object-cover object-[50%_20%]"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-display text-lg font-bold tracking-tightest text-cream">
              Hugo
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
              Grundare · TX Agency
            </div>
          </div>
        </div>

        {/* Story */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
            Om oss
          </div>
          <HighlightReveal
            as="h2"
            barTheme="dark"
            className="mt-4 text-3xl font-display font-bold leading-tight tracking-tightest text-cream sm:text-4xl"
            lines={["Marknadsföring ska inte vara", "en gissningslek."]}
          />
          <div className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-cream/70">
            <p>
              Jag har byggt och drivit Google Ads-kampanjer inom
              konkurrensutsatt e-handel — med upp till 10× avkastning på
              annonsbudgeten. Där avgör varje krona och varje litet
              optimeringstillfälle vem som vinner trafiken.
            </p>
            <p>
              Samma disciplin — att aldrig optimera en kanal isolerat, utan
              alltid utgå från vad som faktiskt blir en bokad behandling — och
              samma tekniska djup i webbutveckling, ligger bakom hur jag bygger
              och driver klinikers hemsidor, annonsering och spårning idag.
            </p>
            <p className="text-cream/85">
              TX Agency är litet med flit. Ni pratar direkt med mig, inte en
              account manager i tredje led — och ni äger allt vi bygger.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
