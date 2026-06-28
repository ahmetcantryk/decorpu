import { createPublicClient } from "@/lib/supabase/public";

export interface CatalogCategory {
  id: string;
  slug: string;
  name_tr: string;
  name_en: string | null;
  description: string | null;
  parent_id: string | null;
  sort_order: number;
}

export interface CatalogProduct {
  id: string;
  code: string;
  slug: string | null;
  name_tr: string;
  price: number | null;
  currency: string;
  width_mm: number | null;
  length_mm: number | null;
  height_mm: number | null;
  diameter_mm: number | null;
  category_id: string | null;
  image: string | null;
  drawing: string | null;
}

export interface CategoryNode extends CatalogCategory {
  children: CatalogCategory[];
  productCount: number;
  cover: string | null;
}

function primaryImage(imgs?: { url: string; is_primary: boolean }[] | null): string | null {
  if (!imgs?.length) return null;
  return imgs.find((i) => i.is_primary)?.url ?? imgs[0].url;
}

/** All categories (flat). */
export async function getAllCategories(): Promise<CatalogCategory[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("categories")
    .select("id,slug,name_tr,name_en,description,parent_id,sort_order")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

/** Active product codes + last-modified for the sitemap. */
export async function getSitemapProducts(): Promise<{ code: string; updated_at: string | null }[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("products")
    .select("code,updated_at")
    .eq("is_active", true)
    .order("code");
  return data ?? [];
}

/** Main categories enriched with descendant product counts + a cover image. */
export async function getCategoryTree(): Promise<CategoryNode[]> {
  const supabase = createPublicClient();
  const [{ data: cats }, { data: prods }] = await Promise.all([
    supabase
      .from("categories")
      .select("id,slug,name_tr,name_en,description,parent_id,sort_order")
      .eq("is_active", true)
      .order("sort_order"),
    supabase
      .from("products")
      .select("id,category_id,product_images(url,is_primary)")
      .eq("is_active", true),
  ]);

  const categories = cats ?? [];
  const products = prods ?? [];
  const parents = categories.filter((c) => !c.parent_id);
  const childrenOf = (id: string): CatalogCategory[] => categories.filter((c) => c.parent_id === id);

  // map category -> product images
  const imagesByCat = new Map<string, string[]>();
  const countByCat = new Map<string, number>();
  for (const p of products) {
    if (!p.category_id) continue;
    countByCat.set(p.category_id, (countByCat.get(p.category_id) ?? 0) + 1);
    const img = primaryImage(p.product_images);
    if (img) {
      const arr = imagesByCat.get(p.category_id) ?? [];
      arr.push(img);
      imagesByCat.set(p.category_id, arr);
    }
  }

  return parents.map((parent) => {
    const kids = childrenOf(parent.id);
    const ids = [parent.id, ...kids.map((k) => k.id)];
    const productCount = ids.reduce((n, id) => n + (countByCat.get(id) ?? 0), 0);
    const cover = ids.map((id) => imagesByCat.get(id)?.[0]).find(Boolean) ?? null;
    return { ...parent, children: kids, productCount, cover };
  });
}

/** A single category with its parent + sibling subcategories. */
export async function getCategoryBySlug(
  slug: string,
): Promise<{ category: CatalogCategory; parent: CatalogCategory | null; children: CatalogCategory[] } | null> {
  const all = await getAllCategories();
  const category = all.find((c) => c.slug === slug);
  if (!category) return null;
  const parent = category.parent_id ? all.find((c) => c.id === category.parent_id) ?? null : null;
  const children = all.filter((c) => c.parent_id === category.id);
  return { category, parent, children };
}

/** Products in a category (optionally including descendant subcategories). */
export async function getProductsInCategory(
  categoryId: string,
  descendantIds: string[] = [],
): Promise<CatalogProduct[]> {
  const supabase = createPublicClient();
  const ids = [categoryId, ...descendantIds];
  const { data } = await supabase
    .from("products")
    .select("id,code,slug,name_tr,price,currency,width_mm,length_mm,height_mm,diameter_mm,category_id,drawing_url,is_active,product_images(url,is_primary)")
    .in("category_id", ids)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("price", { ascending: true, nullsFirst: false })
    .limit(500);
  return (data ?? []).map((p) => {
    const { product_images, is_active, drawing_url, ...rest } = p;
    void is_active;
    return { ...rest, drawing: drawing_url ?? null, image: primaryImage(product_images) };
  });
}

export interface ProductDetail extends CatalogProduct {
  description_tr: string | null;
  material: string | null;
  paintable: boolean | null;
  indoor: boolean | null;
  outdoor: boolean | null;
  water_resistant: boolean | null;
  weight_g: number | null;
  images: string[];
  category: CatalogCategory | null;
  parent: CatalogCategory | null;
}

/** Full product detail by code, with image list + category chain. */
export async function getProductByCode(code: string): Promise<ProductDetail | null> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("products")
    .select("*, product_images(url,is_primary,sort_order)")
    .ilike("code", code)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();
  if (!data) return null;

  const { product_images, ...p } = data;
  const imgs = (product_images ?? [])
    .slice()
    .sort((a, b) => Number(b.is_primary) - Number(a.is_primary) || a.sort_order - b.sort_order)
    .map((i) => i.url);

  let category: CatalogCategory | null = null;
  let parent: CatalogCategory | null = null;
  if (p.category_id) {
    const all = await getAllCategories();
    category = all.find((c) => c.id === p.category_id) ?? null;
    parent = category?.parent_id ? all.find((c) => c.id === category!.parent_id) ?? null : null;
  }

  return {
    id: p.id,
    code: p.code,
    slug: p.slug,
    name_tr: p.name_tr,
    price: p.price,
    currency: p.currency,
    width_mm: p.width_mm,
    length_mm: p.length_mm,
    height_mm: p.height_mm,
    diameter_mm: p.diameter_mm,
    weight_g: p.weight_g,
    category_id: p.category_id,
    description_tr: p.description_tr,
    material: p.material,
    paintable: p.paintable,
    indoor: p.indoor,
    outdoor: p.outdoor,
    water_resistant: p.water_resistant,
    image: imgs[0] ?? null,
    drawing: p.drawing_url ?? null,
    images: imgs,
    category,
    parent,
  };
}

/** Related products in the same category (excluding the given code). */
export async function getRelatedProducts(categoryId: string | null, excludeCode: string, limit = 8): Promise<CatalogProduct[]> {
  if (!categoryId) return [];
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("products")
    .select("id,code,slug,name_tr,price,currency,width_mm,length_mm,height_mm,diameter_mm,category_id,drawing_url,is_active,product_images(url,is_primary)")
    .eq("category_id", categoryId)
    .eq("is_active", true)
    .neq("code", excludeCode)
    .order("sort_order", { ascending: true })
    .limit(limit);
  return (data ?? []).map((p) => {
    const { product_images, is_active, drawing_url, ...rest } = p;
    void is_active;
    return { ...rest, drawing: drawing_url ?? null, image: primaryImage(product_images) };
  });
}

/** Fuzzy code/name search. */
export async function searchProducts(query: string, limit = 60): Promise<CatalogProduct[]> {
  const q = query.replace(/[%,()*]/g, " ").trim();
  if (!q) return [];
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("products")
    .select("id,code,slug,name_tr,price,currency,width_mm,length_mm,height_mm,diameter_mm,category_id,drawing_url,is_active,product_images(url,is_primary)")
    .or(`code.ilike.%${q}%,name_tr.ilike.%${q}%`)
    .eq("is_active", true)
    .limit(limit);
  return (data ?? []).map((p) => {
    const { product_images, is_active, drawing_url, ...rest } = p;
    void is_active;
    return { ...rest, drawing: drawing_url ?? null, image: primaryImage(product_images) };
  });
}
