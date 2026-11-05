// GET  /api/tributes  -> { tributes: [...], candles: n, approval: bool }
// POST /api/tributes  -> { id, pending }   body: { name, relation, message, website }
const { query, mutate, send, MEMORIAL, CANDLES_ID } = require("./_sanity");

const LIMITS = { name: 80, relation: 40, message: 3000 };
// Tributes appear for everyone as soon as they are written. The family can still remove one in Sanity Studio.
const APPROVAL = false;

// Tributes saved while approval was switched on are still drafts; publish them once so nobody's words stay hidden.
// The setup test entry is removed rather than published.
let draftsChecked = false;
async function publishWaitingDrafts() {
  if (draftsChecked) return;
  const drafts = await query(`*[_type == "tribute" && memorial == $m && _id in path("drafts.**")]`, { m: MEMORIAL }, "raw");
  const mutations = [];
  for (const d of drafts || []) {
    const id = d._id.replace(/^drafts\./, "");
    if (/setup test/i.test(d.name + " " + d.message)) { mutations.push({ delete: { id: d._id } }); continue; }
    const doc = { _id: id, _type: "tribute", memorial: d.memorial, name: d.name, relation: d.relation, message: d.message, createdAt: d.createdAt };
    mutations.push({ createOrReplace: doc }, { delete: { id: d._id } });
  }
  if (mutations.length) await mutate(mutations);
  draftsChecked = true;
}
const clean = (v, max) => String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);

module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      try { await publishWaitingDrafts(); } catch (e) { console.error("publishing drafts failed", e); }
      const data = await query(
        `{"tributes": *[_type == "tribute" && memorial == $m] | order(createdAt desc)[0...500]{"id": _id, name, relation, message, createdAt},
          "candles": coalesce(*[_id == $c][0].count, 0)}`,
        { m: MEMORIAL, c: CANDLES_ID }
      );
      return send(res, 200, { ...data, approval: APPROVAL });
    }

    if (req.method === "POST") {
      const b = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
      if (b.website) return send(res, 200, { id: null, pending: true }); // honeypot: quietly ignore bots
      const name = clean(b.name, LIMITS.name);
      const relation = clean(b.relation, LIMITS.relation);
      const message = clean(b.message, LIMITS.message);
      if (name.length < 2) return send(res, 400, { error: "Please write your name." });
      if (message.length < 3) return send(res, 400, { error: "Please write a few words for your tribute." });

      const doc = { _type: "tribute", memorial: MEMORIAL, name, relation, message, createdAt: new Date().toISOString() };
      const out = await mutate([{ create: doc }]);
      return send(res, 201, { id: out.results && out.results[0] && out.results[0].id, pending: APPROVAL });
    }

    res.setHeader("Allow", "GET, POST");
    return send(res, 405, { error: "Method not allowed" });
  } catch (e) {
    console.error(e);
    return send(res, e.status || 500, { error: e.status === 503 ? "Tributes are not set up yet." : "Something went wrong. Please try again.", detail: String(e.message || e).slice(0, 300) });
  }
};
