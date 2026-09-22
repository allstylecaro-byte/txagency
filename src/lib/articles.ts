import data from "@/data/articles.json";

// One SEO knowledge-bank article. Bodies are Markdown (rendered with
// react-markdown + remark-gfm). Generated from the knowledge bank; the data
// lives in src/data/articles.json so a CMS can replace it later.
export type Article = {
  nr: number;
  slug: string;
  part: string;
  kicker: string;
  title: string;
  h1: string;
  titleTag: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  readingMinutes: number;
  linksOut: number[];
  date: string;
  body: string;
};

export const articles = data as unknown as Article[];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticleByNr(nr: number): Article | undefined {
  return articles.find((a) => a.nr === nr);
}

// Parts (Del 1..6) in first-seen order — used to group the index.
export const parts: string[] = articles.reduce<string[]>((acc, a) => {
  if (a.part && !acc.includes(a.part)) acc.push(a.part);
  return acc;
}, []);

// The pillar guides shown in the footer — short labels (not the full SEO
// title, which is far too long for a footer link).
export type FooterLink = { slug: string; label: string; href: string };

const footerLinkDefs: { slug: string; label: string }[] = [
  { slug: "vad-ar-seo-tandlakare", label: "Vad är SEO?" },
  { slug: "lokal-seo-tandlakare", label: "Lokal SEO" },
  { slug: "vad-kostar-google-ads-tandlakare", label: "Google Ads-priser" },
  { slug: "hemsida-for-tandlakare", label: "Hemsida" },
  { slug: "fa-fler-patienter-tandklinik", label: "Fler patienter" },
  { slug: "tandlakare-nara-mig", label: "Tandläkare nära mig" },
  { slug: "seo-eller-google-ads-tandklinik", label: "SEO vs Google Ads" },
];

export const footerLinks: FooterLink[] = footerLinkDefs
  .filter((d) => Boolean(getArticle(d.slug)))
  .map((d) => ({ ...d, href: `/artiklar/${d.slug}` }));
