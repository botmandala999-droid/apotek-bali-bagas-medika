export async function GET(req) {
  const u = req.nextUrl.searchParams.get("url");
  if (!u) return new Response("Missing url", { status: 400 });
  const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
  const txt = await r.text();
  return new Response(txt, { headers: { "Content-Type": "text/csv; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
}
