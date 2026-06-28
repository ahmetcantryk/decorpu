const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0 Safari/537.36";
async function get(url){ const r=await fetch(url,{headers:{'user-agent':UA,accept:'application/json'}}); const t=await r.text(); return {status:r.status,len:t.length,head:t.slice(0,900)}; }
const B="https://polure.com/api/v1";
for (const p of ["/products/2P81175","/media/2P81175","/related/2P81175","/categories/aplik-ve-nis","/translations/en","/menus/main"]) {
  const r=await get(B+p); console.log("\n=== "+p+" === ("+r.status+", "+r.len+"b)\n"+r.head);
}
