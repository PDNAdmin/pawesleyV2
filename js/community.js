/* Guest tributes and candles.
   Firestore when js/firebase-config.js is filled in (same data path as curo.events);
   otherwise this device's local storage, clearly labelled as such. */

const FB = "https://www.gstatic.com/firebasejs/10.12.2";
const ID = window.MEMORIAL_ID || "memorial";
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
    async add(t) { const item = { ...t, id: "local-" + Date.now().toString(36), createdAt: Date.now() }; writeLocal(KEY, [item, ...readLocal(KEY, "[]")]); emit(); return item.id; },
    async candles() { return readLocal(CANDLE, "0"); },
    async light() { const n = readLocal(CANDLE, "0") + 1; writeLocal(CANDLE, n); return n; }
  };
}

async function firebaseStore(cfg) {
  const [{ initializeApp }, fs] = await Promise.all([import(`${FB}/firebase-app.js`), import(`${FB}/firebase-firestore.js`)]);
  const db = fs.getFirestore(initializeApp(cfg));
  const tributes = fs.collection(db, "memorials", ID, "tributes");
  const candles = fs.collection(db, "memorials", ID, "candles");
  return {
    mode: "firebase",
    subscribe(cb, onError) {
      fs.onSnapshot(fs.query(tributes, fs.orderBy("createdAt", "desc"), fs.limit(500)), snap => {
        cb(snap.docs.map(d => { const x = d.data({ serverTimestamps: "estimate" }); return { id: d.id, ...x, createdAt: x.createdAt ? x.createdAt.toMillis() : Date.now() }; }));
      }, onError);
    },
    async add(t) { return (await fs.addDoc(tributes, { ...t, createdAt: fs.serverTimestamp() })).id; },
    async candles() { return (await fs.getCountFromServer(candles)).data().count; },
    async light() { await fs.addDoc(candles, { createdAt: fs.serverTimestamp() }); return (await fs.getCountFromServer(candles)).data().count; }
  };
}

const cfg = window.FIREBASE_CONFIG;
const storeReady = cfg && cfg.projectId
  ? firebaseStore(cfg).catch(err => { console.error("Firebase failed, using this device", err); return localStore(); })
  : Promise.resolve(localStore());

function fmtDate(ms) { try { return new Date(ms).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" }); } catch (e) { return ""; } }

/* ------------------------------------------------ guest tributes */
const list = $("#guest-list"), countEl = $("#guest-count"), modeEl = $("#guest-mode");
let guestItems = [], newestId = null;

function render(items, mode) {
  guestItems = items;
  countEl.textContent = items.length ? `(${items.length})` : "";
  list.replaceChildren();
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "guest__empty";
    empty.innerHTML = "<strong>Be the first to share a memory of him.</strong><p>Tap “Write a tribute” to add yours.</p>";
    list.append(empty);
    return;
  }
  items.forEach((t, k) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "gcard" + (t.id === newestId ? " is-new" : "");
    const meta = [t.relation, fmtDate(t.createdAt)].filter(Boolean).join(" · ");
    card.innerHTML = '<span class="gcard__text"></span><span class="gcard__sign"><span class="gcard__name"></span><span class="gcard__meta"></span></span>';
    $(".gcard__text", card).textContent = t.message;
    $(".gcard__name", card).textContent = t.name;
    $(".gcard__meta", card).textContent = meta + (mode === "local" ? " · saved on this device" : "");
    card.setAttribute("aria-label", "Read the tribute from " + t.name);
    card.addEventListener("click", () => M().openReader && M().openReader(guestItems.map(g => ({
      title: "", body: g.message.split(/\n{2,}/), author: g.name, relation: [g.relation, fmtDate(g.createdAt)].filter(Boolean).join(" · ")
    })), k, "Message"));
    list.append(card);
  });
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
    newestId = await store.add({ name, relation, message });
    writeLocal("lastTributeAt", Date.now());
    form.reset(); $("#compose-chars").textContent = "0";
    closeCompose();
    M().toast && M().toast(store.mode === "local" ? "Thank you. Your tribute is saved on this device." : "Thank you. Your tribute has been posted.");
    setTimeout(() => { const c = list.firstElementChild; if (c) c.scrollIntoView({ behavior: "smooth", block: "center" }); }, 300);
  } catch (e2) {
    console.error(e2);
    showError("Sorry, your tribute could not be posted. Please check your internet connection and try again.");
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
  if (store.mode === "local") {
    modeEl.hidden = false;
    modeEl.textContent = "Online tributes are not switched on yet, so messages written here are saved on this device only.";
    $("#compose-note").textContent = "Online tributes are not switched on yet: your tribute will be saved on this device only.";
  }
  store.subscribe(items => render(items, store.mode), e => {
    console.error(e);
    list.replaceChildren(Object.assign(document.createElement("p"), { className: "guest__empty", textContent: "Messages could not be loaded right now. Please refresh the page." }));
  });
  store.candles().then(setCandles).catch(() => setCandles(0));
});
