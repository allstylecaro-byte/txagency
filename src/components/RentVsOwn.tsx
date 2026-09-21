import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";
import { CostChart } from "./CostChart";

// Conceptual "rent vs own" chart, mirroring the reference site's cost
// graph — but with no fabricated kronor figures. It illustrates the
// argument (rent builds nothing you keep; your own visibility compounds
// into an asset), clearly labelled as an illustration, not a projection.
export function RentVsOwn() {
  return (
    <section
      data-nav-theme="light"
      className="scroll-mt-20 border-t border-ink/10 bg-cream-soft px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
          Kostnaden
        </div>
        <HighlightReveal
          as="h2"
          barTheme="light"
          className="mt-4 text-3xl font-display font-bold leading-tight tracking-tightest text-ink sm:text-4xl md:text-5xl"
          lines={["Varje månad ni hyr leads", "är pengar ni aldrig äger."]}
        />
        <p className="mt-6 text-lg leading-relaxed text-sage">
          Betalar ni en portal för leads hyr ni tillgång till en patient som
          säljs till flera kliniker samtidigt. Slutar ni betala slutar allt med
          det samma. Er egen synlighet byggs istället upp till något ni behåller.
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-14 max-w-3xl">
        <figure className="m-0">
          <CostChart />
          <div className="mt-2 flex justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
            <span>Idag</span>
            <span>Månad 12</span>
            <span>Månad 24</span>
          </div>

          <figcaption className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <span className="grid grid-cols-[auto_1fr] items-start gap-3 text-sm text-sage">
              <span className="mt-1.5 h-2.5 w-2.5 bg-ink" aria-hidden="true" />
              <span>
                <b className="font-bold text-ink">Egen synlighet.</b> Byggs upp
                månad för månad till en tillgång ni äger.
              </span>
            </span>
            <span className="grid grid-cols-[auto_1fr] items-start gap-3 text-sm text-sage">
              <span className="mt-1.5 h-2.5 w-2.5 bg-sage" aria-hidden="true" />
              <span>
                <b className="font-bold text-ink">Hyrda leads.</b> …och den dag
                ni slutar betala är allt borta.
              </span>
            </span>
          </figcaption>
        </figure>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-sage">
          Illustration av principen, inte en prognos för er klinik. De faktiska
          siffrorna beror på bransch, område och utgångsläge.
        </p>
      </Reveal>
    </section>
  );
}
