import type { Article } from "@/lib/articles";

// Map an article's kicker/topic to a type: an icon (the real platform logo
// where it fits the topic) and an accent label. Specialises each article by
// type, per the brief.
type TypeMeta = {
  label: string;
  icon: string | null; // path in /public, or null → inline SVG
  glyph?: "growth" | "shield" | "chart";
};

export function articleType(a: Article): TypeMeta {
  const k = a.kicker.toLowerCase();
  if (k.includes("google ads")) return { label: "Google Ads", icon: "/icons/google-ads.png" };
  if (k.includes("hemsida")) return { label: "Hemsida", icon: "/icons/wordpress.png" };
  if (k.includes("lokal")) return { label: "Lokal SEO", icon: "/icons/google.png" };
  if (k.includes("seo")) return { label: "SEO", icon: "/icons/google.png" };
  if (k.includes("ai")) return { label: "AI-sök", icon: "/icons/google.png" };
  if (k.includes("mät")) return { label: "Mätning", icon: null, glyph: "chart" };
  if (k.includes("juridik")) return { label: "Juridik", icon: null, glyph: "shield" };
  return { label: a.kicker, icon: null, glyph: "growth" };
}

function Glyph({ glyph }: { glyph: NonNullable<TypeMeta["glyph"]> }) {
  const p =
    glyph === "shield"
      ? "M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
      : glyph === "chart"
        ? "M4 19V10M10 19V4M16 19v-7M4 19h14"
        : "M4 16l5-5 3 3 6-7M15 7h4v4";
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#f0573f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={p} />
    </svg>
  );
}

// Round badge with the type icon — used in the hero.
export function TypeBadge({ article }: { article: Article }) {
  const t = articleType(article);
  return (
    <span
      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cream shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
      aria-hidden="true"
    >
      {t.icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={t.icon} alt="" className="h-5 w-5 object-contain" />
      ) : (
        <Glyph glyph={t.glyph ?? "growth"} />
      )}
    </span>
  );
}

function Magnifier({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// The searches this guide answers — the "moment of search" block: real
// Google-style queries built from the article's keywords. Reuses the site's
// search motif; on-brand and light (no heavy card).
export function SearchQueries({ article }: { article: Article }) {
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const queries = Array.from(
    new Set([article.primaryKeyword, ...article.secondaryKeywords].filter(Boolean)),
  ).slice(0, 5);
  if (queries.length === 0) return null;
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
        Sökningar den här guiden svarar på
      </div>
      <div className="mt-6 space-y-3">
        {queries.map((q) => (
          <div
            key={q}
            className="flex items-center gap-4 rounded-full bg-white px-6 py-4 shadow-[0_1px_2px_rgba(15,61,52,0.06),0_16px_34px_-22px_rgba(15,61,52,0.28)]"
          >
            <Magnifier className="h-5 w-5 shrink-0 text-sage" />
            <span className="text-base text-ink sm:text-lg">{cap(q)}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-ink/50">
        Riktiga sökningar patienter gör — guiden är skriven för att er klinik
        ska synas på dem.
      </p>
    </div>
  );
}
