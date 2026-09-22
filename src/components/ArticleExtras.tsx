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
        Ögonblicket då någon söker
      </div>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tightest text-ink sm:text-3xl">
        Så här hittar patienten er klinik.
      </h2>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/70">
        Innan någon väljer klinik gör de en sökning. Det här skriver patienter —
        och guiden är skriven för att ni ska synas på dem.
      </p>
      {/* Search rows, edge to edge: one card, rows flush with hairlines. */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-ink/12 bg-white shadow-[0_1px_2px_rgba(15,61,52,0.06),0_24px_50px_-30px_rgba(15,61,52,0.3)]">
        {queries.map((q, i) => (
          <div
            key={q}
            className={`flex items-center gap-4 px-6 py-4 ${i > 0 ? "border-t border-ink/10" : ""}`}
          >
            <Magnifier className="h-5 w-5 shrink-0 text-sage" />
            <span className="text-base text-ink sm:text-lg">{cap(q)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
