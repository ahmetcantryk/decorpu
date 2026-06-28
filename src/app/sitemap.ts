import type { MetadataRoute } from "next";
import { getSitemapProducts, getAllCategories } from "@/lib/catalog";
import { getProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";

const BASE = "https://decorpu.com";

/** Bir yolu TR (prefixsiz) + EN (/en) hreflang alternatifleriyle sitemap girdisine çevirir. */
function entry(
  path: string,
  opts?: { lastModified?: string | Date; changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number },
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE}${path || "/"}`,
    lastModified: opts?.lastModified,
    changeFrequency: opts?.changeFrequency,
    priority: opts?.priority,
    alternates: { languages: { tr: `${BASE}${path || "/"}`, en: `${BASE}/en${path}` } },
  };
}

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, projects, services] = await Promise.all([
    getSitemapProducts(),
    getAllCategories(),
    getProjects(),
    getServices(),
  ]);

  const staticEntries: MetadataRoute.Sitemap = [
    entry("", { changeFrequency: "weekly", priority: 1 }),
    entry("/kategoriler", { changeFrequency: "weekly", priority: 0.9 }),
    entry("/calismalarimiz", { changeFrequency: "weekly", priority: 0.8 }),
    entry("/hizmetler", { changeFrequency: "monthly", priority: 0.7 }),
    entry("/teklif", { changeFrequency: "monthly", priority: 0.6 }),
    entry("/iletisim", { changeFrequency: "yearly", priority: 0.5 }),
    entry("/gizlilik", { changeFrequency: "yearly", priority: 0.2 }),
    entry("/kvkk", { changeFrequency: "yearly", priority: 0.2 }),
    entry("/cerez-politikasi", { changeFrequency: "yearly", priority: 0.2 }),
  ];

  const categoryEntries = categories.map((c) => entry(`/kategoriler/${c.slug}`, { changeFrequency: "weekly", priority: 0.7 }));

  const productEntries = products.map((p) =>
    entry(`/urun/${p.code.toLowerCase()}`, {
      lastModified: p.updated_at ?? undefined,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  const projectEntries = projects.map((p) => entry(`/calismalarimiz/${p.slug}`, { changeFrequency: "monthly", priority: 0.6 }));
  const serviceEntries = services.map((s) => entry(`/hizmetler/${s.slug}`, { changeFrequency: "monthly", priority: 0.5 }));

  return [...staticEntries, ...categoryEntries, ...productEntries, ...projectEntries, ...serviceEntries];
}
