import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const CP1252_TO_BYTE = new Map([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84], [0x2026, 0x85],
  [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88], [0x2030, 0x89], [0x0160, 0x8a],
  [0x2039, 0x8b], [0x0152, 0x8c], [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92],
  [0x201c, 0x93], [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b], [0x0153, 0x9c],
  [0x017e, 0x9e], [0x0178, 0x9f],
]);

const EXTRA_BYTE = new Map([
  [0x011e, 0xd0],
  [0x00d0, 0xd0],
  [0x00d1, 0xd1],
]);

const MOJIBAKE =
  /Ã|â€|Â©|Ä±|Ä°|ÅŸ|ÄŸ|Äƒ|È›|È™|Ã®|Ã¢|ÃŽ|nÃ£|Ã­|grÃ¡|serviÃ§|PolÃ­tica|FaÃ§|InÃ­cio|VocÃª|BÃ³nus|ReferÃªncias|nÃ³s|comeÃ§|\u011e|[ØÙÚÛÜÝÞ][\u0080-\u00bf]/;

function toLatinBytes(str) {
  const bytes = [];
  for (const ch of str) {
    const code = ch.charCodeAt(0);
    if (EXTRA_BYTE.has(code)) {
      bytes.push(EXTRA_BYTE.get(code));
      continue;
    }
    if (code <= 0xff) {
      bytes.push(code);
      continue;
    }
    const mapped = CP1252_TO_BYTE.get(code);
    if (mapped === undefined) return null;
    bytes.push(mapped);
  }
  return bytes;
}

function fixMojibake(str) {
  if (!MOJIBAKE.test(str)) return str;
  const bytes = toLatinBytes(str);
  if (!bytes) return str;
  const fixed = Buffer.from(bytes).toString("utf8");
  if (fixed.includes("\uFFFD") || fixed === str) return str;
  return fixed;
}

function fixQuotedStrings(content) {
  let changes = 0;
  const fixed = content.replace(/"((?:[^"\\]|\\.)*)"/g, (match, inner) => {
    const next = fixMojibake(inner);
    if (next === inner) return match;
    changes += 1;
    const escaped = next
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t");
    return `"${escaped}"`;
  });
  return { fixed, changes };
}

const dir = path.join(root, "src/lib/i18n/messages");
let totalFiles = 0;
let totalStrings = 0;

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith(".ts") || file === "en.ts") continue;
  const filePath = path.join(dir, file);
  const original = fs.readFileSync(filePath, "utf8");
  const { fixed, changes } = fixQuotedStrings(original);
  if (changes > 0) {
    fs.writeFileSync(filePath, fixed, "utf8");
    totalFiles += 1;
    totalStrings += changes;
    console.log(`Fixed ${file}: ${changes} strings`);
  }
}

console.log(`Done: ${totalFiles} files, ${totalStrings} strings corrected.`);
