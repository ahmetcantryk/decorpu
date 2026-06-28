/**
 * Build polure-catalog.xlsx from the harvested JSON.
 * Sheets: Products (807), Categories (tree), Summary.
 */
import { readFileSync } from "node:fs";
import * as XLSX from "xlsx";

const ROOT = "https://polure.com";
const full = JSON.parse(readFileSync("products-full.json", "utf8"));
const topCats = JSON.parse(readFileSync("categories.json", "utf8"));
const catDetails = JSON.parse(readFileSync("category-details.json", "utf8"));

const stripHtml = (s) => (s || "").replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
const yn = (b) => (b === true ? "Evet" : b === false ? "Hayır" : "");
const num = (v) => (v === null || v === undefined ? "" : v);

const catSeoBySlug = Object.fromEntries(catDetails.map((c) => [c.category?.slug ?? c.slug, c.category ?? c]));

// ---- Products sheet ----
const productRows = full.map((f) => {
  const p = f.product ?? {};
  const chain = (f.categories ?? []).filter((c) => c && c.name);
  const leaf = chain[chain.length - 1] ?? {};
  const top = chain[0] ?? {};
  const slug = p.slug ?? f.sku.toLowerCase();
  const media = f.media ?? [];
  return {
    Kod: f.sku,
    Başlık: p.title ?? f.listing?.title ?? "",
    "Ana Kategori": top.name ?? "",
    "Alt Kategori": leaf.name ?? f.listing?.category_name ?? "",
    "Kategori Yolu": chain.map((c) => c.name).join(" > "),
    "Fiyat": num(p.base_price ?? f.listing?.price),
    "Para": p.base_currency ?? "TRY",
    "KDV %": num(p.vat_rate),
    "İndirim %": num(p.discount_rate),
    "En (mm)": num(p.width),
    "Boy (mm)": num(p.length),
    "Yükseklik (mm)": num(p.height),
    "Çap (mm)": num(p.diameter),
    "Ağırlık (g)": num(p.weight_gram),
    "Birim": p.unit_type ?? "",
    "Malzeme": p.raw_material || p.material || "",
    "Yoğunluk": p.density ?? "",
    "Renk": p.color ?? "",
    "Yüzey": p.surface_texture ?? "",
    "Boyanabilir": yn(p.paintable),
    "İç Mekan": yn(p.indoor),
    "Dış Mekan": yn(p.outdoor),
    "Su Geçirmez": yn(p.water_resistant),
    "Min. Sipariş": num(p.min_order),
    "Garanti": p.warranty ?? "",
    "Stok": num(p.stock),
    "Kullanım Alanları": stripHtml(p.usage_areas || p.usage_areas_text).slice(0, 500),
    "Anahtar Kelimeler": Array.isArray(p.keywords) ? p.keywords.join(", ") : p.keywords || p.seo_keywords || "",
    "Görsel Sayısı": media.length,
    "Ana Görsel URL": `${ROOT}/a/media/${slug}/${slug}-800w.jpg`,
    "Görsel Dosyaları": media.map((m) => m.original_filename).join(", "),
    "Ürün URL": `${ROOT}/a/tr/products/${slug}/`,
    "SEO Başlık": p.seo_title ?? "",
    "Açıklama": stripHtml(p.description).slice(0, 1500),
    "Oluşturma": p.created_at ?? "",
    "Güncelleme": p.updated_at ?? "",
  };
});

// ---- Categories sheet: build from real product chains, enrich top-levels ----
const catInfo = new Map(); // slug -> {slug,name,parentName,count,isTop}
for (const f of full) {
  const chain = (f.categories ?? []).filter((c) => c && c.name);
  chain.forEach((c, i) => {
    if (!catInfo.has(c.slug)) catInfo.set(c.slug, { slug: c.slug, name: c.name, parentName: chain[i - 1]?.name ?? "", count: 0, isTop: i === 0 });
    const e = catInfo.get(c.slug);
    e.count++;
    if (i === 0) e.isTop = true;
    else if (!e.parentName) e.parentName = chain[i - 1].name;
  });
}
// include named top categories that have no products yet
for (const c of topCats) {
  if (c.name && !catInfo.has(c.slug)) catInfo.set(c.slug, { slug: c.slug, name: c.name, parentName: "", count: Number(c.product_count) || 0, isTop: true });
}
const topBySlug = Object.fromEntries(topCats.filter((c) => c.name).map((c) => [c.slug, c]));
const categoryRows = [...catInfo.values()]
  .map((e) => {
    const t = topBySlug[e.slug];
    const seo = catSeoBySlug[e.slug] ?? {};
    const isAna = Boolean(t);
    return {
      Kategori: e.name,
      Slug: e.slug,
      "Üst Kategori": isAna ? "" : e.parentName,
      Seviye: isAna ? "Ana" : "Alt",
      "Ürün Sayısı": e.count,
      "API Ürün Sayısı": t ? num(t.product_count) : "",
      "Görsel Klasörü": t?.image_folder ?? "",
      "SEO Başlık": seo.seo_title ?? "",
      "SEO Açıklama": seo.seo_description ?? "",
    };
  })
  .sort((a, b) => (a.Seviye === b.Seviye ? String(a.Kategori).localeCompare(String(b.Kategori), "tr") : a.Seviye === "Ana" ? -1 : 1));

// ---- Summary ----
const byCat = {};
for (const r of productRows) byCat[r["Ana Kategori"] || "—"] = (byCat[r["Ana Kategori"] || "—"] || 0) + 1;
const summaryRows = [
  { Metrik: "Toplam ürün", Değer: productRows.length },
  { Metrik: "Toplam kategori (ana+alt)", Değer: categoryRows.length },
  { Metrik: "Ana kategori", Değer: categoryRows.filter((c) => c.Seviye === "Ana").length },
  { Metrik: "Alt kategori", Değer: categoryRows.filter((c) => c.Seviye === "Alt").length },
  { Metrik: "Kaynak", Değer: "polure.com/api/v1 — " + new Date().toISOString().slice(0, 10) },
  {},
  { Metrik: "ANA KATEGORİYE GÖRE ÜRÜN", Değer: "" },
  ...Object.entries(byCat).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ Metrik: k, Değer: v })),
];

function sheet(rows, widths) {
  const ws = XLSX.utils.json_to_sheet(rows);
  if (widths) ws["!cols"] = widths.map((w) => ({ wch: w }));
  ws["!autofilter"] = { ref: ws["!ref"] };
  return ws;
}

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, sheet(summaryRows, [32, 60]), "Özet");
XLSX.utils.book_append_sheet(
  wb,
  sheet(productRows, [14, 48, 18, 22, 30, 10, 6, 6, 8, 9, 9, 12, 9, 10, 8, 14, 10, 10, 28, 11, 8, 9, 11, 10, 10, 7, 40, 30, 10, 46, 40, 46, 40, 60, 18, 18]),
  "Ürünler",
);
XLSX.utils.book_append_sheet(wb, sheet(categoryRows, [26, 26, 22, 8, 11, 16, 16, 40, 60]), "Kategoriler");
XLSX.writeFile(wb, "polure-catalog.xlsx");
console.log(`✔ polure-catalog.xlsx — ${productRows.length} ürün, ${categoryRows.length} kategori`);
