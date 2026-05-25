export async function GET(req) {
  const u = req.nextUrl.searchParams.get("url");
  if (!u) return new Response("Missing url", { status: 400 });
  try {
    const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" }, signal: AbortSignal.timeout(15000) });
    const txt = await r.text();
    return new Response(txt, { headers: { "Content-Type": "text/csv; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
  } catch(e) {
    return new Response("Error: " + e.message, { status: 500 });
  }
}
