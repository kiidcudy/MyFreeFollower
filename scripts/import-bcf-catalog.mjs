/**
 * Reference catalog import helper for buycheapfollower.com data.
 * Catalog is maintained in src/lib/catalog/*.ts — run this script to validate counts.
 */
import { allFreeServices, allPaidServices } from "../src/lib/catalog/index.ts";

console.log("MyFreeFollower catalog summary");
console.log("Free services:", allFreeServices.length);
console.log("Paid services:", allPaidServices.length);
console.log(
  "Platforms:",
  [...new Set(allFreeServices.map((s) => s.platform))].join(", "),
);
