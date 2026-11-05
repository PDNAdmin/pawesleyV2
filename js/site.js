(function () {
  "use strict";

  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function splitTitle(t) {
    var i = t.indexOf(" — ");
    return i < 0 ? [t, ""] : [t.slice(0, i), t.slice(i + 3)];
  }
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  var ICON_PLAY = '<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  var ICON_PAUSE = '<svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor"/></svg>';
  var ICON_NOTE = '<svg class="order__note" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18.5a2.5 2.5 0 1 1-2-2.45V5l11-2v11.5a2.5 2.5 0 1 1-2-2.45V7.4l-7 1.27z" fill="currentColor"/></svg>';

  /* ------------------------------------------------ the showreel
     Plays by itself where the browser allows it. Where it does not (Low Power Mode, data saver,
     "reduce motion"), the still photograph shows and the round button starts the film. */
  var reel = $("#hero-reel"), reelBtn = $("#reel-toggle");
  (function () {
    var phone = matchMedia("(max-aspect-ratio: 4/5)").matches;
    if (phone) reel.poster = reel.dataset.posterMobile;
    reel.muted = true; reel.defaultMuted = true; reel.playsInline = true;
    var wanted = !reduce;   // reduce motion: wait for the visitor to ask
    function setBtn(playing) {
      reelBtn.setAttribute("aria-pressed", String(!playing));
      reelBtn.setAttribute("aria-label", playing ? "Pause the background film" : "Play the background film");
    }
    function load() { if (!reel.getAttribute("src")) { reel.src = phone ? reel.dataset.srcMobile : reel.dataset.src; reel.load(); } }
    function start() {
      load();
      var p = reel.play();
      if (p && p.then) p.then(function () { setBtn(true); }, function () { setBtn(false); });
      else setBtn(!reel.paused);
    }
    reel.addEventListener("playing", function () { setBtn(true); });
    reel.addEventListener("pause", function () { setBtn(false); });
    reelBtn.addEventListener("click", function () {
      if (reel.paused) { wanted = true; start(); } else { wanted = false; reel.pause(); }
    });
    if (wanted) {
      start();
      // a browser that refused autoplay usually allows it after the first touch or key press
      var nudge = function () { if (wanted && reel.paused) start(); };
      ["touchend", "click", "keydown"].forEach(function (t) { addEventListener(t, nudge, { once: true, passive: true }); });
    } else setBtn(false);
    // stop decoding once the opening has scrolled away, resume when it returns
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!wanted) return;
        if (e.isIntersecting) start(); else reel.pause();
      });
    }).observe($("#cover"));
  })();

  /* ------------------------------------------------ 01: officiants */
  $("#officiants").innerHTML = SERVICE_INFO.officiants.map(function (o) {
    return "<div><dt>" + (o.role || "Officiating") + "</dt><dd>" + o.name + "</dd></div>";
  }).join("");
  $("#needs-list").innerHTML = SERVICE_INFO.churchNeeds.map(function (n) { return "<li>" + n + "</li>"; }).join("");

  /* ------------------------------------------------ 02: the order, as printed, in both languages */
  var EN = ["Receiving of the Body", "Sentences", "Hymn", "Psalm 90", "Lessons 1 Thess. 4:13-18", "Intercessory Prayer", "Hymn",
            "Sermon", "Prayers", "Thanksgiving", "Notices", "Vote of Thanks", "Recessional Hymn",
            "Admonition", "Hymn", "Committal and Prayer", "Benediction and Grace"];
  var YO = ["Gbigb oku ni enu ona", "Awon Asayan oro Olorun", "Orin", "Iwe Orin Dafidi 90", "Eko Kika 1 Thess. 4:13-18", "Adura fun gbogbo eniyan", "Orin",
            "Iwasu", "Adura", "Idupe", "Ifilo", "Idupe lati owo ebi", "Orin Akojade",
            "Awon oro Iyanju", "Orin", "Gbigbe oku si iboji ati adura", "Adura ikehin ati ore-ofe"];
  var HYMN_ITEMS = { 3: 1, 7: 1, 13: 1, 15: 1 };
  EN.forEach(function (t, i) {
    var li = el("li"), a = el("a");
    a.href = "#step-" + (i + 1);
    a.innerHTML = '<span class="order__num">' + (i + 1) + '</span><span class="order__en">' + t + '</span><span class="order__yo" lang="yo">' + YO[i] + "</span>" + (HYMN_ITEMS[i + 1] ? ICON_NOTE : "");
    if (HYMN_ITEMS[i + 1]) a.setAttribute("aria-label", (i + 1) + ". " + t + ", with instrumental");
    li.appendChild(a);
    $(i < 13 ? "#order-church" : "#order-grave").appendChild(li);
  });

  /* ------------------------------------------------ 03 to 16: the service */
  function body(items) {
    var f = document.createDocumentFragment();
    items.forEach(function (it) {
      if (it.type === "p") f.appendChild(el("p", "", it.text));
      else if (it.type === "liturgy") {
        var p = el("p", "liturgy-line");
        p.appendChild(el("span", "speaker", it.speaker));
        p.appendChild(document.createTextNode(it.text));
        f.appendChild(p);
      } else if (it.type === "verse") {
        var v = el("p", "verse", it.text);
        v.appendChild(el("cite", "", it.ref));
        f.appendChild(v);
      } else if (it.type === "hymn-title") f.appendChild(el("p", "hymn-title", it.text));
      else if (it.type === "hymn") {
        var ol = el("ol", "verses");
        it.verses.forEach(function (t) { ol.appendChild(el("li", "", t)); });
        f.appendChild(ol);
      }
    });
    return f;
  }
  function head(step) {
    var h = el("h3", "ihead");
    h.appendChild(el("span", "ihead__num", String(step.num)));
    var t = el("span", "ihead__title");
    var parts = splitTitle(step.title);
    if (parts[1] && /^Hymn|^Lessons|^Recessional/.test(parts[0])) {
      var rec = parts[0].indexOf("Recessional") === 0;
      t.appendChild(el("em", "", rec ? "Hymn" : parts[0]));
      t.appendChild(document.createTextNode(rec ? "261, Recessional" : parts[1]));
    } else t.textContent = parts.join(" ").trim();
    h.appendChild(t);
    var yo = el("span", "ihead__yo", step.sub);
    yo.setAttribute("lang", "yo");
    h.appendChild(yo);
    return h;
  }
  var TRACKS_FOR = {};
  Object.keys(AUDIO).forEach(function (k) { var n = AUDIO[k].item; if (n) (TRACKS_FOR[n] = TRACKS_FOR[n] || []).push(k); });

  var root = $("#service-items");
  var steps = ORDER_OF_SERVICE;
  var isStatic = function (s) { return !s.body.length && !(s.yoruba && s.yoruba.length); };
  for (var i = 0; i < steps.length; i++) {
    var s = steps[i];
    if (isStatic(s)) {
      var run = [s];
      while (steps[i + 1] && isStatic(steps[i + 1])) run.push(steps[++i]);
      var blk = el("article", "item item--run");
      var ol = el("ol");
      run.forEach(function (r) {
        var li = el("li");
        li.id = "step-" + r.num;
        li.appendChild(el("span", "ihead__num", String(r.num)));
        li.appendChild(el("span", "ihead__title", r.title));
        var y = el("span", "ihead__yo", r.sub); y.setAttribute("lang", "yo");
        li.appendChild(y);
        ol.appendChild(li);
      });
      blk.appendChild(ol);
      root.appendChild(blk);
      continue;
    }
    var art = el("article", "item");
    art.id = "step-" + s.num;
    art.appendChild(head(s));
    (TRACKS_FOR[s.num] || []).forEach(function (k) {
      var holder = el("div", "track"); holder.dataset.track = k; art.appendChild(holder);
    });
    if (s.num === 16) {
      var fig = el("figure", "item__photo");
      fig.innerHTML = '<img src="assets/print/prayer.webp" width="1600" height="792" loading="lazy" alt="Worshippers in prayer beside an open Bible">';
      art.appendChild(fig);
    }
    var c = el("div", "item__cols");
    var enCol = el("div", "item__col item__col--en"); enCol.setAttribute("lang", "en");
    enCol.appendChild(el("p", "item__col-label", "English"));
    enCol.appendChild(body(s.body));
    var yoCol = el("div", "item__col item__col--yo"); yoCol.setAttribute("lang", "yo");
    yoCol.appendChild(el("p", "item__col-label", "Yorùbá"));
    var hasHymn = s.body.some(function (b) { return b.type === "hymn"; });
    var lines = (s.yoruba || []).slice(1);
    if (hasHymn && lines.length) {
      var vl = el("ol", "verses");
      lines.forEach(function (t) { vl.appendChild(el("li", "", t)); });
      yoCol.appendChild(vl);
      if (s.num === 15) yoCol.appendChild(el("p", "hymn-title", "Ninu Kristi"));
    } else lines.forEach(function (t) { yoCol.appendChild(el("p", "", t)); });
    if (s.num === 15) {
      var note = $$(".hymn-title", enCol).pop();
      if (note && note.nextElementSibling) note.nextElementSibling.classList.add("copyright-note");
    }
    c.appendChild(enCol); c.appendChild(yoCol);
    art.appendChild(c);
    root.appendChild(art);
  }

  /* language: both side by side on wide screens, English first on phones */
  var langBtns = $$(".lang button"), keep = null;
  function setLang(l) {
    document.body.classList.remove("lang-en", "lang-yo", "lang-both");
    document.body.classList.add("lang-" + l);
    langBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === l)); });
    if (keep) keep.scrollIntoView({ block: "start", behavior: "instant" });
    try { localStorage.setItem("programme-lang", l); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem("programme-lang"); } catch (e) {}
  setLang(saved || (innerWidth > 860 ? "both" : "en"));
  langBtns.forEach(function (b) { b.addEventListener("click", function () {
    var line = innerHeight * 0.3;
    keep = $$("#service-items .item").filter(function (it) { return it.getBoundingClientRect().top <= line; }).pop() || null;
    setLang(b.dataset.lang); keep = null;
  }); });

  /* ------------------------------------------------ hymn instrumentals */
  var player = $("#player"), audio = $("#player-audio"), pToggle = $("#player-toggle"), pTitle = $("#player-title");
  var pSeek = $("#player-seek"), pNow = $("#player-now"), pDur = $("#player-dur");
  var current = null, trackBtns = {}, available = {};
  function fmt(t) { t = Math.max(0, Math.floor(t || 0)); return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0"); }
  function syncButtons() {
    Object.keys(trackBtns).forEach(function (k) {
      trackBtns[k].forEach(function (b) {
        if (!available[k]) return;
        var on = k === current && !audio.paused;
        b.setAttribute("aria-pressed", String(on));
        b.querySelector(".track__label").textContent = on ? "Pause the instrumental" : "Play the instrumental";
      });
    });
    player.classList.toggle("is-paused", audio.paused);
    pToggle.setAttribute("aria-label", audio.paused ? "Play" : "Pause");
  }
  function playTrack(k) {
    if (current === k) { if (audio.paused) audio.play(); else audio.pause(); return; }
    current = k;
    audio.src = AUDIO[k].file;
    pTitle.textContent = AUDIO[k].title;
    pTitle.href = AUDIO[k].item ? "#step-" + AUDIO[k].item : "#photos";
    pNow.textContent = "0:00"; pDur.textContent = "0:00"; pSeek.value = "0";
    player.hidden = false;
    audio.play().catch(function () {});
    if ("mediaSession" in navigator && window.MediaMetadata) {
      navigator.mediaSession.metadata = new MediaMetadata({ title: AUDIO[k].title, artist: "Forever In Our Heart", album: "Pa. Wesley Olajide Ojo Aiyegboka" });
    }
  }
  audio.addEventListener("play", syncButtons);
  audio.addEventListener("pause", syncButtons);
  audio.addEventListener("ended", syncButtons);
  audio.addEventListener("loadedmetadata", function () { pDur.textContent = fmt(audio.duration); });
  audio.addEventListener("timeupdate", function () {
    pNow.textContent = fmt(audio.currentTime);
    if (audio.duration) pSeek.value = String(Math.round(audio.currentTime / audio.duration * 1000));
  });
  pSeek.addEventListener("input", function () { if (audio.duration) audio.currentTime = pSeek.value / 1000 * audio.duration; });
  pToggle.addEventListener("click", function () { if (audio.paused) audio.play(); else audio.pause(); });
  $("#player-close").addEventListener("click", function () { audio.pause(); audio.removeAttribute("src"); audio.load(); current = null; player.hidden = true; syncButtons(); });

  $$("[data-track]").forEach(function (holder) {
    var k = holder.dataset.track, t = AUDIO[k];
    var b = el("button", "track__btn"); b.type = "button"; b.disabled = true;
    b.innerHTML = '<span class="track__icon">' + ICON_PLAY + ICON_PAUSE + '</span><span><span class="track__label">Instrumental coming soon</span><span class="track__sub">' + t.title + '</span></span><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span>';
    holder.appendChild(b);
    (trackBtns[k] = trackBtns[k] || []).push(b);
    b.addEventListener("click", function () { playTrack(k); });
  });
  // a file the family has not uploaded yet stays "coming soon"
  Object.keys(AUDIO).forEach(function (k) {
    fetch(AUDIO[k].file, { method: "HEAD" }).then(function (r) {
      if (!r.ok) return;
      available[k] = true;
      (trackBtns[k] || []).forEach(function (b) { b.disabled = false; b.setAttribute("aria-pressed", "false"); b.querySelector(".track__label").textContent = "Play the instrumental"; });
    }).catch(function () {});
  });

  /* ------------------------------------------------ 17 to 18: the darkroom */
  var ERAS = [
    { src: "assets/print/bio-portrait.webp", cut: true, alt: "Pa. Wesley Olajide Ojo Aiyegboka" },
    { src: "assets/photos/full/img-01.jpg", alt: "A young Wesley Olajide Ojo Aiyegboka in a suit" },
    { src: "assets/photos/full/img-09.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka seated beside a woman in glasses" },
    { src: "assets/photos/full/img-13.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka seated in purple traditional attire" },
    { src: "assets/photos/full/img-30.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka with two young people" },
    { src: "assets/photos/full/img-02.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka standing in patterned traditional attire" },
    { src: "assets/photos/full/img-05.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka walking in white agbada" },
    { src: "assets/photos/full/img-22.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka beside a woman, both in yellow" },
    { src: "assets/photos/full/img-08.jpg", alt: "Portrait of Pa. Wesley Olajide Ojo Aiyegboka smiling" }
  ];
  var tray = $("#dr-tray"), yearEl = $("#dr-year");
  var paras = $$("#dr-text p");
  function makePrint(era, k) {
    var f = el("figure", "print " + (era.cut ? "print--cutout" : "print--photo"));
    f.style.setProperty("--tilt", (k % 2 ? 1 : -1.2) + "deg");
    f.style.zIndex = String(k + 1);
    f.innerHTML = '<img src="' + era.src + '" alt="' + era.alt + '" loading="' + (k < 2 ? "eager" : "lazy") + '" decoding="async">';
    return f;
  }
  var trayPrints = ERAS.map(function (e, k) { var f = makePrint(e, k); tray.appendChild(f); return f; });
  var firstOfEra = [];
  paras.forEach(function (p) { var e = +p.dataset.era; if (firstOfEra[e] == null) firstOfEra[e] = p; });
  var inlinePrints = firstOfEra.map(function (p, e) {
    var holder = el("div", "darkroom__inline");
    holder.setAttribute("aria-hidden", "true");
    var f = makePrint(ERAS[e], e);
    holder.appendChild(f);
    p.parentNode.insertBefore(holder, p);
    return f;
  });
  var lastYear = null, devs = [];
  function darkroom() {
    var vh = innerHeight, line = vh * 0.42, wide = innerWidth > 860;
    firstOfEra.forEach(function (p, e) {
      var top = p.getBoundingClientRect().top;
      var d = e === 0 ? 1 : clamp01((vh * 0.78 - top) / (vh * 0.46));
      if (reduce) d = d > 0.05 ? 1 : 0;
      trayPrints[e].style.setProperty("--dev", d.toFixed(3));
      devs[e] = d;
      var ib = inlinePrints[e].parentNode.getBoundingClientRect().top;
      var di = clamp01((vh * 0.98 - ib) / (vh * 0.55));
      if (reduce) di = di > 0.05 ? 1 : 0;
      inlinePrints[e].style.setProperty("--dev", di.toFixed(3));
    });
    // the outgoing print dissolves exactly as the next one arrives, never two half-prints stacked
    trayPrints.forEach(function (f, e) { f.style.setProperty("--gone", clamp01((devs[e + 1] || 0) * 4).toFixed(3)); });
    var year = 1943;
    paras.forEach(function (p) {
      var r = p.getBoundingClientRect();
      if (wide) p.classList.toggle("is-reading", (r.top < line && r.bottom > line - 1) || (r.top < line && p === paras[paras.length - 1]));
      if (r.top < line && p.dataset.years) {
        var ys = p.dataset.years.split(" ").map(Number);
        // step through only the years this paragraph states, in reading order
        var t = reduce ? 1 : clamp01((line - r.top) / Math.max(r.height, 1));
        year = ys[Math.min(ys.length - 1, Math.floor(t * ys.length))];
      }
    });
    if (year !== lastYear) { yearEl.textContent = String(year); lastYear = year; }
  }

  /* ------------------------------------------------ toast */
  var toastEl = $("#toast"), toastT = null;
  function toast(msg) {
    toastEl.textContent = msg; toastEl.hidden = false;
    requestAnimationFrame(function () { toastEl.classList.add("is-on"); });
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("is-on"); setTimeout(function () { toastEl.hidden = true; }, 300); }, 3600);
  }

  /* ------------------------------------------------ the reader: one tribute at a time, large */
  var reader = $("#reader"), rTitle = $("#reader-title"), rText = $("#reader-text"), rSign = $("#reader-sign");
  var rCount = $("#reader-count"), rBody = $("#reader-body"), rPrev = $("#reader-prev"), rNext = $("#reader-next");
  var rList = [], rIndex = 0, rNoun = "Tribute", rReturn = null, rHash = false;
  function rShow(k, dir) {
    rIndex = (k + rList.length) % rList.length;
    var t = rList[rIndex];
    rTitle.textContent = t.title || ""; rTitle.hidden = !t.title;
    rText.replaceChildren.apply(rText, t.body.map(function (para) { return el("p", "", para); }));
    rSign.replaceChildren();
    rSign.appendChild(el("span", "tribute__name", t.author));
    if (t.relation) rSign.appendChild(el("span", "tribute__rel", t.relation));
    rCount.textContent = rNoun + " " + (rIndex + 1) + " of " + rList.length;
    rPrev.disabled = rList.length < 2; rNext.disabled = rList.length < 2;
    rBody.scrollTop = 0;
    if (!reduce && dir) { rBody.classList.remove("turn-l", "turn-r"); void rBody.offsetWidth; rBody.classList.add(dir < 0 ? "turn-l" : "turn-r"); }
    if (rHash) history.replaceState(null, "", "#tribute-" + (rIndex + 1));
  }
  function openReader(items, k, noun) {
    rList = items; rNoun = noun || "Tribute"; rHash = !noun;
    rReturn = document.activeElement;
    rShow(k, 0);
    reader.showModal();
    rBody.focus({ preventScroll: true });
  }
  function closeReader() { reader.close(); }
  reader.addEventListener("close", function () {
    if (rHash) history.replaceState(null, "", location.pathname + location.search);
    if (rReturn) rReturn.focus();
  });
  $$("[data-close]", reader).forEach(function (b) { b.addEventListener("click", closeReader); });
  reader.addEventListener("click", function (e) { if (e.target === reader) closeReader(); });
  rPrev.addEventListener("click", function () { rShow(rIndex - 1, -1); });
  rNext.addEventListener("click", function () { rShow(rIndex + 1, 1); });
  reader.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); rShow(rIndex + 1, 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); rShow(rIndex - 1, -1); }
  });
  var rx = null, ry = null;
  reader.addEventListener("touchstart", function (e) { rx = e.changedTouches[0].clientX; ry = e.changedTouches[0].clientY; }, { passive: true });
  reader.addEventListener("touchend", function (e) {
    if (rx == null) return;
    var dx = e.changedTouches[0].clientX - rx, dy = e.changedTouches[0].clientY - ry;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) rShow(rIndex + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    rx = null;
  }, { passive: true });

  /* ------------------------------------------------ 19 to 36: tributes as cards, in the programme's order */
  var tlist = $("#tribute-list");
  var cards = TRIBUTES.map(function (t, k) {
    var c = el("button", "tcard"); c.type = "button"; c.id = "tribute-" + (k + 1);
    c.style.setProperty("--i", String(k % 6));
    c.appendChild(el("span", "tcard__num", String(k + 1)));
    if (t.title) c.appendChild(el("span", "tcard__title", t.title));
    c.appendChild(el("span", "tcard__text", t.body.join(" ")));
    var sign = el("span", "tcard__sign");
    sign.appendChild(el("span", "tribute__name", t.author));
    if (t.relation) sign.appendChild(el("span", "tribute__rel", t.relation));
    c.appendChild(sign);
    c.appendChild(el("span", "tcard__more", "Read the tribute"));
    c.setAttribute("aria-label", "Tribute " + (k + 1) + " of " + TRIBUTES.length + ", from " + t.author + ". Read in full");
    c.addEventListener("click", function () { openReader(TRIBUTES, k); });
    tlist.appendChild(c);
    return c;
  });
  var search = $("#tribute-search"), none = $("#tribute-none");
  search.addEventListener("input", function () {
    var q = search.value.trim().toLowerCase(), shown = 0;
    cards.forEach(function (c, k) {
      var t = TRIBUTES[k], hit = !q || (t.author + " " + (t.relation || "") + " " + (t.title || "")).toLowerCase().indexOf(q) >= 0;
      c.hidden = !hit; if (hit) shown++;
    });
    none.hidden = shown > 0;
  });
  // a shared link to one tribute opens it
  var m = /^#tribute-(\d+)$/.exec(location.hash);
  if (m && TRIBUTES[+m[1] - 1]) setTimeout(function () { cards[+m[1] - 1].scrollIntoView({ block: "center" }); openReader(TRIBUTES, +m[1] - 1); }, 400);

  window.Memorial = { openReader: openReader, toast: toast };

  /* ------------------------------------------------ 41 to 44: photo speak */
  var PORTRAIT = { 1: 1, 2: 1, 4: 1, 5: 1, 10: 1, 11: 1, 15: 1, 16: 1, 18: 1, 29: 1 };
  var rail = $("#photo-rail"), queue = GALLERY.slice();
  function tile(ph) {
    var b = el("button", "ph"); b.type = "button";
    b.dataset.index = String(ph.id - 1);
    b.setAttribute("aria-label", "Open photograph " + ph.id + " of " + GALLERY.length);
    b.innerHTML = '<img src="' + ph.thumb + '" alt="' + ph.alt + '" loading="' + (ph.id <= 8 ? "eager" : "lazy") + '" decoding="async">';
    return b;
  }
  while (queue.length) {
    var ph = queue.shift(), col;
    if (PORTRAIT[ph.id] || !queue.length || PORTRAIT[queue[0].id]) { col = el("div", "pcol pcol--tall"); col.appendChild(tile(ph)); }
    else { col = el("div", "pcol pcol--pair"); col.appendChild(tile(ph)); col.appendChild(tile(queue.shift())); }
    rail.appendChild(col);
  }
  rail.appendChild(el("p", "photos__end", "Forever in our Heart."));
  var photosAct = $("#photos");
  rail.addEventListener("focusin", function (e) {
    var t = e.target.closest(".ph"); if (!t || reduce) return;
    var travel = rail.scrollWidth - innerWidth; if (travel <= 0) return;
    var p = clamp01((t.offsetLeft + t.offsetWidth / 2 - innerWidth / 2) / travel);
    scrollTo({ top: photosAct.getBoundingClientRect().top + scrollY + p * (photosAct.offsetHeight - innerHeight), behavior: "instant" });
  });

  /* lightbox: arrows, keyboard and swipe */
  var lb = $("#lightbox"), lbImg = $("#lightbox-img"), lbCap = $("#lightbox-cap"), lbIndex = 0, lbReturn = null;
  function showPhoto(k) {
    lbIndex = (k + GALLERY.length) % GALLERY.length;
    lbImg.src = GALLERY[lbIndex].full; lbImg.alt = GALLERY[lbIndex].alt;
    lbCap.textContent = "Photograph " + (lbIndex + 1) + " of " + GALLERY.length;
  }
  function openLb(k) { lbReturn = document.activeElement; showPhoto(k); lb.hidden = false; document.body.style.overflow = "hidden"; $(".lightbox__close").focus(); }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; if (lbReturn) lbReturn.focus(); }
  rail.addEventListener("click", function (e) { var b = e.target.closest(".ph"); if (b) openLb(+b.dataset.index); });
  $(".lightbox__close").addEventListener("click", closeLb);
  $(".lightbox__next").addEventListener("click", function () { showPhoto(lbIndex + 1); });
  $(".lightbox__prev").addEventListener("click", function () { showPhoto(lbIndex - 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowRight") showPhoto(lbIndex + 1);
    else if (e.key === "ArrowLeft") showPhoto(lbIndex - 1);
    else if (e.key === "Tab") {
      var f = $$(".lightbox__btn", lb), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  var tx = null;
  lb.addEventListener("touchstart", function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    if (tx == null) return;
    var dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
    tx = null;
  }, { passive: true });

  /* ------------------------------------------------ the film: the right shape for the screen, one clear play button */
  var video = $("#film-video"), filmFrame = $("#film-frame"), filmPlay = $("#film-play");
  var tall = matchMedia("(max-aspect-ratio: 4/5)").matches;
  if (tall) { filmFrame.classList.add("is-tall"); video.poster = video.dataset.posterMobile; }
  function startFilm() {
    if (!video.src) video.src = tall ? video.dataset.srcMobile : video.dataset.src;
    video.controls = true;
    filmFrame.classList.add("is-playing");
    var p = video.play(); if (p && p.catch) p.catch(function () {});
  }
  filmPlay.addEventListener("click", startFilm);
  $("[data-open-film]").addEventListener("click", function () {
    $("#film").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    setTimeout(startFilm, reduce ? 50 : 800);
  });
  video.addEventListener("play", function () { if (!audio.paused) audio.pause(); });
  video.addEventListener("ended", function () { filmFrame.classList.remove("is-playing"); video.controls = false; });

  /* ------------------------------------------------ section tabs follow the reading line */
  var tabLinks = $$("#tab-list a"), tabList = $("#tab-list");
  var chapters = $$("[data-tab]"), service = $("#service"), lastTab = -1, progressEl = $("#tabs-progress");
  function tabs() {
    tabList.classList.toggle("is-overflowing", tabList.scrollWidth > tabList.clientWidth + 2);
    var line = innerHeight * 0.3, cur = -1;
    chapters.forEach(function (c) { if (c.getBoundingClientRect().top <= line) cur = +c.dataset.tab; });
    if (cur !== lastTab) {
      tabLinks.forEach(function (a, k) { if (k === cur) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
      if (cur >= 0) {
        var a = tabLinks[cur];
        tabList.scrollTo({ left: a.offsetLeft - tabList.clientWidth / 2 + a.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
      }
      lastTab = cur;
    }
    var r = service.getBoundingClientRect();
    document.body.classList.toggle("in-service", r.top < innerHeight * 0.1 && r.bottom > innerHeight * 0.4);
    // how far through the current chapter you are, as a hairline under the tabs
    var ch = cur >= 0 ? chapters.filter(function (c) { return +c.dataset.tab === cur; }) : [];
    var pr = 0;
    if (ch.length) {
      var top = ch[0].getBoundingClientRect().top, bottom = ch[ch.length - 1].getBoundingClientRect().bottom;
      pr = clamp01((innerHeight * 0.3 - top) / Math.max(1, bottom - top - innerHeight * 0.4));
    }
    progressEl.style.transform = "scaleX(" + pr.toFixed(4) + ")";
  }

  /* ------------------------------------------------ one loop for the page's own moves */
  var ticking = false;
  function frame() { ticking = false; darkroom(); tabs(); }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);

  /* ------------------------------------------------ larger text, remembered */
  var sizeBtn = $("#text-size");
  function setSize(on) {
    document.documentElement.classList.toggle("text-lg", on);
    sizeBtn.setAttribute("aria-pressed", String(on));
    sizeBtn.setAttribute("aria-label", on ? "Normal text size" : "Larger text");
    try { localStorage.setItem("programme-text-lg", on ? "1" : "0"); } catch (e) {}
    onScroll();
  }
  try { if (localStorage.getItem("programme-text-lg") === "1") setSize(true); } catch (e) {}
  sizeBtn.addEventListener("click", function () { setSize(!document.documentElement.classList.contains("text-lg")); });

  /* ------------------------------------------------ arrivals: each block rises into place once, as it reaches you */
  if (!reduce && "IntersectionObserver" in window) {
    var arrive = $$(".chapter__title, .thead__lede, .thead__actions, .tsearch, .fs__main > *, .fs__side, .officiants div, .order__head, .order__list li, .needs, .ihead, .item .track, .item__photo, .item--run li, .verses > li, .item__col > p, .tcard, .guest__head, .film__frame, .film__lede, .thanks__text p, .thanks__candles, .darkroom__inline");
    arrive.forEach(function (n) { n.classList.add("arrive"); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var n = e.target, sib = n.parentElement ? Array.prototype.indexOf.call(n.parentElement.children, n) : 0;
        n.style.setProperty("--ad", Math.min(sib % 6, 5) * 55 + "ms");
        n.classList.add("is-in");
        io.unobserve(n);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.01 });
    arrive.forEach(function (n) { io.observe(n); });
    document.documentElement.classList.add("arrivals");
  }

  ScrollCraft.mount(document.body);
  requestAnimationFrame(frame);
  addEventListener("load", onScroll);
})();
