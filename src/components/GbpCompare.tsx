import { Reveal } from "./Reveal";
import { HighlightReveal } from "./HighlightReveal";

const rows = [
  { k: "Kategori", left: "Tandläkare, och inget mer", right: "Tandläkare + fyra underkategorier" },
  { k: "Tjänster", left: "Inga listade", right: "11 listade, prissatta där det hjälper" },
  { k: "Öppettider", left: "Aldrig bekräftade sedan start", right: "Öppet nu, stänger 17:00. Röda dagar satta" },
  { k: "Foton", left: "3, alla från lanseringsdagen", right: "22, sex tillagda den här månaden" },
  { k: "Inlägg", left: "Inga", right: "Publicerat för fyra dagar sedan" },
  { k: "Frågor", left: "1 ställd, fortfarande obesvarad", right: "Besvaras inom en dag" },
];

function Photos({ on }: { on: number }) {
  return (
    <div className="my-4 grid grid-cols-6 gap-1" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className={`aspect-square rounded-sm ${
            i < on ? "bg-sage/70" : "bg-ink/10"
          }`}
        />
      ))}
    </div>
  );
}

function Card({
  state,
  photos,
  side,
}: {
  state: string;
  photos: number;
  side: "left" | "right";
}) {
  const muted = side === "left";
  return (
    <div
      className={`border border-ink/12 p-5 sm:p-6 ${muted ? "bg-transparent" : "bg-white"}`}
    >
      <div
        className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
          muted ? "text-sage" : "text-brand"
        }`}
      >
        {state}
      </div>
      <div className="mt-1.5 font-display text-lg font-bold tracking-tightest text-ink">
        Exempelklinik
        <span className="mt-1 block font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
          Illustrativt exempel
        </span>
      </div>
      <Photos on={photos} />
      <dl className="border-t border-ink/12">
        {rows.map((r) => (
          <div
            key={r.k}
            className="flex items-baseline justify-between gap-4 border-b border-ink/12 py-2.5 text-[13px] last:border-b-0"
          >
            <dt className="shrink-0 text-sage">{r.k}</dt>
            <dd
              className={`text-right font-bold ${muted ? "font-medium text-sage" : "text-ink"}`}
            >
              {muted ? r.left : r.right}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function GbpCompare() {
  return (
    <section
      data-nav-theme="light"
      className="scroll-mt-20 border-t border-ink/10 bg-cream-soft px-6 py-24 lg:pl-72 lg:pr-16"
    >
      <Reveal className="max-w-2xl">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
          Google-profilen
        </div>
        <HighlightReveal
          as="h2"
          barTheme="light"
          className="mt-4 text-3xl font-display font-bold leading-tight tracking-tightest text-ink sm:text-4xl"
          lines={["Samma profil,", "skött på två sätt."]}
        />
        <p className="mt-6 text-lg leading-relaxed text-sage">
          Allt nedan är en inställning som någon antingen håller aktuell eller
          inte. Det är hela skillnaden — och ofta den som avgör om ni hamnar i
          kartresultaten.
        </p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Reveal>
          <Card state="Uppsatt en gång och lämnad" photos={3} side="left" />
        </Reveal>
        <Reveal delay={100}>
          <Card state="Skött månad för månad" photos={6} side="right" />
        </Reveal>
      </div>

      <p className="mt-6 text-sm text-sage">
        Illustration. Exempelklinik, inte riktiga data.
      </p>
    </section>
  );
}
