import { createPublicClient } from "@/lib/supabase/public";
import type { CatalogProduct } from "@/lib/catalog";

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  description: string | null;
  cover_url: string | null;
  location: string | null;
  year: number | null;
}

export interface ProjectDetail extends Project {
  images: string[];
  products: CatalogProduct[];
}

function primaryImage(imgs?: { url: string; is_primary: boolean }[] | null): string | null {
  if (!imgs?.length) return null;
  return imgs.find((i) => i.is_primary)?.url ?? imgs[0].url;
}

export async function getProjects(): Promise<Project[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("projects")
    .select("id,slug,title,summary,description,cover_url,location,year")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("projects")
    .select("id,slug,title,summary,description,cover_url,location,year,project_images(url,sort_order),project_products(products(id,code,slug,name_tr,price,currency,width_mm,length_mm,height_mm,diameter_mm,category_id,drawing_url,product_images(url,is_primary)))")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!data) return null;

  const images = (data.project_images ?? [])
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((i) => i.url);

  const products: CatalogProduct[] = (data.project_products ?? [])
    .map((pp) => pp.products)
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => {
      const { product_images, drawing_url, ...rest } = p;
      return { ...rest, drawing: drawing_url ?? null, image: primaryImage(product_images) };
    });

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    summary: data.summary,
    description: data.description,
    cover_url: data.cover_url,
    location: data.location,
    year: data.year,
    images: images.length ? images : data.cover_url ? [data.cover_url] : [],
    products,
  };
}
