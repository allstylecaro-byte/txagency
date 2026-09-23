import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";
import { BookingButton } from "./BookingButton";

const bands = [
  {
    no: "01",
    title: "Skicka era uppgifter",
    body: "Ett kort samtal och några rader om kliniken: era behandlingar, ert område och var ni tappar patienter idag.",
    shade: "bg-[#d63d25]",
    indent: "",
  },
  {
    no: "02",
    title: "Vi bygger och kopplar på",
    body: "Hemsida, annonser, SEO och spårning — allt satt så att det pratar ihop, och varje steg mätbart från klick till bokad tid.",
    shade: "bg-[#c2361f]",
    indent: "lg:ml-[6%]",
  },
  {
    no: "03",
    title: "Telefonen ringer",
    body: "Varje förfrågan landar hos er direkt, och rapporten visar antalet i svart på vitt — inte bara en känsla.",
    shade: "bg-[#ab2e1a]",
    indent: "lg:ml-[12%]",
  },
];

export function StartCta() {
  return (
    <section
      id="start"
      data-nav-theme="light"
      className="scroll-mt-20 overflow-hidden bg-cream px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
          Kom igång
        </div>
        <HighlightReveal
          as="h2"
          barTheme="light"
          className="mt-4 text-3xl font-display font-bold leading-tight tracking-tightest text-ink sm:text-4xl md:text-5xl"
          lines={["Äg ert område."]}
        />
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-sage">
          Ett kort samtal, sedan bygger vi. Ni behöver inte förbereda något —
          vi tar det därifrån.
        </p>
      </Reveal>

      <ol className="mt-14 list-none border-b border-ink/15 p-0">
        {bands.map((band, i) => (
          <Reveal
            key={band.no}
            as="li"
            delay={i * 90}
            className={`grid grid-cols-1 items-baseline gap-2 border-t border-white/25 px-6 py-7 text-white sm:grid-cols-[4rem_15rem_1fr] sm:gap-8 lg:w-[88%] ${band.shade} ${band.indent}`}
          >
            <span className="font-display text-base font-bold tabular-nums text-white">
              {band.no}
            </span>
            <span className="font-display text-xl font-bold leading-tight tracking-tightest">
              {band.title}
            </span>
            <span className="max-w-md text-sm leading-relaxed text-white">
              {band.body}
            </span>
          </Reveal>
        ))}
      </ol>

      <div className="mt-10 flex justify-start lg:justify-end lg:pr-[12%]">
        <BookingButton>Boka samtal</BookingButton>
      </div>
    </section>
  );
}
