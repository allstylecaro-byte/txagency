import type { Article } from "@/lib/articles";

// Map an article's kicker/topic to a type: an icon (the real platform logo
// where it fits the topic) and an accent label. Used to specialise each
// article's header by type, per the brief.
type TypeKey = "google-ads" | "seo" | "local" | "web" | "growth" | "rules" | "measure";

type TypeMeta = {
  key: TypeKey;
  label: string;
  icon: string | null; // path in /public, or null → inline SVG
  glyph?: "growth" | "shield" | "chart";
};

export function articleType(a: Article): TypeMeta {
  const k = a.kicker.toLowerCase();
  if (k.includes("google ads")) return { key: "google-ads", label: "Google Ads", icon: "/icons/google-ads.png" };
  if (k.includes("hemsida")) return { key: "web", label: "Hemsida", icon: "/icons/wordpress.png" };
  if (k.includes("lokal")) return { key: "local", label: "Lokal SEO", icon: "/icons/google.png" };
  if (k.includes("seo")) return { key: "seo", label: "SEO", icon: "/icons/google.png" };
  if (k.includes("ai")) return { key: "seo", label: "AI-sök", icon: "/icons/google.png" };
  if (k.includes("mät")) return { key: "measure", label: "Mätning", icon: null, glyph: "chart" };
  if (k.includes("juridik")) return { key: "rules", label: "Juridik", icon: null, glyph: "shield" };
  return { key: "growth", label: a.kicker, icon: null, glyph: "growth" };
}

function Glyph({ glyph }: { glyph: NonNullable<TypeMeta["glyph"]> }) {
  const p =
    glyph === "shield"
      ? "M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"
      : glyph === "chart"
        ? "M4 19V10M10 19V4M16 19v-7M4 19h14"
        : "M4 16l5-5 3 3 6-7M15 7h4v4"; // growth
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#f0573f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={p} />
    </svg>
  );
}

// A small round badge with the type icon — for the hero.
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

// Google-style search result preview — "so here's how it shows up in Google".
export function SerpPreview({ article }: { article: Article }) {
  const t = articleType(article);
  return (
    <div className="rounded-xl border border-ink/12 bg-white p-5 shadow-[0_1px_2px_rgba(15,61,52,0.06),0_24px_50px_-30px_rgba(15,61,52,0.35)]">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
          Så här syns artikeln i Google
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink/25">
          Exempel
        </span>
      </div>
      <div className="flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-ink/10 bg-cream">
          {t.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.icon} alt="" className="h-4 w-4 object-contain" />
          ) : (
            <Glyph glyph={t.glyph ?? "growth"} />
          )}
        </span>
        <span className="leading-tight">
          <span className="block text-[13px] font-medium text-ink">TXagency</span>
          <span className="block text-xs text-[#4d5156]">
            txagency.se › artiklar › {article.slug}
          </span>
        </span>
      </div>
      <div className="mt-2 font-sans text-xl leading-snug text-[#1a0dab]">
        {article.titleTag}
      </div>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#4d5156]">
        {article.metaDescription}
      </p>
    </div>
  );
}

// "What this guide covers" — the primary + secondary keywords as chips
// (the OTP-style chips row), which doubles as on-page keyword signal.
export function CoverageChips({ article }: { article: Article }) {
  const terms = [article.primaryKeyword, ...article.secondaryKeywords].filter(Boolean);
  if (terms.length === 0) return null;
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
        Vad guiden täcker
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {terms.map((term) => (
          <span
            key={term}
            className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-[13px] font-semibold text-ink/70"
          >
            {cap(term)}
          </span>
        ))}
      </div>
    </div>
  );
}
