/**
 * Harvest polure.com PUBLIC CATALOG API -> raw JSON.
 * Only GET catalog endpoints. No POST /sync/*, no /stats/dashboard. Polite concurrency.
 * Run: node harvest.mjs   (writes JSON into this folder)
 */
import { writeFileSync } from "node:fs";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
const B = "https://polure.com/api/v1";
const CONCURRENCY = 5;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(path, { tries = 4, timeout = 30000 } = {}) {
  for (let a = 1; a <= tries; a++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeout);
    try {
      const r = await fetch(B + path, { headers: { "user-agent": UA, accept: "application/json" }, signal: ctrl.signal });
      if (!r.ok) throw new Error("HTTP " + r.status);
      return await r.json();
    } catch (e) {
      if (a === tries) { console.warn("  ! fail " + path + " : " + e.message); return null; }
      await sleep(500 * a);
    } finally { clearTimeout(t); }
  }
}

async function pool(items, n, fn, onProg) {
  let i = 0, done = 0;
  const out = [];
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const k = i++;
        out[k] = await fn(items[k], k);
        done++;
        if (onProg && done % 50 === 0) onProg(done, items.length);
        await sleep(60);
      }
    }),
  );
  return out;
}

console.log("1) categories");
const categories = (await getJson("/categories")) || [];
writeFileSync("categories.json", JSON.stringify(categories, null, 2));
console.log("   " + categories.length + " categories");

console.log("2) category details");
const catDetails = (await pool(categories, CONCURRENCY, (c) => getJson("/categories/" + c.slug))).filter(Boolean);
writeFileSync("category-details.json", JSON.stringify(catDetails, null, 2));
console.log("   " + catDetails.length + " category details");

console.log("3) products list (paginated)");
let list = [], offset = 0, total = Infinity;
while (list.length < total) {
  const r = await getJson(`/products?limit=200&offset=${offset}`);
  if (!r || !r.products) break;
  total = r.total ?? list.length;
  list.push(...r.products);
  offset += 200;
  console.log("   " + list.length + " / " + total);
}
writeFileSync("products-list.json", JSON.stringify(list, null, 2));

console.log("4) product details (+ media, categories, related, ai_tags)");
const full = await pool(
  list,
  CONCURRENCY,
  async (p) => {
    const d = await getJson("/products/" + encodeURIComponent(p.sku));
    if (!d) return { sku: p.sku, _failed: true, listing: p };
    return {
      sku: p.sku,
      listing: p,
      product: d.product ?? null,
      media: d.media ?? [],
      categories: d.categories ?? [],
      related: d.related ?? [],
      ai_tags: d.ai_tags ?? [],
    };
  },
  (a, b) => console.log("   " + a + " / " + b),
);
writeFileSync("products-full.json", JSON.stringify(full, null, 2));
console.log("   " + full.filter((x) => !x._failed).length + " / " + list.length + " details ok");

console.log("5) extras (currencies, translations, menu)");
for (const [name, path] of [["currencies", "/currencies"], ["translations-tr", "/translations/tr"], ["translations-en", "/translations/en"], ["menu-main", "/menus/main"]]) {
  const j = await getJson(path);
  if (j) writeFileSync(name + ".json", JSON.stringify(j, null, 2));
}

console.log("\n✔ DONE — JSON written to docs/research/polure-api/");
