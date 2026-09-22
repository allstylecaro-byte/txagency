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

// The pillar guides shown in the footer.
export const footerArticleSlugs = [
  "vad-ar-seo-tandlakare",
  "lokal-seo-tandlakare",
  "vad-kostar-google-ads-tandlakare",
  "hemsida-for-tandlakare",
  "fa-fler-patienter-tandklinik",
  "tandlakare-nara-mig",
  "seo-eller-google-ads-tandklinik",
];

export const footerArticles = footerArticleSlugs
  .map((s) => getArticle(s))
  .filter((a): a is Article => Boolean(a));
