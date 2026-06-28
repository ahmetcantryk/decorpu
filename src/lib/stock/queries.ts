import { createClient } from "@/lib/supabase/server";
import type { StockMovement } from "@/lib/supabase/types";

/** Stok durum eşiği. */
export type StockStatus = "out" | "low" | "ok";

export interface StockRow {
  id: string;
  code: string;
  name_tr: string;
  image: string | null;
  unit: string;
  stock_qty: number;
  min_level: number;
  status: StockStatus;
  category: string | null;
}

export type RecentMovement = StockMovement & { product_code: string; product_name: string };

export interface StockSummary {
  totalSkus: number;
  totalUnits: number;
  outCount: number;
  lowCount: number;
  alerts: StockRow[];
  recent: RecentMovement[];
}

export interface StockProductDetail extends StockRow {
  movements: StockMovement[];
}

function statusOf(qty: number, min: number): StockStatus {
  if (qty <= 0) return "out";
  if (qty <= min) return "low";
  return "ok";
}

function primaryImage(imgs?: { url: string; is_primary: boolean }[] | null): string | null {
  if (!imgs?.length) return null;
  return imgs.find((i) => i.is_primary)?.url ?? imgs[0].url;
}

/** Stok takipli ürünlerin listesi (opsiyonel arama + sadece-uyarı filtresi, JS tarafında). */
export async function getStockList(opts?: { q?: string; onlyAlerts?: boolean }): Promise<StockRow[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("id,code,name_tr,unit,stock_qty,min_level,product_images(url,is_primary),categories(name_tr)")
    .eq("track_stock", true)
    .order("name_tr");

  let rows: StockRow[] = (data ?? []).map((p) => {
    const cat = p.categories as { name_tr: string } | null;
    return {
      id: p.id,
      code: p.code,
      name_tr: p.name_tr,
      unit: p.unit,
      stock_qty: p.stock_qty,
      min_level: p.min_level,
      image: primaryImage(p.product_images),
      status: statusOf(p.stock_qty, p.min_level),
      category: cat?.name_tr ?? null,
    };
  });

  const q = opts?.q?.trim().toLowerCase();
  if (q) rows = rows.filter((r) => r.code.toLowerCase().includes(q) || r.name_tr.toLowerCase().includes(q));
  if (opts?.onlyAlerts) rows = rows.filter((r) => r.status !== "ok");
  return rows;
}

/** Panel özeti — toplamlar, kritik liste, son hareketler. */
export async function getStockSummary(): Promise<StockSummary> {
  const list = await getStockList();
  const supabase = await createClient();
  const { data: mv } = await supabase
    .from("stock_movements")
    .select("*, products(code,name_tr)")
    .order("created_at", { ascending: false })
    .limit(10);

  const recent: RecentMovement[] = (mv ?? []).map(({ products, ...m }) => {
    const prod = products as { code: string; name_tr: string } | null;
    return { ...m, product_code: prod?.code ?? "", product_name: prod?.name_tr ?? "" };
  });

  return {
    totalSkus: list.length,
    totalUnits: list.reduce((n, r) => n + r.stock_qty, 0),
    outCount: list.filter((r) => r.status === "out").length,
    lowCount: list.filter((r) => r.status === "low").length,
    alerts: list.filter((r) => r.status !== "ok"),
    recent,
  };
}

/** Tek ürünün stok detayı + son hareketleri. */
export async function getStockProduct(code: string): Promise<StockProductDetail | null> {
  const supabase = await createClient();
  const { data: p } = await supabase
    .from("products")
    .select("id,code,name_tr,unit,stock_qty,min_level,product_images(url,is_primary),categories(name_tr)")
    .ilike("code", code)
    .eq("track_stock", true)
    .limit(1)
    .maybeSingle();
  if (!p) return null;
  const cat = p.categories as { name_tr: string } | null;

  const { data: mv } = await supabase
    .from("stock_movements")
    .select("*")
    .eq("product_id", p.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return {
    id: p.id,
    code: p.code,
    name_tr: p.name_tr,
    unit: p.unit,
    stock_qty: p.stock_qty,
    min_level: p.min_level,
    image: primaryImage(p.product_images),
    status: statusOf(p.stock_qty, p.min_level),
    category: cat?.name_tr ?? null,
    movements: mv ?? [],
  };
}
