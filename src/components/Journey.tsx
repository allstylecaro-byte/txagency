function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

function IconCursor() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M5 3l14 6-6 2-2 6-6-14z" strokeLinejoin="round" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M4 5h16v10H9l-4 4V5z" strokeLinejoin="round" />
      <circle cx="9" cy="10" r="0.6" fill="currentColor" />
      <circle cx="12" cy="10" r="0.6" fill="currentColor" />
      <circle cx="15" cy="10" r="0.6" fill="currentColor" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <rect x="4" y="5" width="16" height="15" rx="1" />
      <path d="M4 9h16M8 3v4M16 3v4" strokeLinecap="round" />
      <path d="M9 14l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCross() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M12 4v16M4 12h16" strokeLinecap="round" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
      <path d="M4 19V9M11 19V5M18 19v-6" strokeLinecap="round" />
      <path d="M4 19h14" strokeLinecap="round" />
    </svg>
  );
}

const steps = [
  {
    Icon: IconTarget,
    label: "Rätt sökning",
    body: "Annonser och innehåll riktade mot vad patienter i er upptagningsyta faktiskt söker på.",
  },
  {
    Icon: IconCursor,
    label: "Klick",
    body: "En hemsida byggd för att svara på tvekan direkt — pris, förtroende och bokning, inte bara snyggt.",
  },
  {
    Icon: IconChat,
    label: "Lead",
    body: "Telefonsamtal, formulär och bokningar spåras. Inget försvinner i mörker mellan annons och kalender.",
  },
  {
    Icon: IconCalendar,
    label: "Bokad tid",
    body: "Vi ser vilka kanaler som faktiskt fyller kalendern — inte bara vilka som ger flest klick.",
  },
  {
    Icon: IconCross,
    label: "Behandling",
    body: "Leadkvalitet mäts mot vad som blir en genomförd behandling, inte mot antal formulär.",
  },
  {
    Icon: IconChart,
    label: "Resultat till er",
    body: "Ni får siffrorna varje månad: vad som fungerar, vad vi ändrar och varför.",
  },
];

export function Journey() {
  return (
    <div className="mt-20">
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
        Er kunds resa
      </div>
      <h3 className="mt-3 max-w-lg text-2xl font-display font-bold leading-tight tracking-tightest text-cream">
        Vi följer hela resan, inte bara klicket.
      </h3>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-cream/40 lg:hidden">
        Svep för att se hela resan →
      </p>

      <div className="relative -mx-6 mt-8 lg:mx-0 lg:mt-12">
        <div className="overflow-x-auto px-6 pb-4 lg:px-0">
        <div className="flex items-start gap-0">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-start">
              <div className="flex w-[190px] shrink-0 flex-col gap-3 lg:w-[170px]">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-brand text-brand-light">
                  <step.Icon />
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wide text-cream">
                  {step.label}
                </h4>
                <p className="text-xs leading-relaxed text-cream/55">
                  {step.body}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div className="mt-5 h-px w-8 shrink-0 bg-cream/20 lg:w-10" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-ink to-transparent lg:hidden"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
