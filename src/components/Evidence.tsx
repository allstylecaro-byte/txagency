import { Reveal } from "./Reveal";
import { Counter } from "./Counter";
import { Sparkline } from "./Sparkline";

// Two dense proof cards, mirroring the reference site's evidence grid:
// a local-results "map pack" and an example monthly report. Both are
// clearly labelled as illustration/example — no real clinic data is
// implied — exactly as the reference does with its own demo figures.

function Stars({ on = 5 }: { on?: number }) {
  return (
    <span className="inline-flex gap-[2px]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 ${i < on ? "bg-sage" : "bg-ink/20"}`}
        />
      ))}
    </span>
  );
}

function MapPack() {
  return (
    <figure className="max-w-md">
      <div className="border border-ink/12 bg-white p-4 sm:p-5">
        <div className="flex items-baseline justify-between border-b border-ink/12 pb-3">
          <span className="font-display text-base font-bold tracking-tightest text-ink">
            Lokala resultat
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
            Illustration
          </span>
        </div>
        <ol className="m-0 list-none p-0">
          {[
            { rating: "4,9", reviews: "128 recensioner" },
            { rating: "4,7", reviews: "64 recensioner" },
          ].map((row, i) => (
            <li
              key={i}
              className="grid grid-cols-[1.4rem_1fr] items-start gap-3 border-b border-ink/12 py-3.5"
            >
              <span className="font-display text-sm font-bold text-sage">
                {i + 1}
              </span>
              <span>
                <span className="block h-3 w-[62%] rounded-sm bg-cream-soft" aria-hidden="true" />
                <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-sage">
                  <Stars />
                  <span className="font-bold text-ink">{row.rating}</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-ink/25" aria-hidden="true" />
                  <span>{row.reviews}</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-ink/25" aria-hidden="true" />
                  <span>Öppet nu</span>
                </span>
              </span>
            </li>
          ))}
          <li className="mt-3.5 overflow-hidden rounded-sm border border-dashed border-ink/30 px-3 py-3.5">
            <span className="grid grid-cols-[1.4rem_1fr] items-start gap-3">
              <span className="font-display text-sm font-bold text-sage">3</span>
              <span>
                <span className="font-bold text-ink">Er klinik</span>
                <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-sage">
                  <span className="inline-flex gap-[2px]" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 border border-brand"
                      />
                    ))}
                  </span>
                  <span>Era recensioner</span>
                  <span className="h-[3px] w-[3px] rounded-full bg-ink/25" aria-hidden="true" />
                  <span>Öppet nu</span>
                </span>
              </span>
            </span>
          </li>
        </ol>
      </div>
      <figcaption className="mt-4 max-w-md text-sm leading-relaxed text-ink/70">
        En av de tre platserna i kartresultaten som patienter i er stad
        faktiskt ringer. Det är dit vi jobbar — och vi mäter det varje månad
        och visar er.
      </figcaption>
    </figure>
  );
}

function Report() {
  const cards = [
    { label: "Besök", to: 214 },
    { label: "Förfrågningar", to: 9 },
    { label: "Samtal", to: 17 },
    { label: "Topp-sökning", value: "akut tandläkare stockholm", text: true },
  ];
  const queries: [string, number][] = [
    ["akut tandläkare stockholm", 38],
    ["tandläkare nära mig", 31],
    ["tandimplantat stockholm", 22],
    ["tandblekning pris stockholm", 14],
  ];
  const qMax = Math.max(...queries.map(([, n]) => n));
  // A calm sparkline for illustration only.
  const pts = [17, 15, 18, 8, 13, 18, 15, 8, 13, 15, 8, 3, 8, 13, 15, 10, 5, 13, 13, 18, 13, 8, 10, 15, 13, 15, 15, 10, 13, 15];

  return (
    <figure className="max-w-lg">
      <div className="border border-ink/12 bg-white p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-ink/12 pb-4">
          <div>
            <div className="font-display text-lg font-bold tracking-tightest text-ink">
              Exempelklinik
            </div>
            <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
              Illustrativt · ej verklig kund
            </div>
          </div>
          <span className="shrink-0 border border-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
            Exempel
          </span>
        </div>

        <dl className="grid grid-cols-2">
          {cards.map((c, i) => (
            <div
              key={c.label}
              className={`border-b border-ink/12 py-4 ${
                i % 2 === 0 ? "border-r border-ink/12 pr-4" : "pl-4"
              }`}
            >
              <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
                {c.label}
              </dt>
              <dd
                className={`mt-1.5 font-display font-bold tracking-tightest text-ink ${
                  c.text ? "text-sm leading-snug" : "text-3xl"
                }`}
              >
                {c.text ? c.value : <Counter to={c.to as number} />}
              </dd>
              {!c.text && (
                <span
                  className="grow-x mt-2 block h-[3px] w-10 bg-brand"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </dl>

        <div className="border-b border-ink/12 py-4">
          <div className="flex items-baseline justify-between text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
            <span>Besök, senaste 30 dagarna</span>
            <span className="text-ink">214</span>
          </div>
          <Sparkline points={pts} className="mt-3" height={48} />
        </div>

        <div className="mt-4">
          <div className="pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
            Vad de sökte
          </div>
          <ul className="m-0 list-none p-0">
            {queries.map(([q, n], i) => (
              <li
                key={q}
                className={`py-2.5 ${
                  i < queries.length - 1 ? "border-b border-ink/12" : ""
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-xs font-medium text-sage">{q}</span>
                  <span className="text-xs font-bold text-ink tabular-nums">
                    {n}
                  </span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-ink/8">
                  <span
                    className="grow-x block h-full rounded-full bg-sage"
                    style={{
                      width: `${(n / qMax) * 100}%`,
                      transitionDelay: `${i * 120}ms`,
                    }}
                    aria-hidden="true"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <figcaption className="mt-4 text-sm text-ink/70">Exempelrapport.</figcaption>
    </figure>
  );
}

export function Evidence() {
  return (
    <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
      <Reveal>
        <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
          Syns där patienter faktiskt letar
        </div>
        <MapPack />
      </Reveal>
      <Reveal delay={100}>
        <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
          Bevis, svart på vitt
        </div>
        <Report />
      </Reveal>
    </div>
  );
}
