"use client";

import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";
import { Counter } from "./Counter";
import { useInView } from "./useInView";
import { RevenueCalculator } from "./calculators/RevenueCalculator";

// Before/after week calendar — the marginal-economics argument made visual:
// the chair, the room and the team are already paid for, so a fuller book
// (especially high-value implant/Invisalign consults) is almost pure margin.
// The "after" calendar fills in on scroll. Clearly an illustration.

type Ev = { day: number; start: number; span?: number; type: EvType };
type EvType = "kontroll" | "hygien" | "akut" | "implantat" | "invisalign";

const DAYS = ["Mån", "Tis", "Ons", "Tor", "Fre"];
const TIMES = ["08", "09", "10", "11", "12", "13", "14", "15", "16"];

const LABEL: Record<EvType, string> = {
  kontroll: "Kontroll",
  hygien: "Hygienist",
  akut: "Akut",
  implantat: "Implantat",
  invisalign: "Invisalign",
};

// low-value/routine vs high-value (brand-coloured)
const STYLE: Record<EvType, string> = {
  hygien: "bg-white text-ink/50 ring-1 ring-inset ring-ink/10",
  kontroll: "bg-cream-soft text-ink/55",
  akut: "bg-sage/85 text-cream",
  implantat: "bg-brand text-cream",
  invisalign: "bg-brand-dark text-cream",
};

const BEFORE: Ev[] = [
  { day: 0, start: 0, type: "kontroll" },
  { day: 0, start: 2, type: "hygien" },
  { day: 0, start: 4, type: "kontroll" },
  { day: 0, start: 7, type: "hygien" },
  { day: 1, start: 1, type: "kontroll" },
  { day: 1, start: 3, type: "kontroll" },
  { day: 1, start: 6, type: "akut" },
  { day: 2, start: 0, type: "hygien" },
  { day: 2, start: 3, type: "kontroll" },
  { day: 2, start: 7, type: "kontroll" },
  { day: 3, start: 2, type: "kontroll" },
  { day: 3, start: 5, type: "hygien" },
  { day: 4, start: 1, type: "kontroll" },
  { day: 4, start: 4, type: "akut" },
  { day: 4, start: 8, type: "hygien" },
];

// A strong-but-believable "good week": ~78% booked, with two high-value
// blocks (implant + Invisalign) most days and a few slots deliberately left
// open for admin, akut and breathing room. Matches the 78% target below.
const AFTER: Ev[] = [
  { day: 0, start: 0, span: 2, type: "implantat" },
  { day: 0, start: 2, type: "hygien" },
  { day: 0, start: 3, type: "kontroll" },
  { day: 0, start: 5, span: 2, type: "invisalign" },
  { day: 0, start: 7, type: "kontroll" },
  { day: 1, start: 0, type: "kontroll" },
  { day: 1, start: 1, span: 2, type: "implantat" },
  { day: 1, start: 3, type: "hygien" },
  { day: 1, start: 4, type: "kontroll" },
  { day: 1, start: 6, span: 2, type: "invisalign" },
  { day: 2, start: 0, type: "hygien" },
  { day: 2, start: 1, type: "kontroll" },
  { day: 2, start: 2, span: 2, type: "implantat" },
  { day: 2, start: 5, type: "kontroll" },
  { day: 2, start: 6, span: 2, type: "invisalign" },
  { day: 3, start: 0, type: "kontroll" },
  { day: 3, start: 1, span: 2, type: "invisalign" },
  { day: 3, start: 3, type: "hygien" },
  { day: 3, start: 4, span: 2, type: "implantat" },
  { day: 3, start: 7, type: "akut" },
  { day: 4, start: 0, span: 2, type: "implantat" },
  { day: 4, start: 2, type: "kontroll" },
  { day: 4, start: 3, type: "hygien" },
  { day: 4, start: 5, span: 2, type: "invisalign" },
  { day: 4, start: 7, type: "kontroll" },
];

function slots(evs: Ev[]) {
  return evs.reduce((n, e) => n + (e.span ?? 1), 0);
}
const TOTAL = DAYS.length * TIMES.length;

function Calendar({
  title,
  tag,
  events,
  animate = false,
}: {
  title: string;
  tag: string;
  events: Ev[];
  animate?: boolean;
}) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const on = !animate || inView;

  return (
    <figure className="m-0">
      <div
        className={`rounded-2xl bg-white p-4 shadow-[0_1px_0_rgba(16,61,69,0.03),0_22px_44px_-28px_rgba(16,61,69,0.32)] ring-1 ring-inset sm:p-5 ${
          animate ? "ring-brand/25" : "ring-ink/[0.08]"
        }`}
      >
        <div className="mb-3 flex items-center justify-between border-b border-ink/10 pb-3">
          <span className="flex items-center gap-2 font-display text-base font-bold tracking-tightest text-ink">
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${animate ? "bg-brand" : "bg-ink/20"}`}
            />
            {title}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
            {tag}
          </span>
        </div>

        {/* week grid */}
        <div
          ref={ref}
          className="grid select-none gap-y-0"
          style={{ gridTemplateColumns: "1.6rem repeat(5, 1fr)" }}
        >
          {/* header row */}
          <span />
          {DAYS.map((d) => (
            <span
              key={d}
              className="pb-1 text-center text-[9px] font-bold uppercase tracking-[0.1em] text-ink/40"
            >
              {d}
            </span>
          ))}

          {/* time labels + empty cells (the faint grid) */}
          {TIMES.map((t, r) => (
            <span
              key={"t" + t}
              className="pr-1 text-right text-[8px] font-bold tabular-nums text-ink/30"
              style={{ gridColumn: 1, gridRow: r + 2, lineHeight: "30px" }}
            >
              {t}
            </span>
          ))}
          {TIMES.map((_, r) =>
            DAYS.map((__, c) => (
              <span
                key={`c${r}-${c}`}
                className="border-b border-l border-ink/[0.06]"
                style={{ gridColumn: c + 2, gridRow: r + 2, height: 30 }}
              />
            )),
          )}

          {/* events */}
          {events.map((e, i) => {
            const span = e.span ?? 1;
            const high = e.type === "implantat" || e.type === "invisalign";
            return (
              <span
                key={i}
                className={`z-10 m-[2px] flex items-center justify-center overflow-hidden rounded-md px-1 text-center text-[8px] font-bold leading-tight sm:text-[9px] ${STYLE[e.type]}`}
                style={{
                  gridColumn: e.day + 2,
                  gridRow: `${e.start + 2} / span ${span}`,
                  opacity: on ? 1 : 0,
                  transform: on ? "none" : "scale(0.85)",
                  transition: "opacity .45s ease, transform .45s ease",
                  transitionDelay: animate ? `${0.15 + i * 0.035}s` : "0s",
                  boxShadow: high ? "0 4px 10px -4px rgba(240,87,63,0.5)" : "none",
                }}
              >
                {LABEL[e.type]}
              </span>
            );
          })}
        </div>
      </div>
    </figure>
  );
}

export function CalendarBooking() {
  const beforePct = Math.round((slots(BEFORE) / TOTAL) * 100);
  const afterPct = Math.round((slots(AFTER) / TOTAL) * 100);

  return (
    <section
      data-nav-theme="light"
      className="scroll-mt-20 border-t border-ink/10 bg-cream-soft px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
          Samma stol, samma timmar
        </div>
        <HighlightReveal
          as="h2"
          barTheme="light"
          className="mt-4 font-display text-3xl font-bold leading-tight tracking-tightest text-ink sm:text-4xl md:text-5xl"
          lines={["Skillnaden är vad som", "står i kalendern."]}
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-sage">
          Stolen, lokalen och teamet är redan betalda. En halvfull vecka och en
          fullbokad vecka kostar er nästan lika mycket att driva — men den ena
          betalar räkningarna och den andra bygger kliniken.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
        <Reveal>
          <Calendar title="Idag" tag="Illustration" events={BEFORE} />
        </Reveal>
        <Reveal delay={120}>
          <Calendar title="Med TXagency" tag="Illustration" events={AFTER} animate />
        </Reveal>
      </div>

      {/* Interactive marginal-economics calculator — the clinic drags in its
          own numbers and sees the tillkommande årsomsättning update live. */}
      <Reveal className="mt-12">
        <RevenueCalculator />
      </Reveal>

      {/* legend + punchline */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <Reveal>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-sage">
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-3.5 rounded-[2px] bg-brand" /> Implantat
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-3.5 rounded-[2px] bg-brand-dark" /> Invisalign
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-3.5 rounded-[2px] bg-sage/85" /> Akut
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2.5 w-3.5 rounded-[2px] bg-cream-soft ring-1 ring-inset ring-ink/15" />{" "}
              Kontroll / hygienist
            </span>
          </div>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/70">
            Varje ny tid — särskilt en implantat- eller Invisalign­konsultation —
            landar ovanpå kostnader ni redan bär. Det är där marginalen finns.
            Vårt jobb är att fylla de tomma rutorna med rätt sorts besök.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="flex items-end gap-6 border-l-2 border-brand/60 pl-6">
            <div>
              <div className="font-display text-2xl font-bold tracking-tightest text-ink/40">
                {beforePct}%
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
                Beläggning idag
              </div>
            </div>
            <span className="pb-6 text-2xl text-sage" aria-hidden="true">
              →
            </span>
            <div>
              <div className="flex items-baseline gap-1">
                <Counter
                  to={afterPct}
                  className="font-display text-4xl font-bold tabular-nums tracking-tightest text-ink"
                />
                <span className="font-display text-2xl font-bold text-ink">%</span>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                Målet vi jobbar mot
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <p className="mt-8 max-w-xl text-sm leading-relaxed text-sage">
        Illustration av principen, inte en prognos för er klinik. Faktisk
        beläggning beror på område, behandlingsmix och utgångsläge.
      </p>
    </section>
  );
}
