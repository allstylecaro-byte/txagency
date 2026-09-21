"use client";

import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";
import { Counter } from "./Counter";
import { useInView } from "./useInView";

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
      <div className="border border-ink/12 bg-white p-4 sm:p-5">
        <div className="mb-3 flex items-baseline justify-between border-b border-ink/10 pb-3">
          <span className="font-display text-base font-bold tracking-tightest text-ink">
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
                className={`z-10 m-[2px] flex items-center justify-center overflow-hidden rounded-[3px] px-1 text-center text-[8px] font-bold leading-tight sm:text-[9px] ${STYLE[e.type]}`}
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

      {/* revenue räkneexempel — a refined panel that makes the marginal-economics
          argument land in kronor. Clearly an example, never a guarantee. */}
      <Reveal>
        <div className="relative mt-12 overflow-hidden rounded-3xl p-8 sm:p-10" style={{ background: "linear-gradient(135deg,#0e343b,#0a2b31 60%,#123f47)" }}>
          <span className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-brand/20 blur-3xl" aria-hidden="true" />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Räkneexempel · omsättning
              </div>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/85">
                Säg att <strong className="font-semibold text-cream">en</strong> av de nya
                tiderna varje vecka blir en implantatbehandling. Bara den skillnaden —
                ungefär ett implantat i veckan — landar ovanpå kostnader ni redan bär.
              </p>
              <div className="mt-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl bg-black/20 px-3 py-2 text-[13px] font-semibold text-cream/70">
                <span>1 / vecka</span><span className="text-brand-light">×</span>
                <span>~45 veckor</span><span className="text-brand-light">×</span>
                <span>~35 000 kr</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-cream/45">
                Siffrorna är ett exempel, inte en garanti — verkligt värde beror på
                behandlingsmix och pris hos er.
              </p>
            </div>
            <div className="rounded-2xl border border-cream/12 bg-white/[0.06] p-6 text-center lg:min-w-[15rem]">
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-display text-3xl font-bold text-brand-light">≈</span>
                <Counter to={1575000} className="font-display text-5xl font-bold tabular-nums tracking-tightest text-cream sm:text-6xl" />
              </div>
              <div className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-light">
                kr / år i tillkommande omsättning
              </div>
              {/* small illustrative growth bars */}
              <div className="mt-5 flex items-end justify-center gap-1.5" aria-hidden="true">
                {[34, 46, 40, 58, 66, 82, 100].map((h, i) => (
                  <span key={i} className="w-2.5 rounded-sm" style={{ height: `${h * 0.42}px`, background: i === 6 ? "#f0573f" : "rgba(233,230,221,0.22)" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
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
