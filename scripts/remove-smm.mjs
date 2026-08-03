import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const TARGET_DIRS = [path.join(ROOT, "src"), path.join(ROOT, "scripts")];

const REPLACEMENTS = [
  ["Buy Cheap SMM Packages", "Buy Affordable Growth Packages"],
  ["Buy cheap SMM packages", "Buy affordable growth packages"],
  ["buy cheap SMM packages", "buy affordable growth packages"],
  ["Trusted SMM Guide", "Trusted Growth Guide"],
  ["Vetting an SMM Panel Before You Pay", "Vetting a Growth Platform Before You Pay"],
  ["early SMM panel days", "early bulk automation panel days"],
  ["task-based SMM strategies", "task-based growth strategies"],
  ["task-based SMM growth", "task-based growth"],
  ["task-based SMM", "task-based growth"],
  ["Task-basiertes SMM", "Task-basiertes Wachstum"],
  ["aufgabenbasiertes SMM-Wachstum", "aufgabenbasiertes Wachstum"],
  ["SMM par tâches", "croissance par tâches"],
  ["SMM por tareas", "crecimiento por tareas"],
  ["SMM por tarefas", "crescimento por tarefas"],
  ["SMM con task", "crescita con task"],
  ["SMM prin task-uri", "creștere prin task-uri"],
  ["SMM prin task", "creștere prin task"],
  ["SMM przez zadania", "wzrost przez zadania"],
  ["SMM durch Aufgaben", "Wachstum durch Aufgaben"],
  ["SMM через задания", "рост через задания"],
  ["SMM через завдання", "ріст через завдання"],
  ["görev tabanlı SMM", "görev tabanlı"],
  ["SMM بالمهام", "النمو بالمهام"],
  ["SMM مبتنی بر تسک", "رشد مبتنی بر تسک"],
  ["任务SMM", "任务式增长"],
  ["SMM berbasis tugas", "pertumbuhan berbasis tugas"],
  ["টাস্ক SMM", "টাস্ক ভিত্তিক বৃদ্ধি"],
  ["टास्क SMM", "टास्क आधारित वृद्धि"],
  ["taak-SMM", "taak-groei"],
  ["taakgebaseerde SMM-groei", "taakgebaseerde groei"],
  ["croissance SMM par tâches", "croissance par tâches"],
  ["crecimiento SMM basado en tareas", "crecimiento basado en tareas"],
  ["crescimento SMM baseado em tarefas", "crescimento baseado em tarefas"],
  ["crescimento SMM por tarefas", "crescimento por tarefas"],
  ["crescita SMM basata su compiti", "crescita basata su compiti"],
  ["wzrost SMM oparty na zadaniach", "wzrost oparty na zadaniach"],
  ["creșterea SMM bazată pe sarcini", "creșterea bazată pe sarcini"],
  ["SMM-рост через задания", "рост через задания"],
  ["SMM-ріст через завдання", "ріст через завдання"],
  ["SMM büyümesini keşfedenler", "büyümeyi keşfedenler"],
  ["görev tabanlı SMM büyümesini", "görev tabanlı büyümeyi"],
  ["nö SMM القائم على المهام", "النمو القائم على المهام"],
  ["رشد SMM مبتنی بر کار", "رشد مبتنی بر کار"],
  ["探索任务式SMM增长", "探索任务式增长"],
  ["pertumbuhan SMM berbasis tugas", "pertumbuhan berbasis tugas"],
  ["टास्क-आधारित SMM वृद्धि", "टास्क-आधारित वृद्धि"],
  ["টাস্ক-ভিত্তিক SMM বৃদ্ধি", "টাস্ক-ভিত্তিক বৃদ্ধি"],
  ["independent SMM service provider", "independent social media growth provider"],
  ["independent SMM-Anbieter", "unabhängiger Wachstumsanbieter"],
  ["fournisseur SMM indépendant", "fournisseur de croissance indépendant"],
  ["proveedor SMM independiente", "proveedor de crecimiento independiente"],
  ["fornecedor SMM independente", "fornecedor de crescimento independente"],
  ["provedor SMM independente", "provedor de crescimento independente"],
  ["provider SMM indipendente", "provider di crescita indipendente"],
  ["onafhankelijke SMM-aanbieder", "onafhankelijke groei-aanbieder"],
  ["niezależnym dostawcą SMM", "niezależnym dostawcą usług wzrostu"],
  ["furnizor SMM independent", "furnizor de creștere independent"],
  ["независимый SMM-провайдер", "независимый провайдер роста"],
  ["boutique SMM mondiale", "boutique de croissance mondiale"],
  ["tienda SMM global", "tienda de crecimiento global"],
  ["loja SMM global", "loja de crescimento global"],
  ["store SMM globale", "store di crescita globale"],
  ["SMM-winkel", "groei-winkel"],
  ["sklep SMM", "sklep wzrostu"],
  ["magazin SMM global", "magazin de creștere global"],
  ["SMM-магазин", "магазин роста"],
  ["SMM-услуги, которые реально работают", "услуги роста, которые реально работают"],
  ["SMM-услуги", "услуги роста"],
  ["SMM-послуги", "послуги роста"],
  ["bezplatne SMM", "бесплатные услуги роста"],
  ["Purchasing SMM services", "Purchasing growth services"],
  ["SMM industry", "social media growth industry"],
  ["SMM tools you use", "growth tools you use"],
  ["SMM scams", "growth service scams"],
  ["SMM tools", "growth tools"],
  ["ethical SMM", "ethical growth"],
  ["smart SMM beats", "smart growth beats"],
  ["with SMM delivery", "with paid delivery"],
  ["SMM delivery", "service delivery"],
  ["SMM budgeting", "growth budgeting"],
  ["SMM line items", "growth line items"],
  ["cutting SMM entirely", "cutting growth spend entirely"],
  ["complain about SMM budgets", "complain about growth budgets"],
  ["adapted for SMM", "adapted for social growth"],
  ["discuss ethical SMM", "discuss ethical growth"],
  ["SMM Guide 2026", "Growth Guide 2026"],
  ["SMM Guide", "Growth Guide"],
  ["SMM panel check", "Growth platform check"],
  ["SMM panel", "growth platform"],
  ["SMM Panel", "Growth Platform"],
  ["SMM প্যানেল", "গrowth platform"],
  ["评估SMM面板", "评估增长平台"],
  ["panel SMM", "panel de crecimiento"],
  ["SMM kelimesi", "growth"],
  ["SMM kelimesi olmasın", "growth kelimesi olmasın"],
  ["SMM packages", "growth packages"],
  ["SMM package", "growth package"],
  ["SMM services", "growth services"],
  ["SMM service", "growth service"],
  ["SMM strategies", "growth strategies"],
  ["SMM growth", "social growth"],
  ["SMM-Wachstum", "Wachstum"],
  ["SMM-groei", "groei"],
  ["SMM ", " "],
  [" SMM", ""],
  ["smm panel", "growth platform"],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full, files);
    } else if (/\.(ts|tsx|js|mjs|json)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

let changed = 0;
for (const dir of TARGET_DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const file of walk(dir)) {
    if (file.includes("remove-smm.mjs")) continue;
    let text = fs.readFileSync(file, "utf8");
    if (!/smm/i.test(text)) continue;
    const original = text;
    for (const [from, to] of REPLACEMENTS) {
      text = text.split(from).join(to);
    }
    text = text.replace(/\bSMM\b/g, "");
    text = text.replace(/\bsmm\b/g, "");
    if (text !== original) {
      fs.writeFileSync(file, text, "utf8");
      changed++;
      console.log("updated:", path.relative(ROOT, file));
    }
  }
}

console.log(`Done. ${changed} file(s) updated.`);
