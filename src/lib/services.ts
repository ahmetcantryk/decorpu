import { createPublicClient } from "@/lib/supabase/public";
import type { CatalogProduct } from "@/lib/catalog";

export interface Service {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  description: string | null;
  image_url: string | null;
  icon: string | null;
  cta_label: string | null;
}

export interface ServiceDetail extends Service {
  content: string | null;
  seo_title: string | null;
  seo_description: string | null;
  products: CatalogProduct[];
}

function primaryImage(imgs?: { url: string; is_primary: boolean }[] | null): string | null {
  if (!imgs?.length) return null;
  return imgs.find((i) => i.is_primary)?.url ?? imgs[0].url;
}

export async function getServices(): Promise<Service[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("services")
    .select("id,slug,title,summary,description,image_url,icon,cta_label")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export async function getServiceBySlug(slug: string): Promise<ServiceDetail | null> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("services")
    .select("*, service_products(products(id,code,slug,name_tr,price,currency,width_mm,length_mm,height_mm,diameter_mm,category_id,drawing_url,product_images(url,is_primary)))")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!data) return null;

  const products: CatalogProduct[] = (data.service_products ?? [])
    .map((sp) => sp.products)
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
    content: data.content,
    image_url: data.image_url,
    icon: data.icon,
    cta_label: data.cta_label,
    seo_title: data.seo_title,
    seo_description: data.seo_description,
    products,
  };
}
