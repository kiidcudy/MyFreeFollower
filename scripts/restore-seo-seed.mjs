import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const backup = path.join(root, "scripts/.seo-locale-templates.backup.ts");
execSync(`git show f42c5a2:src/lib/catalog/seo-locale-templates.ts`, {
  cwd: root,
  encoding: "utf8",
  stdio: ["ignore", "pipe", "inherit"],
  maxBuffer: 10 * 1024 * 1024,
});
const content = execSync(`git show f42c5a2:src/lib/catalog/seo-locale-templates.ts`, {
  cwd: root,
  encoding: "utf8",
  maxBuffer: 10 * 1024 * 1024,
});
fs.writeFileSync(backup, content, "utf8");

const start = content.indexOf("const LOCALE_TEMPLATES");
const end = content.indexOf("export function buildLocalizedSeoContent");
const eq = content.indexOf("=", start);
const blockStart = content.indexOf("{", eq);
const block = content.slice(blockStart, end).trim().replace(/;\s*$/, "");

const outPath = path.join(root, "src/lib/catalog/seo-locale-templates.data.ts");
const header = `/** Seed locale SEO templates — run npm run translate to refresh expanded copy. */
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

export const LOCALE_SEO_TEMPLATES: Record<Exclude<Locale, "en">, SeoLocaleTemplates> = ${block};
`;
fs.writeFileSync(outPath, header, "utf8");
console.log("Restored SEO seed with all locales ->", outPath);
