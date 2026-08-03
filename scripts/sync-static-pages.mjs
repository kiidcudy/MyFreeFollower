#!/usr/bin/env node
/**
 * Translate FAQ, About, Privacy, Terms, Refund pages to all locales.
 *
 * Usage:
 *   node scripts/sync-static-pages.mjs
 *   node scripts/sync-static-pages.mjs --locale=tr
 *   node scripts/sync-static-pages.mjs --dry-run
 *
 * Optional: DEEPL_API_KEY for DeepL instead of MyMemory.
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

const META_KEYS = [
  "faqTitle", "faqDescription", "aboutTitle", "aboutDescription",
  "privacyTitle", "privacyDescription", "termsTitle", "termsDescription",
  "refundTitle", "refundDescription",
];

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const localeArg = args.find((a) => a.startsWith("--locale="))?.split("=")[1]
  ?? (args.includes("--locale") ? args[args.indexOf("--locale") + 1] : null);
const targetLocales = localeArg ? [localeArg] : LOCALES;

const CACHE_DIR = path.join(__dirname, "cache/static-pages");
const OUT_FILE = path.join(ROOT, "src/lib/i18n/static-page-bundles.ts");

const cache = new Map();
const DELAY_MS = 2500;

function loadPartialCache(locale) {
  const f = path.join(CACHE_DIR, `${locale}.partial.json`);
  if (!fs.existsSync(f)) return {};
  return JSON.parse(fs.readFileSync(f, "utf8"));
}

function savePartialCache(locale, section, data) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const f = path.join(CACHE_DIR, `${locale}.partial.json`);
  const existing = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : {};
  existing[section] = data;
  fs.writeFileSync(f, JSON.stringify(existing, null, 2), "utf8");
}

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

async function translateMyMemory(text, locale, attempt = 0) {
  if (!text?.trim()) return text;
  const cacheKey = `${locale}::${text}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const { out, map } = protectPlaceholders(text);
  const lang = MYMEMORY_LANG[locale] ?? locale;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(out)}&langpair=en|${lang}`;

  await sleep(DELAY_MS);
  const res = await fetch(url);
  if (res.status === 429 && attempt < 8) {
    await sleep(8000 * (attempt + 1));
    return translateMyMemory(text, locale, attempt + 1);
  }
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
  const targetMap = {
    "pt-br": "PT-BR", zh: "ZH", en: "EN", uk: "UK",
  };
  const target = targetMap[locale] ?? locale.toUpperCase();
  await sleep(300);
  const res = await fetch("https://api-free.deepl.com/v2/translate", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      auth_key: key,
      text: out,
      source_lang: "EN",
      target_lang: target,
    }),
  });
  if (!res.ok) return translateMyMemory(text, locale);
  const data = await res.json();
  return restorePlaceholders(data.translations?.[0]?.text ?? text, map);
}

async function translateText(text, locale) {
  return process.env.DEEPL_API_KEY
    ? translateDeepL(text, locale)
    : translateMyMemory(text, locale);
}

async function translateObject(obj, locale, section, partial = {}) {
  const out = { ...partial };
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (out[k]) continue;
    out[k] = await translateText(obj[k], locale);
    savePartialCache(locale, section, out);
    if (i % 5 === 0) process.stdout.write(`  ${locale}/${section}: ${i + 1}/${keys.length}\r`);
  }
  process.stdout.write(`  ${locale}/${section}: ${keys.length}/${keys.length} done\n`);
  return out;
}

function extractSection(src, name) {
  const marker = `  ${name}: {`;
  const start = src.indexOf(marker);
  if (start === -1) throw new Error(`Section ${name} not found in en.ts`);
  let depth = 0;
  let i = start + marker.length - 1;
  for (; i < src.length; i++) {
    if (src[i] === "{") depth++;
    if (src[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  return parseKeyValues(src.slice(start, i + 1));
}

function parseKeyValues(block) {
  const obj = {};
  const re = /(\w+):\s*("(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/gs;
  let m;
  while ((m = re.exec(block))) {
    let val = m[2];
    if (val.startsWith('"')) {
      val = val.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, "\n");
    } else {
      val = val.slice(1, -1);
    }
    obj[m[1]] = val;
  }
  return obj;
}

function loadEnglish() {
  const enPath = path.join(ROOT, "src/lib/i18n/messages/en.ts");
  const src = fs.readFileSync(enPath, "utf8");
  const faq = extractSection(src, "faq");
  const about = extractSection(src, "about");
  const legal = extractSection(src, "legal");
  const metaAll = extractSection(src, "meta");
  const meta = {};
  for (const k of META_KEYS) {
    if (metaAll[k]) meta[k] = metaAll[k];
  }
  return { faq, about, legal, meta };
}

function loadLocaleCache(locale) {
  const f = path.join(CACHE_DIR, `${locale}.json`);
  if (!fs.existsSync(f)) return null;
  return JSON.parse(fs.readFileSync(f, "utf8"));
}

function saveLocaleCache(locale, data) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(path.join(CACHE_DIR, `${locale}.json`), JSON.stringify(data, null, 2), "utf8");
}

function loadAllCaches() {
  const bundles = {};
  for (const locale of LOCALES) {
    const c = loadLocaleCache(locale);
    if (c) bundles[locale] = c;
  }
  return bundles;
}

function serializeObject(obj, indent = 4) {
  const pad = " ".repeat(indent);
  const lines = Object.entries(obj).map(
    ([k, v]) => `${pad}${k}: ${JSON.stringify(v)},`,
  );
  return `{\n${lines.join("\n")}\n${" ".repeat(indent - 2)}}`;
}

function writeOutputFile(allBundles) {
  const localeBlocks = Object.entries(allBundles).map(([locale, data]) => {
    const key = locale.includes("-") ? `"${locale}"` : locale;
    return `  ${key}: {
    faq: ${serializeObject(data.faq, 6)},
    about: ${serializeObject(data.about, 6)},
    legal: ${serializeObject(data.legal, 6)},
    meta: ${serializeObject(data.meta, 6)},
  }`;
  });

  const content = `// Auto-generated by scripts/sync-static-pages.mjs — do not edit manually.
import type { Locale } from "@/lib/i18n/config";

export type StaticPageBundle = {
  faq: Record<string, string>;
  about: Record<string, string>;
  legal: Record<string, string>;
  meta: Record<string, string>;
};

export const staticPageBundles: Partial<Record<Locale, StaticPageBundle>> = {
${localeBlocks.join(",\n")}
};
`;
  fs.writeFileSync(OUT_FILE, content, "utf8");
}

async function main() {
  const english = loadEnglish();
  const faqKeys = Object.keys(english.faq).length;
  const aboutKeys = Object.keys(english.about).length;
  const legalKeys = Object.keys(english.legal).length;
  const metaKeys = Object.keys(english.meta).length;
  console.log(`English keys: faq=${faqKeys} about=${aboutKeys} legal=${legalKeys} meta=${metaKeys}`);

  if (dryRun) {
    console.log(`Would translate ${targetLocales.length} locales`);
    return;
  }

  const allBundles = loadAllCaches();

  for (const locale of targetLocales) {
    if (allBundles[locale]) {
      console.log(`Skip ${locale} (cached)`);
      continue;
    }
    console.log(`Translating ${locale}...`);
    const partial = loadPartialCache(locale);
    const bundle = {
      faq: await translateObject(english.faq, locale, "faq", partial.faq ?? {}),
      about: await translateObject(english.about, locale, "about", partial.about ?? {}),
      legal: await translateObject(english.legal, locale, "legal", partial.legal ?? {}),
      meta: await translateObject(english.meta, locale, "meta", partial.meta ?? {}),
    };
    allBundles[locale] = bundle;
    saveLocaleCache(locale, bundle);
    writeOutputFile(allBundles);
    console.log(`Saved ${locale}`);
  }

  writeOutputFile(allBundles);
  console.log(`Written ${OUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
