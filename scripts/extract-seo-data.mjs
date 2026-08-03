import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = path.join(root, "src/lib/catalog/seo-locale-templates.ts");
const s = fs.readFileSync(p, "utf8");
const start = s.indexOf("const LOCALE_TEMPLATES");
const end = s.indexOf("export function buildLocalizedSeoContent");
if (start < 0 || end < 0) throw new Error("markers not found");

const block = s.slice(start, end);
const dataPath = path.join(root, "src/lib/catalog/seo-locale-templates.data.ts");
const dataContent = `/** Temporary seed — run npm run translate to regenerate expanded templates. */
import type { Locale } from "@/lib/i18n/config";

export type SeoLocaleTemplateSet = {
  metaTitle: string;
  description: string;
  focusKeyword: string;
  intro: string;
  highlights?: string[];
  sections: { heading: string; body: string }[];
  faq: { question: string; answer: string }[];
};

export type SeoLocaleTemplates = { free: SeoLocaleTemplateSet; paid: SeoLocaleTemplateSet };

export const LOCALE_SEO_TEMPLATES: Record<Exclude<Locale, "en">, SeoLocaleTemplates> = ${block.replace("const LOCALE_TEMPLATES:", "").trim().replace(/;$/, "")};
`;
fs.writeFileSync(dataPath, dataContent, "utf8");

const head = s.slice(0, start);
const tail = s.slice(end);
fs.writeFileSync(
  p,
  `${head}import { LOCALE_SEO_TEMPLATES as LOCALE_TEMPLATES } from "./seo-locale-templates.data";\n\n${tail}`,
  "utf8",
);
console.log("Extracted to", dataPath);
