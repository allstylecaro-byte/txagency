import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";

export function Case() {
  return (
    <section
      id="case"
      data-nav-theme="dark"
      className="scroll-mt-20 border-t border-ink-line bg-ink-deep px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
          Se jobbet
        </div>
        <HighlightReveal
          as="h2"
          barTheme="dark"
          className="mt-4 text-3xl font-display font-bold leading-tight tracking-tightest text-cream sm:text-4xl md:text-5xl"
          lines={["Ett riktigt bygge,", "inte skärmdumpar."]}
        />
      </Reveal>

      <Reveal
        delay={100}
        className="mt-10 flex flex-col gap-6 border border-cream/15 p-8 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:p-10"
      >
        <div className="max-w-xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
            Tandläkare · live-bygge
          </div>
          <p className="mt-3 text-lg leading-relaxed text-cream/80">
            Vill ni se hur det ser ut på riktigt? Maren Tandvård är en klinik vi
            byggt och driver — öppna den i mobilen och se hur snabbt den laddar
            och hur nära bokning och telefon ligger.
          </p>
        </div>
        <a
          href="https://marentandvard.se"
          target="_blank"
          rel="noopener noreferrer"
          className="roll shrink-0 self-start text-sm font-bold uppercase tracking-wide text-brand-light hover:text-cream sm:self-auto"
        >
          Öppna marentandvard.se <span aria-hidden="true">↗</span>
        </a>
      </Reveal>
    </section>
  );
}
