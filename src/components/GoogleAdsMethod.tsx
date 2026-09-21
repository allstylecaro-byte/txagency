import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";

const steps = [
  {
    title: "Vi jagar rätt sökningar, inte flest",
    body: "Hög-intent lokala sökningar — akut tandvärk, implantat, specifika behandlingar × ort. Där finns patienterna som är redo att boka, inte bara läsa.",
  },
  {
    title: "Vi stänger ute det som bränner budget",
    body: "Negativa sökord filtrerar bort jobbsökare, ”gratis”, utbildning och nyfikna. Varje krona går till möjliga patienter, inte till slösklick.",
  },
  {
    title: "Annonserna svarar på tvekan",
    body: "Pris, akuttider och trygghet står redan i annonsen — det patienten faktiskt undrar innan de ringer, inte bara ett kliniknamn.",
  },
  {
    title: "Klicket landar på rätt sida",
    body: "Ingen generisk startsida. En landningssida per behandling och ort, med numret överst och bokning ett tryck bort.",
  },
  {
    title: "Vi bjuder efter bokade tider — inte klick",
    body: "Budstrategi och budget styrs mot det som faktiskt blir bokade behandlingar och en rimlig kostnad per patient, inte mot det billigaste klicket.",
  },
  {
    title: "Allt mäts, hela vägen",
    body: "Samtal, formulär och bokningar spåras, så vi vet vilken krona som blev en patient — och kan flytta budgeten dit den jobbar hårdast.",
  },
];

// A small illustrative Google search-ad result — reinforces the Google Ads
// theme without needing a photo. Clearly labelled as an example.
function AdMock() {
  return (
    <figure className="m-0">
      <div className="border border-cream/15 bg-ink-deep/60 p-5">
        <div className="flex items-baseline justify-between border-b border-cream/10 pb-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-cream/50">
            Google · ”akut tandläkare stockholm”
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
            Exempel
          </span>
        </div>
        <div className="pt-4">
          <div className="flex items-center gap-2 text-xs text-cream/60">
            <span className="rounded-sm border border-cream/25 px-1 py-0.5 text-[9px] font-bold uppercase tracking-wide">
              Annons
            </span>
            <span>er-tandklinik.se/akut-tandvard</span>
          </div>
          <div className="mt-1.5 font-display text-lg font-bold tracking-tightest text-brand-ondark">
            Akut tandläkare i Stockholm — tid idag
          </div>
          <p className="mt-1 max-w-md text-sm leading-relaxed text-cream/70">
            Ont nu? Vi tar emot akuta besök samma dag. Ring direkt eller boka
            online — tydligt pris innan du kommer.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cream/45">
            <span>Ring: 08–000 00 00</span>
            <span>·</span>
            <span>Boka tid</span>
            <span>·</span>
            <span>Öppet nu</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-cream/50">
        Så ser en annons ut när den är byggd för den som redan har ont — inte
        för den som råkar klicka.
      </figcaption>
    </figure>
  );
}

export function GoogleAdsMethod() {
  return (
    <section
      id="google-ads"
      data-nav-theme="dark"
      className="scroll-mt-20 border-t border-ink-line bg-ink-deep px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-3xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
          Så jobbar vi med Google Ads
        </div>
        <HighlightReveal
          as="h2"
          barTheme="dark"
          className="mt-4 font-display text-3xl font-bold leading-tight tracking-tightest text-cream sm:text-4xl md:text-5xl"
          lines={["Annonser som betalar sig,", "inte bara syns."]}
        />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/70">
          Erfarenhet av Google Ads i konkurrensutsatt e-handel — med upp till
          10× avkastning på annonsbudgeten — ligger bakom hur vi driver
          annonseringen för er klinik. Samma disciplin, riktad mot bokade tider.
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/70">
          Ett typiskt upplägg: en annonsbudget kring{" "}
          <span className="font-semibold text-cream">10 000 kr/mån</span>, med
          målet att få tillbaka runt{" "}
          <span className="font-semibold text-cream">10×</span> i
          behandlingsvärde. Hur nära vi kommer beror på behandlingsmix och
          område — vi lovar aldrig en siffra, vi optimerar mot den.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div className="border-t border-cream/15">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 60}>
              <div className="grid grid-cols-1 gap-2 border-b border-cream/15 py-7 lg:grid-cols-[2.5rem_1fr] lg:gap-6">
                <span className="font-display text-sm font-bold tabular-nums text-brand-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tightest text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-cream/60">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} className="lg:pt-8">
          <AdMock />
        </Reveal>
      </div>
    </section>
  );
}
