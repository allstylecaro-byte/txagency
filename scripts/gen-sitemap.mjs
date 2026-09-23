// Generates public/sitemap.xml from the article data so the sitemap never
// drifts from the pages that actually exist. Runs before every build
// (npm "prebuild"); run manually with `node scripts/gen-sitemap.mjs`.
import { readFileSync, writeFileSync } from "node:fs";

const SITE = "https://txagency.se";
const articles = JSON.parse(
  readFileSync(new URL("../src/data/articles.json", import.meta.url), "utf8"),
);

const urls = [
  { loc: `${SITE}/`, priority: "1.0" },
  { loc: `${SITE}/artiklar`, priority: "0.8" },
  ...articles.map((a) => ({ loc: `${SITE}/artiklar/${a.slug}`, priority: "0.6" })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join("\n")}
</urlset>
`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
