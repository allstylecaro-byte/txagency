import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";

const steps = [
  {
    number: "01",
    title: "Vi går igenom er klinik",
    body: "En kort genomgång av er hemsida, annonsering och synlighet idag, så vi ser exakt var ni tappar patienter i resan från sökning till bokning.",
  },
  {
    number: "02",
    title: "Ni får en tydlig plan",
    body: "Prioriterad efter vad som ger flest bokade tider snabbast — inte efter vad som är enklast för oss att sälja.",
  },
  {
    number: "03",
    title: "Vi sätter igång och mäter",
    body: "Vi bygger, annonserar och spårar varje steg — från klick till bokad behandling — och rapporterar resultatet löpande, inte bara i efterhand.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      data-nav-theme="light"
      className="scroll-mt-20 bg-cream px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
          Kom igång
        </div>
        <HighlightReveal
          as="h2"
          barTheme="light"
          className="mt-4 text-3xl font-display font-bold leading-tight tracking-tightest text-ink sm:text-4xl md:text-5xl"
          lines={["Tre steg.", "Så funkar det."]}
        />
      </Reveal>

      <div className="mt-16 border-t border-ink/15">
        {steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 100}>
            <div className="grid grid-cols-1 gap-2 border-b border-ink/15 py-8 sm:gap-6 lg:grid-cols-[6rem_16rem_1fr] lg:items-baseline lg:gap-10">
              <span className="text-3xl font-display font-bold tracking-tightest text-ink/40">
                {step.number}
              </span>
              <h3 className="text-xl font-bold text-ink">{step.title}</h3>
              <p className="max-w-lg text-sm leading-relaxed text-ink/60">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
