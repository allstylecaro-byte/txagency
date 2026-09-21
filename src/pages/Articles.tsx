import { Nav } from "@/components/Nav";
import { HighlightReveal } from "@/components/HighlightReveal";
import { Reveal } from "@/components/Reveal";
import { articles } from "@/lib/articles";

export default function ArticlesIndex() {
  return (
    <>
      <Nav />
      <main>
        <section
          data-nav-theme="light"
          className="scroll-mt-20 bg-cream px-6 pb-24 pt-32 lg:pl-72 lg:pr-16 lg:pt-40"
        >
          <Reveal className="max-w-2xl">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
              Artiklar
            </div>
            <HighlightReveal
              as="h1"
              barTheme="light"
              className="mt-4 font-display text-4xl font-bold leading-[1.03] tracking-tightest text-ink sm:text-5xl"
              lines={["Marknadsföring för", "tandvårdskliniker."]}
            />
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              Praktiska genomgångar, inga floskler — så att ni förstår vad som
              faktiskt driver fler bokade patienter.
            </p>
          </Reveal>

          <div className="mt-14 border-t border-ink/12">
            {articles.map((article, i) => (
              <Reveal key={article.slug} delay={i * 80}>
                <a
                  href={`/artiklar/${article.slug}`}
                  className="group grid grid-cols-1 gap-2 border-b border-ink/12 py-8 lg:grid-cols-[10rem_1fr_auto] lg:items-baseline lg:gap-10"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-sage">
                    {article.kicker}
                  </span>
                  <span>
                    <span className="font-display text-2xl font-bold tracking-tightest text-ink">
                      {article.title.join(" ")}
                    </span>
                    <span className="mt-2 block max-w-xl text-sm leading-relaxed text-ink/60">
                      {article.lede}
                    </span>
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wide text-ink transition-transform group-hover:translate-x-1">
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
