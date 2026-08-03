#!/usr/bin/env node
/**
 * Sync site translations from English sources to all locales.
 *
 * Usage:
 *   node scripts/sync-translations.mjs              # SEO + catalog strings
 *   node scripts/sync-translations.mjs --seo        # product SEO templates only
 *   node scripts/sync-translations.mjs --catalog    # unit/delivery labels only
 *   node scripts/sync-translations.mjs --locale tr  # single locale
 *   node scripts/sync-translations.mjs --dry-run    # preview counts only
 *
 * Uses MyMemory free API (no key). Optional: set DEEPL_API_KEY for DeepL.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const LOCALES = [
  "de", "fr", "es", "pt", "pt-br", "it", "nl", "pl", "ro", "ru", "uk",
  "tr", "ar", "fa", "zh", "id", "bn", "hi",
];

const MYMEMORY_LANG = {
  de: "de", fr: "fr", es: "es", pt: "pt", "pt-br": "pt-BR", it: "it", nl: "nl",
  pl: "pl", ro: "ro", ru: "ru", uk: "uk", tr: "tr", ar: "ar", fa: "fa",
  zh: "zh-CN", id: "id", bn: "bn", hi: "hi",
};

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const seoOnly = args.includes("--seo-only");
const catalogOnly = args.includes("--catalog-only");
const localeArg = args.find((a) => a.startsWith("--locale="))?.split("=")[1]
  ?? (args.includes("--locale") ? args[args.indexOf("--locale") + 1] : null);
const targetLocales = localeArg ? [localeArg] : LOCALES;

const CACHE_SEO = path.join(__dirname, "cache/seo-templates.json");
const CACHE_CATALOG = path.join(__dirname, "cache/catalog-strings.json");

function loadJson(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function saveJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}

const cache = new Map();
const DELAY_MS = 400;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function protectPlaceholders(text) {
  const map = new Map();
  let i = 0;
  const out = text.replace(/\{(\w+)\}/g, (match) => {
    const token = `ZPH${i}Z`;
    map.set(token, match);
    i += 1;
    return token;
  });
  return { out, map };
}

function restorePlaceholders(text, map) {
  let result = text;
  for (const [token, original] of map) {
    result = result.split(token).join(original);
  }
  return result;
}

async function translateMyMemory(text, locale) {
  if (!text?.trim()) return text;
  const cacheKey = `${locale}::${text}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const { out, map } = protectPlaceholders(text);
  const lang = MYMEMORY_LANG[locale] ?? locale;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(out)}&langpair=en|${lang}`;

  await sleep(DELAY_MS);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`MyMemory HTTP ${res.status} for ${locale}`);
  const data = await res.json();
  const translated = restorePlaceholders(data.responseData?.translatedText ?? text, map);
  cache.set(cacheKey, translated);
  return translated;
}

async function translateDeepL(text, locale) {
  const key = process.env.DEEPL_API_KEY;
  if (!key) return translateMyMemory(text, locale);

  const { out, map } = protectPlaceholders(text);
  const target = locale === "pt-br" ? "PT-BR" : locale.toUpperCase();
  await sleep(200);
  const res = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      auth_key: key,
      text: out,
      source_lang: "EN",
      target_lang: target.length === 2 ? target : target.slice(0, 2),
    }),
  });
  if (!res.ok) return translateMyMemory(text, locale);
  const data = await res.json();
  const translated = restorePlaceholders(data.translations?.[0]?.text ?? text, map);
  return translated;
}

async function translateText(text, locale) {
  return process.env.DEEPL_API_KEY
    ? translateDeepL(text, locale)
    : translateMyMemory(text, locale);
}

async function translateValue(value, locale) {
  if (typeof value === "string") return translateText(value, locale);
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) out.push(await translateValue(item, locale));
    return out;
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = await translateValue(v, locale);
    }
    return out;
  }
  return value;
}

function tsString(s) {
  return JSON.stringify(s);
}

function applySeoToSource(merged) {
  const p = path.join(ROOT, "src/lib/catalog/seo-locale-templates.ts");
  let s = fs.readFileSync(p, "utf8");
  const start = s.indexOf("const LOCALE_TEMPLATES");
  const end = s.indexOf("export function buildLocalizedSeoContent");
  if (start < 0 || end < 0) throw new Error("Could not find LOCALE_TEMPLATES block");
  const head = s.slice(0, start);
  const tail = s.slice(end);
  const body = `const LOCALE_TEMPLATES: Record<Exclude<Locale, "en">, LocaleTemplates> = ${JSON.stringify(merged, null, 2)};\n\n`;
  fs.writeFileSync(p, head + body + tail, "utf8");
  console.log(`Updated LOCALE_TEMPLATES in ${p} (${Object.keys(merged).length} locales)`);
}

function writeSeoDataFile(localeTemplates) {
  const merged = loadJson(CACHE_SEO, {});
  for (const [locale, tpl] of Object.entries(localeTemplates)) {
    merged[locale] = tpl;
  }
  if (!dryRun) {
    saveJson(CACHE_SEO, merged);
    if (Object.keys(merged).length >= LOCALES.length) {
      applySeoToSource(merged);
    } else {
      console.log(
        `SEO cache: ${Object.keys(merged).length}/${LOCALES.length} locales — run full translate (no --locale) to update product pages.`,
      );
    }
  }
}

function writeCatalogUnitsFile(allUnits, allDelivery) {
  const lines = [
    "/** AUTO-GENERATED by scripts/sync-translations.mjs — do not edit manually. */",
    'import type { Locale } from "@/lib/i18n/config";',
    "",
    "const EN_UNITS = " + JSON.stringify(allUnits.en, null, 2) + ";",
    "const EN_DELIVERY = " + JSON.stringify(allDelivery.en, null, 2) + ";",
    "",
    "const LOCALE_UNITS: Partial<Record<Locale, Record<string, string>>> = {",
  ];
  for (const locale of LOCALES) {
    if (allUnits[locale]) {
      lines.push(`  ${JSON.stringify(locale)}: ${JSON.stringify(allUnits[locale], null, 2)},`);
    }
  }
  lines.push("};", "");
  lines.push("const LOCALE_DELIVERY: Partial<Record<Locale, Record<string, string>>> = {");
  for (const locale of LOCALES) {
    if (allDelivery[locale]) {
      lines.push(`  ${JSON.stringify(locale)}: ${JSON.stringify(allDelivery[locale], null, 2)},`);
    }
  }
  lines.push(
    "};",
    "",
    "export function localizeUnitLabel(locale: Locale, unit: string): string {",
    "  return LOCALE_UNITS[locale]?.[unit] ?? EN_UNITS[unit] ?? unit;",
    "}",
    "",
    "export function localizeDeliveryLabel(locale: Locale, delivery: string): string {",
    "  return LOCALE_DELIVERY[locale]?.[delivery] ?? EN_DELIVERY[delivery] ?? delivery;",
    "}",
    "",
  );
  const outPath = path.join(ROOT, "src/lib/i18n/catalog-units.ts");
  fs.writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`Wrote ${outPath}`);
}

async function syncSeo() {
  const enPath = path.join(__dirname, "sources/seo-templates-en.json");
  const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const localeTemplates = {};

  for (const locale of targetLocales) {
    console.log(`Translating SEO templates → ${locale}...`);
    if (dryRun) {
      localeTemplates[locale] = en;
      continue;
    }
    localeTemplates[locale] = {
      free: await translateValue(en.free, locale),
      paid: await translateValue(en.paid, locale),
    };
  }

  if (!dryRun) writeSeoDataFile(localeTemplates);
  return Object.keys(en.free).length + Object.keys(en.paid).length;
}

async function syncCatalog() {
  const enPath = path.join(__dirname, "sources/catalog-strings-en.json");
  const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const cached = loadJson(CACHE_CATALOG, null);
  const allUnits = { ...(cached?.units ?? { en: en.units }) };
  const allDelivery = { ...(cached?.delivery ?? { en: en.delivery }) };
  allUnits.en = en.units;
  allDelivery.en = en.delivery;

  for (const locale of targetLocales) {
    console.log(`Translating catalog strings → ${locale}...`);
    if (dryRun) {
      allUnits[locale] = en.units;
      allDelivery[locale] = en.delivery;
      continue;
    }
    allUnits[locale] = {};
    allDelivery[locale] = {};
    for (const [k, v] of Object.entries(en.units)) {
      allUnits[locale][k] = await translateText(v, locale);
    }
    for (const [k, v] of Object.entries(en.delivery)) {
      allDelivery[locale][k] = await translateText(v, locale);
    }
  }

  if (!dryRun) {
    saveJson(CACHE_CATALOG, { units: allUnits, delivery: allDelivery });
    writeCatalogUnitsFile(allUnits, allDelivery);
  }
}

async function main() {
  console.log(`Locales: ${targetLocales.join(", ")}`);
  if (dryRun) console.log("DRY RUN — no files written");

  if (seoOnly || (!seoOnly && !catalogOnly)) await syncSeo();
  if (catalogOnly || (!seoOnly && !catalogOnly)) await syncCatalog();

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
