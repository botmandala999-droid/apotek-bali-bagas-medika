export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing url" });
  try {
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const txt = await r.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.status(200).send(txt);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
