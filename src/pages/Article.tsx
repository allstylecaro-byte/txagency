import { useParams, Navigate } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { SearchSpotlight } from "@/components/SearchSpotlight";
import { BookingButton } from "@/components/BookingButton";
import { HighlightReveal } from "@/components/HighlightReveal";
import { Reveal } from "@/components/Reveal";
import { articles, getArticle, type Section } from "@/lib/articles";

function Magnifier() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 h-4 w-4 shrink-0 text-sage"
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M20 20L17 17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Render a query, styling any {placeholder} as a dashed-underline token.
function Query({ text }: { text: string }) {
  const parts = text.split(/(\{[^}]+\})/g);
  return (
    <span className="text-lg text-ink">
      {parts.map((p, i) =>
        p.startsWith("{") ? (
          <span
            key={i}
            className="text-sage [text-decoration:underline_dashed] [text-underline-offset:4px]"
          >
            {p.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </span>
  );
}

function SectionView({ section, index }: { section: Section; index: number }) {
  const pad = "px-6 py-24 lg:pl-72 lg:pr-16";

  if (section.kind === "search") {
    return (
      <section data-nav-theme="light" className={`bg-cream ${pad}`}>
        <Reveal className="max-w-2xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
            {section.kicker}
          </div>
          <HighlightReveal
            as="h2"
            barTheme="light"
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tightest text-ink sm:text-4xl md:text-5xl"
            lines={section.heading}
          />
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-5">
            {section.body.map((p) => (
              <p key={p} className="max-w-xl text-lg leading-relaxed text-ink/80">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={100}>
            <div className="border-t border-ink/15">
              {section.queries.map((q) => (
                <div
                  key={q}
                  className="flex items-start gap-3 border-b border-ink/15 py-4"
                >
                  <Magnifier />
                  <Query text={q} />
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sage">
              {section.caption}
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

  if (section.kind === "build") {
    return (
      <section data-nav-theme="light" className={`bg-cream-soft ${pad}`}>
        <Reveal className="max-w-3xl">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
            {section.kicker}
          </div>
          <HighlightReveal
            as="h2"
            barTheme="light"
            className="mt-4 font-display text-3xl font-bold leading-tight tracking-tightest text-ink sm:text-4xl"
            lines={section.heading}
          />
          {section.lede && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
              {section.lede}
            </p>
          )}
        </Reveal>
        <div className="mt-12 border-t border-ink/15">
          {section.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="grid grid-cols-1 gap-3 border-b border-ink/15 py-8 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12">
                <h3 className="flex items-baseline gap-3 font-display text-xl font-bold tracking-tightest text-ink">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 bg-brand" aria-hidden="true" />
                  {item.title}
                </h3>
                <p className="max-w-2xl text-base leading-relaxed text-ink/70">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  // prose
  const dark = section.theme !== "light";
  return (
    <section
      data-nav-theme={dark ? "dark" : "light"}
      className={`${dark ? "bg-ink" : "bg-cream"} ${pad}`}
    >
      <Reveal className="max-w-3xl">
        <div
          className={`text-[10px] font-bold uppercase tracking-[0.14em] ${
            dark ? "text-brand-light" : "text-brand"
          }`}
        >
          {section.kicker}
        </div>
        <HighlightReveal
          as="h2"
          barTheme={dark ? "dark" : "light"}
          className={`mt-4 font-display text-3xl font-bold leading-tight tracking-tightest sm:text-4xl ${
            dark ? "text-cream" : "text-ink"
          }`}
          lines={section.heading}
        />
        <div className="mt-6 flex flex-col gap-5">
          {section.body.map((p) => (
            <p
              key={p}
              className={`max-w-2xl text-lg leading-relaxed ${
                dark ? "text-cream/70" : "text-ink/70"
              }`}
            >
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug ?? "");
  if (!article) return <Navigate to="/artiklar" replace />;

  return (
    <>
      <Nav />
      <main>
        {/* Trade-style hero (dark) */}
        <section
          data-nav-theme="dark"
          className="relative bg-ink-deep px-6 pb-24 pt-32 lg:pl-72 lg:pr-16 lg:pt-40"
        >
          <div
            className="guides pointer-events-none absolute inset-0 lg:pl-56"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="relative max-w-4xl">
            <nav
              aria-label="Brödsmulor"
              className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-cream/50"
            >
              <a href="/" className="hover:text-cream">
                Hem
              </a>
              <span aria-hidden="true" className="h-1 w-1 bg-cream/25" />
              <a href="/artiklar" className="hover:text-cream">
                Artiklar
              </a>
              <span aria-hidden="true" className="h-1 w-1 bg-cream/25" />
              <span className="text-cream/70">{article.kicker}</span>
            </nav>

            <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-cream/70">
              <span className="h-2.5 w-2.5 bg-brand" aria-hidden="true" />
              {article.kicker}
            </div>
            <HighlightReveal
              as="h1"
              barTheme="dark"
              className="mt-4 font-display text-5xl font-bold leading-[0.98] tracking-tightest text-cream sm:text-6xl md:text-7xl"
              lines={article.title}
            />
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-cream/70">
              {article.lede}
            </p>
            <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <BookingButton>Boka samtal</BookingButton>
              <a
                href="#start"
                className="roll text-xs font-bold uppercase tracking-wide text-cream/60 hover:text-cream"
              >
                Se var ni står — gratis
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.12em] text-cream/45">
              <span>{article.date}</span>
              <span aria-hidden="true" className="h-1 w-1 bg-cream/25" />
              <span>{article.readingMinutes} min läsning</span>
            </div>
          </div>
        </section>

        {article.sections.map((section, i) => (
          <SectionView key={i} section={section} index={i} />
        ))}

        {/* The exact "Låt Google hitta er" search demo from the homepage —
            shown on the Google Ads article so readers see live search intent. */}
        {article.slug === "vad-kostar-google-ads-tandklinik" && <SearchSpotlight />}

        {/* More articles */}
        <section
          data-nav-theme="light"
          className="bg-cream px-6 py-24 lg:pl-72 lg:pr-16"
        >
          <Reveal className="max-w-2xl">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              Fler artiklar
            </div>
            <HighlightReveal
              as="h2"
              barTheme="light"
              className="mt-4 font-display text-3xl font-bold leading-tight tracking-tightest text-ink sm:text-4xl"
              lines={["Läs vidare."]}
            />
          </Reveal>
          <div className="mt-12 border-t border-ink/12">
            {articles
              .filter((a) => a.slug !== article.slug)
              .map((a, i) => (
                <Reveal key={a.slug} delay={i * 70}>
                  <a
                    href={`/artiklar/${a.slug}`}
                    className="group grid grid-cols-1 gap-2 border-b border-ink/12 py-7 lg:grid-cols-[9rem_1fr_auto] lg:items-baseline lg:gap-10"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
                      {a.kicker}
                    </span>
                    <span>
                      <span className="font-display text-xl font-bold tracking-tightest text-ink">
                        {a.title.join(" ")}
                      </span>
                      <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-ink/60">
                        {a.lede}
                      </span>
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wide text-brand transition-transform group-hover:translate-x-1">
                      Läs →
                    </span>
                  </a>
                </Reveal>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
