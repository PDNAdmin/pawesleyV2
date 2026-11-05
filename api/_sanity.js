// Server-only Sanity access. The write token lives in Vercel environment variables, never in the browser.
const API = "v2024-01-01";

function env() {
  // tolerate values pasted with spaces or quotes
  const tidy = v => (v || "").trim().replace(/^["']|["']$/g, "");
  const projectId = tidy(process.env.SANITY_PROJECT_ID);
  const dataset = tidy(process.env.SANITY_DATASET) || "production";
  const token = tidy(process.env.SANITY_WRITE_TOKEN);
  if (!projectId || !token) throw Object.assign(new Error("Sanity is not configured"), { status: 503 });
  return { projectId, dataset, token };
}

async function query(groq, params) {
  const { projectId, dataset, token } = env();
  const qs = new URLSearchParams({ query: groq, perspective: "published" });
  for (const [k, v] of Object.entries(params || {})) qs.set("$" + k, JSON.stringify(v));
  const r = await fetch(`https://${projectId}.api.sanity.io/${API}/data/query/${dataset}?${qs}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!r.ok) throw Object.assign(new Error("Sanity query failed: " + r.status), { status: 502 });
  return (await r.json()).result;
}

async function mutate(mutations) {
  const { projectId, dataset, token } = env();
  const r = await fetch(`https://${projectId}.api.sanity.io/${API}/data/mutate/${dataset}?returnIds=true&returnDocuments=true`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ mutations })
  });
  if (!r.ok) throw Object.assign(new Error("Sanity write failed: " + r.status + " " + (await r.text()).slice(0, 200)), { status: 502 });
  return r.json();
}

const MEMORIAL = process.env.MEMORIAL_ID || "wesley-olajide-ojo-aiyegboka";
const CANDLES_ID = `candles-${MEMORIAL}`;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

module.exports = { query, mutate, send, MEMORIAL, CANDLES_ID };
