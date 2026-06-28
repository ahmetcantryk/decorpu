/**
 * Generate Supabase seed SQL from polure harvest, mapped to DecorPU canonical
 * categories. Products use polure codes/dims/prices + polure CDN image URLs
 * (TEMPORARY placeholder imagery — replace with own studio shots before launch).
 * Outputs batched .sql files for execution via MCP.
 */
import { readFileSync, writeFileSync } from "node:fs";

const list = JSON.parse(readFileSync("products-list.json", "utf8"));

// polure category_name -> our category slug (parent or subcategory)
const MAP = {
  "Süsleme": "susleme",
  "Yuvarlak Kavis Kemer": "kemer",
  "Sütun Başlık": "baslik",
  "Payanda": "payanda",
  "Pilaster Sütun Başlık": "pilaster",
  "Desenli Çıta köşesi": "cita-kose",
  "Söve": "sove",
  "Taç": "tac",
  "Göbek": "gobek",
  "Desenli Kartonpiyer": "kartonpiyer",
  "Dekupe Panel": "panel-kaplama",
  "Panel": "panel-kaplama",
  "Desenli Bordür": "bordur",
  "Dairesel Kısa Roma Sütun": "kisa-roma-sutun",
  "Sütun Alt Kaide": "sutun-baslik",
  "Ahşap Kiriş": "kiris",
  "Ahşap kiriş Payanda": "payanda",
  "Yivli Sütun": "sutun-baslik",
  "Ahşap Kiriş Kapağı": "kiris",
  "Pilaster Sütun Alt Kaide": "pilaster",
  "Burgulu Sütun": "sutun-baslik",
  "Düz Kartonpiyer": "kartonpiyer",
  "Kubbe": "kubbe",
  "Desenli Çıta": "cita-lambri",
  "Düz Çıta": "cita-lambri",
  "Düz Bordür": "bordur",
  "Yivli Pilaster Sütun": "pilaster",
  "Desenli Sütun Ayağı": "sutun-baslik",
  "Düz Sütun": "sutun-baslik",
  "Düz Çıta Köşesi": "cita-kose",
  "Pilaster Sütun İyon Başlık": "pilaster",
  "Pilaster Panel Sütun": "pilaster",
  "Gizli Işık": "gizli-isik",
  "Süpürgelik": "supurgelik",
  "Pilaster Kısa Roma Sütun": "kisa-roma-sutun",
  "Küpeşte": "kupeste-balustr",
  "Aplik": "aplik",
  "Söve Süsü": "sove",
  "Rolyef": "susleme",
  "Şömine": "somine",
  "Badastrol": "kupeste-balustr",
  "Aydınlatma Sütunlar": "sutun-baslik",
  "Dekoratif Elektrikli Şömine": "somine",
  "Desenli Pilaster Sütun": "pilaster",
  "Ahşap Panel": "panel-kaplama",
  "Bordür Taçı": "bordur",
  "Kapı Söveleri": "sove",
  "Pencere Söveleri": "pencere-sove",
  "Söve Taçı": "sove",
  "Niş": "nis",
  "Ahşap Tekerlek": "kutuk",
  "Saksı Takım": "susleme",
  "Amorf Armatür": "gizli-isik",
  "Elektrikli yapay ateş Şömine İçin": "somine",
  "Ayna": "susleme",
  "Ahşap Köşe": "kiris",
  "Sehpa Sütun": "sutun-baslik",
  "kahve Masası": "susleme",
};

const PER_CAT = 14; // cap per mapped category to keep catalog balanced
const sq = (s) => (s == null ? null : String(s).replace(/'/g, "''"));
const numv = (v) => (v == null || v === "" || Number.isNaN(Number(v)) ? "null" : Number(v));

// group + cap
const groups = {};
for (const p of list) {
  const slug = MAP[p.category_name];
  if (!slug) continue;
  (groups[slug] ||= []).push(p);
}
const rows = [];
for (const [slug, items] of Object.entries(groups)) {
  for (const p of items.slice(0, PER_CAT)) {
    const code = (p.sku || "").trim();
    if (!code) continue;
    rows.push({ code, slug: code.toLowerCase(), cat: slug, name: p.title || code, price: p.price, w: p.width, l: p.length, h: p.height });
  }
}
console.log(`mapped ${rows.length} products across ${Object.keys(groups).length} categories`);

// build batched SQL
const BATCH = 120;
let fileIdx = 0;
for (let i = 0; i < rows.length; i += BATCH) {
  const chunk = rows.slice(i, i + BATCH);
  const values = chunk
    .map(
      (r) =>
        `('${sq(r.code)}','${sq(r.slug)}','${sq(r.cat)}','${sq(r.name)}',${numv(r.price)},${numv(r.w)},${numv(r.l)},${numv(r.h)})`,
    )
    .join(",\n");
  const sql = `
insert into products (code, slug, category_id, name_tr, price, width_mm, length_mm, height_mm, is_active, material, currency)
select v.code, v.slug, c.id, v.name_tr, v.price, v.w, v.l, v.h, true, 'Poliüretan', 'TRY'
from (values
${values}
) as v(code, slug, cat_slug, name_tr, price, w, l, h)
join categories c on c.slug = v.cat_slug
on conflict (code) do nothing;

insert into product_images (product_id, url, is_primary)
select p.id, 'https://polure.com/a/media/' || p.slug || '/' || p.slug || '-800w.jpg', true
from products p
where p.slug in (${chunk.map((r) => `'${sq(r.slug)}'`).join(",")})
  and not exists (select 1 from product_images pi where pi.product_id = p.id);
`;
  fileIdx++;
  writeFileSync(`seed-batch-${fileIdx}.sql`, sql.trim());
  console.log(`seed-batch-${fileIdx}.sql (${chunk.length} rows)`);
}
console.log("done, batches:", fileIdx);
