// POST /api/candle -> { candles: n }   one shared counter document per memorial
const { mutate, query, send, MEMORIAL, CANDLES_ID } = require("./_sanity");

module.exports = async (req, res) => {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return send(res, 405, { error: "Method not allowed" }); }
  try {
    await mutate([
      { createIfNotExists: { _id: CANDLES_ID, _type: "candleCount", memorial: MEMORIAL, count: 0 } },
      { patch: { id: CANDLES_ID, inc: { count: 1 } } }
    ]);
    const n = await query(`coalesce(*[_id == $c][0].count, 0)`, { c: CANDLES_ID });
    return send(res, 200, { candles: n });
  } catch (e) {
    console.error(e);
    return send(res, e.status || 500, { error: "Something went wrong. Please try again." });
  }
};
