const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";
async function get(url) {
  try {
    const r = await fetch(url, { headers: { "user-agent": UA, accept: "application/json" } });
    const t = await r.text();
    return { status: r.status, ct: (r.headers.get("content-type") || "").slice(0, 40), len: t.length, head: t.slice(0, 700) };
  } catch (e) { return { error: e.message }; }
}
const B = "https://polure.com";
for (const p of ["/api/v1/categories", "/api/v1/products", "/api/v1/products?limit=2", "/api/v1/products?page=1&per_page=2", "/health", "/api/health", "/api/v1/settings"]) {
  const r = await get(B + p);
  console.log("\n=== " + p + " ===");
  console.log("status:", r.status, "| ct:", r.ct, "| len:", r.len);
  if (r.head) console.log(r.head);
  if (r.error) console.log("ERR:", r.error);
}
