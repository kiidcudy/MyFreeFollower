import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import toIco from "to-ico";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const svgPath = path.join(publicDir, "favicon.svg");

async function main() {
  const svg = fs.readFileSync(svgPath);
  const png48 = await sharp(svg).resize(48, 48).png().toBuffer();
  const png192 = await sharp(svg).resize(192, 192).png().toBuffer();
  const ico = await toIco([png48, png192]);

  fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico);
  fs.writeFileSync(path.join(publicDir, "icon-48.png"), png48);
  fs.writeFileSync(path.join(publicDir, "icon-192.png"), png192);

  console.log("Generated favicon.ico, icon-48.png, icon-192.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
