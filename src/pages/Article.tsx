import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Nav } from "@/components/Nav";
import { BookingButton } from "@/components/BookingButton";
import { SearchSpotlight } from "@/components/SearchSpotlight";
import { Reveal } from "@/components/Reveal";
import { TypeBadge, SerpPreview, CoverageChips } from "@/components/ArticleExtras";
import { getArticle, getArticleByNr, type Article } from "@/lib/articles";

const SITE = "https://txagency.se";

// Client-side SEO: title, meta description, canonical, Open Graph and an
// Article JSON-LD block. (For full crawl-time SEO, deploy with SSR/prerender —
// e.g. Vercel + Next — but this covers on-page signals for an SPA.)
function useArticleSeo(article: Article) {
  useEffect(() => {
    const url = `${SITE}/artiklar/${article.slug}`;
    document.title = article.titleTag;

    const set = (sel: string, attr: string, val: string, create: () => HTMLElement) => {
      let el = document.head.querySelector(sel) as HTMLElement | null;
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
      return el;
    };

    set('meta[name="description"]', "content", article.metaDescription, () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      return m;
    });
    set('meta[name="keywords"]', "content", [article.primaryKeyword, ...article.secondaryKeywords].join(", "), () => {
      const m = document.createElement("meta");
      m.setAttribute("name", "keywords");
      return m;
    });
    set('link[rel="canonical"]', "href", url, () => {
      const l = document.createElement("link");
      l.setAttribute("rel", "canonical");
      return l;
    });
    set('meta[property="og:title"]', "content", article.titleTag, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:title");
      return m;
    });
    set('meta[property="og:description"]', "content", article.metaDescription, () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:description");
      return m;
    });
    set('meta[property="og:type"]', "content", "article", () => {
      const m = document.createElement("meta");
      m.setAttribute("property", "og:type");
      return m;
    });

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.setAttribute("data-article-ld", "1");
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.h1,
      description: article.metaDescription,
      about: article.primaryKeyword,
      inLanguage: "sv-SE",
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "TXagency" },
      publisher: { "@type": "Organization", name: "TXagency" },
    });
    document.head.appendChild(ld);

    return () => {
      document.head
        .querySelectorAll("script[data-article-ld]")
        .forEach((n) => n.remove());
    };
  }, [article]);
}

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug ?? "");
  if (!article) return <Navigate to="/artiklar" replace />;
  return <ArticleView article={article} />;
}

function ArticleView({ article }: { article: Article }) {
  useArticleSeo(article);

  const related = article.linksOut
    .map((nr) => getArticleByNr(nr))
    .filter((a): a is Article => Boolean(a))
    .slice(0, 4);

  return (
    <>
      <Nav />
      <main>
        {/* Hero (dark) */}
        <section
          data-nav-theme="dark"
          className="relative bg-ink-deep px-6 pb-20 pt-32 lg:pl-72 lg:pr-16 lg:pt-40"
        >
          <div className="max-w-3xl">
            <nav className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-cream/40">
              <a href="/artiklar" className="hover:text-cream">
                ← Alla artiklar
              </a>
            </nav>
            <div className="mt-8 flex items-center gap-3">
              <TypeBadge article={article} />
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-light">
                {article.kicker}
              </span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.04] tracking-tightest text-cream sm:text-5xl">
              {article.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/70">
              {article.metaDescription}
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
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

        {/* Body (cream) */}
        <section
          data-nav-theme="light"
          className="bg-cream px-6 py-20 lg:pl-72 lg:pr-16"
        >
          {/* Structured top block: SERP preview + what the guide covers */}
          <Reveal className="mb-12 max-w-2xl">
            <div className="grid gap-8">
              <SerpPreview article={article} />
              <CoverageChips article={article} />
            </div>
          </Reveal>

          <Reveal className="max-w-2xl">
            <div className="tx-prose prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tightest prose-headings:text-ink prose-h2:mt-12 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-xl prose-p:text-ink/80 prose-p:leading-relaxed prose-li:text-ink/80 prose-strong:text-ink prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:text-ink prose-td:text-ink/75 prose-hr:border-ink/12">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.body}
              </ReactMarkdown>
            </div>
          </Reveal>
        </section>

        {/* Google search demo — only on the Google Ads cost guide */}
        {article.slug === "vad-kostar-google-ads-tandlakare" && (
          <SearchSpotlight />
        )}

        {/* Related */}
        {related.length > 0 && (
          <section
            data-nav-theme="light"
            className="border-t border-ink/10 bg-cream-soft px-6 py-20 lg:pl-72 lg:pr-16"
          >
            <Reveal className="max-w-2xl">
              <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                Läs vidare
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tightest text-ink">
                Relaterade guider
              </h2>
            </Reveal>
            <div className="mt-10 border-t border-ink/12">
              {related.map((a, i) => (
                <Reveal key={a.slug} delay={i * 70}>
                  <a
                    href={`/artiklar/${a.slug}`}
                    className="group grid grid-cols-1 gap-2 border-b border-ink/12 py-6 lg:grid-cols-[10rem_1fr_auto] lg:items-baseline lg:gap-10"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
                      {a.kicker}
                    </span>
                    <span className="font-display text-xl font-bold tracking-tightest text-ink">
                      {a.title}
                    </span>
                    <span className="text-sm font-bold uppercase tracking-wide text-ink transition-transform group-hover:translate-x-1">
                      Läs →
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
