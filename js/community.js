/* Guest tributes and candles.
   Stored in Sanity through the site's own /api functions (the write token stays on the server).
   When those functions are not reachable (a local preview), this device's storage is used, clearly labelled. */

const ID = "wesley-olajide-ojo-aiyegboka";
const LIMITS = { name: 80, relation: 40, message: 3000 };
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const M = () => window.Memorial || {};

function readLocal(k, d) { try { return JSON.parse(localStorage.getItem(k) || d); } catch (e) { return JSON.parse(d); } }
function writeLocal(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* storage blocked */ } }

function localStore() {
  const KEY = `tributes:${ID}`, CANDLE = `candles:${ID}`;
  const subs = new Set();
  const emit = () => { const l = readLocal(KEY, "[]").sort((a, b) => b.createdAt - a.createdAt); subs.forEach(cb => cb(l)); };
  return {
    mode: "local",
    subscribe(cb) { subs.add(cb); emit(); },
    async add(t) { const item = { ...t, id: "local-" + Date.now().toString(36), createdAt: Date.now() }; writeLocal(KEY, [item, ...readLocal(KEY, "[]")]); emit(); return { id: item.id, pending: false }; },
    async candles() { return readLocal(CANDLE, "0"); },
    async light() { const n = readLocal(CANDLE, "0") + 1; writeLocal(CANDLE, n); return n; }
  };
}

function apiStore(first) {
  const subs = new Set();
  let items = first.tributes, candleCount = first.candles;
  const norm = l => l.map(t => ({ ...t, createdAt: Date.parse(t.createdAt) || Date.now() }));
  const emit = () => subs.forEach(cb => cb(norm(items)));
  async function refresh() {
    try { const r = await fetch("/api/tributes", { cache: "no-store" }); if (r.ok) { const d = await r.json(); items = d.tributes; candleCount = d.candles; emit(); } } catch (e) { /* offline: keep what we have */ }
  }
  // new tributes from other guests arrive while the page is open
  setInterval(() => { if (!document.hidden) refresh(); }, 30000);
  return {
    mode: "sanity",
    approval: !!first.approval,
    refresh: () => { emit(); return refresh(); },
    subscribe(cb) { subs.add(cb); emit(); },
    async add(t) {
      const r = await fetch("/api/tributes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(t) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw Object.assign(new Error(d.error || "Post failed"), { userMessage: d.error });
      if (!d.pending) { items = [{ id: d.id, ...t, createdAt: new Date().toISOString() }, ...items]; emit(); refresh(); }
      return d;
    },
    async candles() { return candleCount; },
    async light() { const r = await fetch("/api/candle", { method: "POST" }); const d = await r.json(); if (!r.ok) throw new Error(d.error); candleCount = d.candles; return d.candles; }
  };
}

const LOCAL_PREVIEW = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === "file:";
async function connect() {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch("/api/tributes", { cache: "no-store" });
      if (r.ok) return apiStore(await r.json());
    } catch (e) { /* network hiccup: try again */ }
    await new Promise(res => setTimeout(res, 1200 * (attempt + 1)));
  }
  if (LOCAL_PREVIEW) { console.info("Local preview: tributes are kept in this browser."); return localStore(); }
  return offlineStore();
}
// the live site never pretends to save: if the service cannot be reached, posting says so
function offlineStore() {
  return {
    mode: "offline",
    subscribe(cb) { cb([]); },
    async add() { throw Object.assign(new Error("offline"), { userMessage: "Sorry, tributes cannot be posted right now. Please check your internet connection and try again in a moment." }); },
    async candles() { return 0; },
    async light() { throw new Error("offline"); }
  };
}
const storeReady = connect();

function fmtDate(ms) { try { return new Date(ms).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return ""; } }

/* ------------------------------------------------ online tributes, in the same grid as the programme's */
const grid = $("#tribute-list");
const MINE = `myTributes:${ID}`;
let newestId = null;
const strip = id => String(id || "").replace(/^drafts\./, "");

function render(items) {
  // the writer sees their own tribute straight away, marked as waiting, until the family publishes it
  const published = new Set(items.map(t => strip(t.id)));
  const mine = readLocal(MINE, "[]").filter(t => !published.has(strip(t.id)));
  writeLocal(MINE, mine);
  const all = [...mine.map(t => ({ ...t, pending: true })), ...items];
  $$(".tcard--online, .tdivider", grid).forEach(n => n.remove());
  if (!all.length) { M().filterCards && M().filterCards(); return; }
  const div = document.createElement("p");
  div.className = "tdivider";
  div.innerHTML = '<span>Written online</span><span class="tdivider__count"></span>';
  $(".tdivider__count", div).textContent = all.length === 1 ? "1 tribute" : `${all.length} tributes`;
  grid.append(div);
  const forReader = all.map(g => ({ title: "", body: String(g.message).split(/\n{2,}/), author: g.name, relation: [g.relation, fmtDate(g.createdAt)].filter(Boolean).join(" · ") }));
  all.forEach((t, k) => {
    const card = M().buildCard({ author: t.name, relation: t.relation, title: "", body: [t.message] }, {
      label: fmtDate(t.createdAt),
      extraClass: "tcard--online" + (t.pending ? " is-pending" : "") + (strip(t.id) === strip(newestId) ? " is-new" : ""),
      note: t.pending ? "Waiting for the family to approve it" : "",
      onOpen: () => M().openReader(forReader, k, "Online tribute")
    });
    card.classList.add("is-in");
    grid.append(card);
  });
  M().filterCards && M().filterCards();
}

/* ------------------------------------------------ writing a tribute */
const dlg = $("#compose"), form = $("#compose-form"), err = $("#compose-error"), submit = $("#compose-submit");
let lastFocus = null;
function openCompose() { lastFocus = document.activeElement; err.hidden = true; dlg.showModal(); setTimeout(() => form.elements.name.focus(), 50); }
function closeCompose() { dlg.close(); if (lastFocus) lastFocus.focus(); }
$$("[data-compose]").forEach(b => b.addEventListener("click", openCompose));
$$("[data-close]", dlg).forEach(b => b.addEventListener("click", closeCompose));
dlg.addEventListener("click", e => { if (e.target === dlg) closeCompose(); });
form.elements.message.addEventListener("input", () => { $("#compose-chars").textContent = String(form.elements.message.value.length); });

function showError(m) { err.textContent = m; err.hidden = !m; }
form.addEventListener("submit", async e => {
  e.preventDefault();
  showError("");
  const f = form.elements;
  if (f.website.value) return;
  const name = f.name.value.trim().slice(0, LIMITS.name);
  const relation = ((form.querySelector("input[name=relation]:checked") || {}).value || "").slice(0, LIMITS.relation);
  const message = f.message.value.trim().slice(0, LIMITS.message);
  if (name.length < 2) { showError("Please write your name."); f.name.focus(); return; }
  if (message.length < 3) { showError("Please write a few words for your tribute."); f.message.focus(); return; }
  const last = readLocal("lastTributeAt", "0");
  if (Date.now() - last < 20000) { showError("Thank you. Please wait a few seconds before posting another tribute."); return; }
  submit.disabled = true; submit.textContent = "Posting…";
  try {
    const store = await storeReady;
    const posted = await store.add({ name, relation, message });
    newestId = posted.id;
    if (posted.pending && posted.id) {
      writeLocal(MINE, [{ id: posted.id, name, relation, message, createdAt: Date.now() }, ...readLocal(MINE, "[]")]);
      store.refresh && store.refresh();
    }
    writeLocal("lastTributeAt", Date.now());
    form.reset(); $("#compose-chars").textContent = "0";
    closeCompose();
    M().toast && M().toast(store.mode === "local" ? "Thank you. Your tribute is saved on this device."
      : posted.pending ? "Thank you. Your tribute will appear once the family has read it." : "Thank you. Your tribute has been posted.");
    setTimeout(() => { const c = $(".tcard--online", grid); if (c) c.scrollIntoView({ behavior: "smooth", block: "center" }); }, 400);
  } catch (e2) {
    console.error(e2);
    showError(e2.userMessage || "Sorry, your tribute could not be posted. Please check your internet connection and try again.");
  } finally { submit.disabled = false; submit.textContent = "Post tribute"; }
});

/* ------------------------------------------------ candles: every light someone left */
const field = $("#candle-field"), cCount = $("#candle-count");
const LIT = `litCandle:${ID}`;
function plural(n) { return n === 1 ? "1 candle has been lit in his memory." : `${n} candles have been lit in his memory.`; }
function drawField(n) {
  const shown = Math.min(n, 240);
  // deterministic scatter: the same candle keeps its place every visit
  let seed = 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const frag = document.createDocumentFragment();
  for (let i = field.childElementCount; i < shown; i++) {
    for (let k = 0; k < i * 3; k++) rnd();
    const s = document.createElement("span");
    s.style.left = (4 + rnd() * 92).toFixed(2) + "%";
    s.style.top = (8 + rnd() * 84).toFixed(2) + "%";
    s.style.setProperty("--d", (rnd() * 4).toFixed(2) + "s");
    s.style.setProperty("--s", (0.6 + rnd() * 0.8).toFixed(2));
    seed = 7;
    frag.append(s);
  }
  field.append(frag);
}
function setCandles(n) {
  cCount.textContent = n ? plural(n) : "Be the first to light a candle in his memory.";
  drawField(n);
}
function markLit() {
  $$("[data-candle]").forEach(b => {
    b.setAttribute("aria-pressed", "true");
    const l = $(".candle-label", b);
    if (l) l.textContent = "You lit a candle"; else b.textContent = "You lit a candle";
  });
}
if (readLocal(LIT, "false")) markLit();
$$("[data-candle]").forEach(b => b.addEventListener("click", async () => {
  if (readLocal(LIT, "false")) { document.getElementById("appreciation").scrollIntoView({ behavior: "smooth" }); return; }
  writeLocal(LIT, true);
  markLit();
  document.documentElement.classList.add("candle-moment");
  setTimeout(() => document.documentElement.classList.remove("candle-moment"), 2600);
  try { const store = await storeReady; setCandles(await store.light()); } catch (e) { console.error(e); }
  M().toast && M().toast("Thank you for remembering Pa. Wesley.");
}));

storeReady.then(store => {
  if (store.mode === "sanity" && store.approval) {
    $("#compose-note").textContent = "The family reads each tribute before it appears for everyone. You will see yours straight away, marked as waiting.";
  } else if (store.mode === "local") {
    $("#compose-note").textContent = "Local preview: your tribute is kept in this browser only.";
  }
  store.subscribe(items => render(items), e => console.error(e));
  store.candles().then(setCandles).catch(() => setCandles(0));
});
