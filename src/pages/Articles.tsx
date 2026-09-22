import { useEffect } from "react";
import { Nav } from "@/components/Nav";
import { HighlightReveal } from "@/components/HighlightReveal";
import { Reveal } from "@/components/Reveal";
import { articles, parts } from "@/lib/articles";

export default function ArticlesIndex() {
  useEffect(() => {
    document.title = "Kunskapsbank — SEO & marknadsföring för tandkliniker | TXagency";
    let m = document.head.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute(
      "content",
      "Praktiska guider om SEO, Google Ads, hemsida och lokal SEO för svenska tandkliniker — så får ni fler bokade patienter.",
    );
  }, []);

  return (
    <>
      <Nav />
      <main>
        <section
          data-nav-theme="light"
          className="scroll-mt-20 bg-cream px-6 pb-16 pt-32 lg:pl-72 lg:pr-16 lg:pt-40"
        >
          <Reveal className="max-w-2xl">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
              Kunskapsbank
            </div>
            <HighlightReveal
              as="h1"
              barTheme="light"
              className="mt-4 font-display text-4xl font-bold leading-[1.03] tracking-tightest text-ink sm:text-5xl"
              lines={["Marknadsföring för", "tandvårdskliniker."]}
            />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              {articles.length} praktiska genomgångar om SEO, Google Ads,
              hemsida och lokal SEO — inga floskler, bara det som faktiskt
              driver fler bokade patienter.
            </p>
          </Reveal>
        </section>

        {parts.map((part, pi) => {
          const inPart = articles.filter((a) => a.part === part);
          const partNumber = part.split(".")[0]; // "Del 1"
          const partTitle = part.split(".").slice(1).join(".").trim();
          return (
            <section
              key={part}
              data-nav-theme="light"
              className={`px-6 pb-8 lg:pl-72 lg:pr-16 ${pi === 0 ? "pt-4" : "pt-8"} ${pi % 2 ? "bg-cream-soft" : "bg-cream"}`}
            >
              <Reveal className="max-w-3xl">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm font-bold uppercase tracking-[0.14em] text-brand">
                    {partNumber}
                  </span>
                  <h2 className="font-display text-xl font-bold tracking-tightest text-ink sm:text-2xl">
                    {partTitle}
                  </h2>
                </div>
              </Reveal>
              <div className="mt-6 border-t border-ink/12">
                {inPart.map((article, i) => (
                  <Reveal key={article.slug} delay={i * 50}>
                    <a
                      href={`/artiklar/${article.slug}`}
                      className="group grid grid-cols-1 gap-2 border-b border-ink/12 py-6 lg:grid-cols-[9rem_1fr_auto] lg:items-baseline lg:gap-10"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
                        {article.kicker}
                      </span>
                      <span>
                        <span className="font-display text-lg font-bold tracking-tightest text-ink sm:text-xl">
                          {article.title}
                        </span>
                        <span className="mt-1.5 block max-w-2xl text-sm leading-relaxed text-ink/55">
                          {article.metaDescription}
                        </span>
                      </span>
                      <span className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-ink transition-transform group-hover:translate-x-1">
                        Läs →
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
}
