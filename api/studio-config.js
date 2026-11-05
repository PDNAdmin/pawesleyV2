// GET /api/studio-config -> { projectId, dataset }
// Public values only (every Sanity read from a browser shows them); the token never leaves the server.
module.exports = (req, res) => {
  const tidy = v => (v || "").trim().replace(/^["']|["']$/g, "");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ projectId: tidy(process.env.SANITY_PROJECT_ID), dataset: tidy(process.env.SANITY_DATASET) || "production" }));
};
