import { useEffect, type ReactNode } from "react";
import { useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Nav } from "@/components/Nav";
import { BookingButton } from "@/components/BookingButton";
import { SearchSpotlight } from "@/components/SearchSpotlight";
import { Reveal } from "@/components/Reveal";
import { SearchQueries } from "@/components/ArticleExtras";
import { getArticleCalculator } from "@/components/calculators/ArticleCalculators";
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
      "@graph": [
        {
          "@type": "Article",
          headline: article.h1,
          description: article.metaDescription,
          about: article.primaryKeyword,
          inLanguage: "sv-SE",
          mainEntityOfPage: url,
          author: { "@type": "Organization", name: "TX Agency" },
          publisher: { "@type": "Organization", name: "TX Agency" },
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Hem", item: SITE },
            { "@type": "ListItem", position: 2, name: "Artiklar", item: `${SITE}/artiklar` },
            { "@type": "ListItem", position: 3, name: article.kicker, item: url },
          ],
        },
      ],
    });
    document.head.appendChild(ld);

    return () => {
      document.head
        .querySelectorAll("script[data-article-ld]")
        .forEach((n) => n.remove());
    };
  }, [article]);
}

// --- Article body structuring (readability + crawlability) ---------------
// Long guides are split into: a lead intro, an in-page table of contents with
// jump links, then sections whose headings carry slug ids (deep-linkable and
// scannable for both people and crawlers).

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (node && typeof node === "object" && "props" in node)
    return nodeText((node as { props: { children?: ReactNode } }).props.children);
  return "";
}

// Everything before the first "## " is the intro; the rest is the sectioned body.
function splitIntro(body: string): { intro: string; rest: string } {
  const i = body.search(/^##\s+/m);
  if (i === -1) return { intro: body.trim(), rest: "" };
  return { intro: body.slice(0, i).trim(), rest: body.slice(i) };
}

function headings(md: string): { id: string; text: string }[] {
  const out: { id: string; text: string }[] = [];
  const re = /^##\s+(.+?)\s*$/gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md))) {
    const text = m[1].replace(/[*_`]/g, "").trim();
    out.push({ id: slugify(text), text });
  }
  return out;
}

// Give headings stable slug ids so the TOC and deep links resolve.
const mdComponents = {
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 id={slugify(nodeText(children))}>{children}</h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 id={slugify(nodeText(children))}>{children}</h3>
  ),
};

function ArticleBody({ body }: { body: string }) {
  const { intro, rest } = splitIntro(body);
  const toc = headings(rest);
  return (
    <div className="max-w-2xl">
      {intro && (
        <div className="tx-prose prose prose-xl max-w-none prose-p:leading-relaxed prose-p:text-ink/85 prose-a:font-medium prose-a:text-brand prose-a:underline prose-a:decoration-brand/30 prose-a:underline-offset-2 prose-strong:text-ink">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{intro}</ReactMarkdown>
        </div>
      )}

      {toc.length >= 3 && (
        <nav
          aria-label="Innehåll i guiden"
          className="my-12 rounded-xl border border-ink/12 bg-cream-soft/70 p-6 sm:p-7"
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
            I den här guiden
          </div>
          <ol className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {toc.map((t, i) => (
              <li key={t.id} className="flex gap-3">
                <span className="mt-0.5 font-display text-sm font-bold tabular-nums text-ink/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={`#${t.id}`}
                  className="text-[15px] font-medium leading-snug text-ink/75 transition-colors hover:text-brand"
                >
                  {t.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="tx-prose prose prose-lg max-w-none prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tightest prose-headings:text-ink prose-h2:mt-14 prose-h2:border-t prose-h2:border-ink/10 prose-h2:pt-10 prose-h2:text-2xl sm:prose-h2:text-[28px] prose-h3:mt-9 prose-h3:text-xl prose-p:leading-[1.75] prose-p:text-ink/80 prose-li:leading-relaxed prose-li:text-ink/80 prose-li:marker:text-brand prose-strong:text-ink prose-a:font-medium prose-a:text-brand prose-a:underline prose-a:decoration-brand/30 prose-a:underline-offset-2 hover:prose-a:decoration-brand prose-ul:my-6 prose-ol:my-6 prose-table:my-8 prose-table:text-sm prose-th:text-ink prose-td:align-top prose-td:text-ink/75 prose-hr:my-12 prose-hr:border-ink/12 prose-blockquote:rounded-r-lg prose-blockquote:border-l-2 prose-blockquote:border-brand prose-blockquote:bg-cream-soft prose-blockquote:px-5 prose-blockquote:py-1 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-ink/80">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
          {rest}
        </ReactMarkdown>
      </div>
    </div>
  );
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

  const calculator = getArticleCalculator(article.slug);

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
            {/* Breadcrumb crawler (Hem ▪ Artiklar ▪ topic) — replaces the plain
                back link and gives crawlers a real internal-link trail. */}
            <nav
              aria-label="Brödsmulor"
              className="flex flex-wrap items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-cream/40"
            >
              <a href="/" className="transition-colors hover:text-cream">
                Hem
              </a>
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-cream/25" />
              <a href="/artiklar" className="transition-colors hover:text-cream">
                Artiklar
              </a>
              <span aria-hidden="true" className="h-1.5 w-1.5 bg-cream/25" />
              <span className="text-cream">{article.kicker}</span>
            </nav>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.04] tracking-tightest text-cream sm:text-5xl">
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
          {/* The moment of search — two columns, full width */}
          <div className="mb-16">
            <SearchQueries article={article} />
          </div>

          {/* Body — intro lede, in-page table of contents, then anchored,
              visually separated sections. */}
          <ArticleBody body={article.body} />
        </section>

        {/* Interactive calculator — shown on articles whose topic has a formula
            (Google Ads CAC, SEO value, patient LTV). */}
        {calculator && (
          <section
            data-nav-theme="light"
            className="border-t border-ink/10 bg-cream-soft px-6 py-16 lg:pl-72 lg:pr-16"
          >
            <Reveal className="max-w-3xl">{calculator}</Reveal>
          </section>
        )}

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
