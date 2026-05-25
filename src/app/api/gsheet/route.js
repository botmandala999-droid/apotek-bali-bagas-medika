import { NextResponse } from "next/server";

export async function GET(req) {
  const u = req.nextUrl.searchParams.get("url");
  if (!u) return NextResponse.json({ error: "Missing url" }, { status: 400 });
  try {
    const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
    const txt = await r.text();
    return new NextResponse(txt, { headers: { "Content-Type": "text/csv; charset=utf-8", "Access-Control-Allow-Origin": "*" } });
  } catch(e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
