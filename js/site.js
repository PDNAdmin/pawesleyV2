(function () {
  "use strict";
  window.__programme = true;   // tells the opening screen's safety net that the scripts arrived

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

  /* ------------------------------------------------ the hymns that play by themselves
     "Sleep on, Beloved" loops on the page; "In Christ Alone" plays with the film. When the film pauses or ends,
     the page hymn comes back if it was on. Browsers only allow sound after a tap, so the opening asks once,
     and the switch at the top turns whichever is playing on or off. */
  function loopAudio(file, vol) { var a = new Audio(file); a.loop = true; a.preload = "metadata"; a.volume = vol; return a; }
  var ambient = loopAudio(AUDIO["sleep-on-beloved"].file, 0.55), filmHymn = loopAudio(AUDIO["in-christ-alone"].file, 0.6);
  var soundBtn = $("#sound-toggle"), soundWanted = false, filmOn = false, filmMuted = false;
  function meta(title) { if ("mediaSession" in navigator && window.MediaMetadata) navigator.mediaSession.metadata = new MediaMetadata({ title: title, artist: "Forever In Our Heart", album: "Pa. Wesley Olajide Ojo Aiyegboka" }); }
  function tryPlay(a) { var p = a.play(); if (p && p.catch) p.catch(syncSound); }
  function syncSound() {
    var on = !ambient.paused || !filmHymn.paused;
    soundBtn.setAttribute("aria-pressed", String(on));
    soundBtn.setAttribute("aria-label", on ? "Turn the hymn off" : "Play the hymn");
    $(".tabs__sound-label", soundBtn).textContent = on ? "Sound on" : "Sound off";
  }
  function soundOn() {
    soundWanted = true;
    if (!audio.paused) audio.pause();
    if (filmOn) return;                      // the film's hymn has the floor; the page hymn waits for it
    tryPlay(ambient); meta("Sleep on, Beloved");
  }
  function soundOff() { soundWanted = false; ambient.pause(); }
  function filmHymnOn() { filmMuted = false; ambient.pause(); tryPlay(filmHymn); meta("In Christ Alone"); }
  [ambient, filmHymn].forEach(function (a) { a.addEventListener("play", syncSound); a.addEventListener("pause", syncSound); });
  soundBtn.addEventListener("click", function () {
    var on = !ambient.paused || !filmHymn.paused;
    if (on) { soundOff(); if (filmOn) filmMuted = true; filmHymn.pause(); }
    else if (filmOn) filmHymnOn();
    else soundOn();
  });
  // a hymn from the service player takes over from both
  audio.addEventListener("play", function () { if (!ambient.paused) soundOff(); if (!filmHymn.paused) { filmMuted = true; filmHymn.pause(); } });
  syncSound();

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
    { src: "assets/photos/full/img-01.webp", alt: "A young Wesley Olajide Ojo Aiyegboka in a suit" },
    { src: "assets/photos/full/img-09.webp", alt: "Pa. Wesley Olajide Ojo Aiyegboka seated beside a woman in glasses" },
    { src: "assets/photos/full/img-13.webp", alt: "Pa. Wesley Olajide Ojo Aiyegboka seated in purple traditional attire" },
    { src: "assets/photos/full/img-30.webp", alt: "Pa. Wesley Olajide Ojo Aiyegboka with two young people" },
    { src: "assets/photos/full/img-02.webp", alt: "Pa. Wesley Olajide Ojo Aiyegboka standing in patterned traditional attire" },
    { src: "assets/photos/full/img-05.webp", alt: "Pa. Wesley Olajide Ojo Aiyegboka walking in white agbada" },
    { src: "assets/photos/full/img-22.webp", alt: "Pa. Wesley Olajide Ojo Aiyegboka beside a woman, both in yellow" }
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

  /* ------------------------------------------------ 19 to 36: tributes as cards, in the programme's order
     Every card has the same parts: who wrote it, a heading, the opening lines, and the way in. */
  var tlist = $("#tribute-list");
  function initials(name) {
    var w = String(name).replace(/^(Mr|Mrs|Ms|Dr|Chief|Hon|Revd|Rev|Ven|Pastor|Canon|Elder|Pa)\.?\s+/gi, "").split(/[\s&,/-]+/).filter(Boolean);
    return ((w[0] || "?")[0] + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase();
  }
  // opts: { label, onOpen, extraClass, note }
  function buildCard(t, opts) {
    var c = el("button", "tcard" + (opts.extraClass ? " " + opts.extraClass : "")); c.type = "button";
    var head = el("span", "tcard__head");
    head.appendChild(el("span", "tcard__avatar", initials(t.author)));
    var who = el("span", "tcard__who");
    who.appendChild(el("span", "tribute__name", t.author));
    if (t.relation) who.appendChild(el("span", "tribute__rel", t.relation));
    head.appendChild(who);
    head.appendChild(el("span", "tcard__label", opts.label));
    c.appendChild(head);
    c.appendChild(el("span", "tcard__title", t.title || ("A tribute from " + t.author)));
    c.appendChild(el("span", "tcard__text", t.body.join(" ")));
    var foot = el("span", "tcard__foot");
    if (opts.note) foot.appendChild(el("span", "tcard__note", opts.note));
    foot.appendChild(el("span", "tcard__more", "Read the tribute"));
    c.appendChild(foot);
    c.dataset.search = (t.author + " " + (t.relation || "") + " " + (t.title || "")).toLowerCase();
    c.setAttribute("aria-label", (t.title || "A tribute from " + t.author) + ", from " + t.author + ". Read in full");
    c.addEventListener("click", opts.onOpen);
    return c;
  }
  var cards = TRIBUTES.map(function (t, k) {
    var c = buildCard(t, { label: "No. " + (k + 1), onOpen: function () { openReader(TRIBUTES, k); } });
    c.id = "tribute-" + (k + 1);
    tlist.appendChild(c);
    return c;
  });
  var search = $("#tribute-search"), none = $("#tribute-none");
  function filterCards() {
    var q = search.value.trim().toLowerCase(), shown = 0;
    $$(".tcard", tlist).forEach(function (c) { var hit = !q || c.dataset.search.indexOf(q) >= 0; c.hidden = !hit; if (hit) shown++; });
    $$(".tdivider", tlist).forEach(function (d) { d.hidden = !!q; });
    none.hidden = shown > 0;
  }
  search.addEventListener("input", filterCards);
  // a shared link to one tribute opens it
  var m = /^#tribute-(\d+)$/.exec(location.hash);
  if (m && TRIBUTES[+m[1] - 1]) setTimeout(function () { cards[+m[1] - 1].scrollIntoView({ block: "center" }); openReader(TRIBUTES, +m[1] - 1); }, 400);

  window.Memorial = { openReader: openReader, toast: toast, buildCard: buildCard, filterCards: filterCards };

  /* ------------------------------------------------ 41 to 44: photo speak, two slow rows drifting in opposite directions
     Calm by default, a little livelier when you scroll past, still under your hand, and draggable. */
  var PORTRAIT = { 1: 1, 2: 1, 4: 1, 5: 1, 10: 1, 11: 1, 15: 1, 16: 1, 18: 1, 29: 1 };
  var marquee = $("#photo-marquee"), rows = $$(".marquee__row", marquee), pauseBtn = $("#photos-pause");
  var half = Math.ceil(GALLERY.length / 2);
  function tile(ph, copy) {
    var b = el("button", "ph" + (PORTRAIT[ph.id] ? " ph--tall" : "")); b.type = "button";
    b.dataset.index = String(GALLERY.indexOf(ph));
    if (copy) { b.tabIndex = -1; b.setAttribute("aria-hidden", "true"); }
    else b.setAttribute("aria-label", "Open photograph " + (GALLERY.indexOf(ph) + 1) + " of " + GALLERY.length);
    b.innerHTML = '<img src="' + ph.thumb + '" alt="' + (copy ? "" : ph.alt) + '" loading="lazy" decoding="async" draggable="false">';
    return b;
  }
  var lanes = rows.map(function (row, r) {
    var track = $(".marquee__track", row), set = GALLERY.slice(r ? half : 0, r ? GALLERY.length : half);
    set.forEach(function (ph) { track.appendChild(tile(ph, false)); });
    if (!reduce) set.forEach(function (ph) { track.appendChild(tile(ph, true)); });
    return { row: row, track: track, dir: +row.dataset.dir, x: 0, v: 0, hold: false, drag: null, width: 0, suppress: false };
  });
  function measure() { lanes.forEach(function (L) { L.width = L.track.scrollWidth / 2; }); }
  if (!reduce) {
    measure(); addEventListener("resize", measure);
    $$("img", marquee).forEach(function (i) { i.addEventListener("load", measure, { once: true }); });
    var BASE = innerWidth < 700 ? 18 : 26;          // pixels a second: slow enough to take in each face
    var paused = false, onScreen = false, last = 0, boost = 0, lastY = scrollY, raf = 0;
    addEventListener("scroll", function () { boost = Math.min(boost + Math.abs(scrollY - lastY) * 0.9, 260); lastY = scrollY; }, { passive: true });
    function wrap(L) { if (!L.width) return; while (L.x <= -L.width) L.x += L.width; while (L.x > 0) L.x -= L.width; }
    function frame(t) {
      var dt = Math.min((t - (last || t)) / 1000, 0.05); last = t;
      boost *= Math.pow(0.04, dt);                  // a scroll gives the rows a gentle push that fades in about a second
      lanes.forEach(function (L) {
        if (L.drag && L.drag.moved) return;
        var target = (paused || L.hold) ? 0 : (BASE + boost) * L.dir;
        L.v += (target - L.v) * Math.min(1, dt * 3);  // ease in and out of every stop
        L.x += L.v * dt; wrap(L);
        L.track.style.transform = "translate3d(" + L.x.toFixed(2) + "px,0,0)";
      });
      raf = onScreen ? requestAnimationFrame(frame) : 0;
    }
    new IntersectionObserver(function (es) {
      onScreen = es[0].isIntersecting; last = 0;
      if (onScreen && !raf) raf = requestAnimationFrame(frame);
    }).observe(marquee);
    lanes.forEach(function (L) {
      var row = L.row;
      // a resting mouse pauses its row; touch screens send fake mouse events after a tap, so those are ignored
      row.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") L.hold = true; });
      row.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") L.hold = false; });
      row.addEventListener("focusin", function (e) {
        L.hold = true;
        var t = e.target.closest(".ph"); if (!t) return;
        L.x = Math.max(-L.width, Math.min(0, row.clientWidth / 2 - t.offsetLeft - t.offsetWidth / 2));
      });
      row.addEventListener("focusout", function () { L.hold = false; });
      // drag or swipe sideways to move a row by hand; a short tap still opens the photo
      row.addEventListener("pointerdown", function (e) {
        if (e.button) return;
        L.drag = { x0: e.clientX, x: L.x, t: e.timeStamp, last: e.clientX, moved: false, id: e.pointerId };
      });
      row.addEventListener("pointermove", function (e) {
        var d = L.drag; if (!d || d.id !== e.pointerId) return;
        var dx = e.clientX - d.x0;
        if (!d.moved && Math.abs(dx) > 8) { d.moved = true; try { row.setPointerCapture(e.pointerId); } catch (_) {} row.classList.add("is-dragging"); }
        if (!d.moved) return;
        var dt = Math.max(e.timeStamp - d.t, 1) / 1000;
        L.v = (e.clientX - d.last) / dt; d.last = e.clientX; d.t = e.timeStamp;
        var before = L.x; L.x = d.x + dx; wrap(L); d.x += L.x - (d.x + dx);
        L.track.style.transform = "translate3d(" + L.x.toFixed(2) + "px,0,0)";
      });
      function endDrag() {
        var d = L.drag; if (!d) return;
        L.drag = null; row.classList.remove("is-dragging");
        L.v = Math.max(-900, Math.min(900, L.v));    // let go and it glides, then settles back to its own pace
        if (d.moved) { L.suppress = true; setTimeout(function () { L.suppress = false; }, 60); }
      }
      row.addEventListener("pointerup", endDrag);
      row.addEventListener("pointercancel", endDrag);
      row.addEventListener("click", function (e) { if (L.suppress) { e.stopPropagation(); e.preventDefault(); } }, true);
    });
    pauseBtn.addEventListener("click", function () {
      paused = !paused;
      pauseBtn.setAttribute("aria-pressed", String(paused));
      pauseBtn.textContent = paused ? "Play the photos" : "Pause the photos";
    });
  } else {
    marquee.classList.add("is-still"); pauseBtn.hidden = true;
  }
  var rail = marquee;

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

  /* ------------------------------------------------ the film: the right shape for the screen, one clear play button
     The source is set up front so the tap only has to press play. The poster button stays until frames are moving. */
  var video = $("#film-video"), filmFrame = $("#film-frame"), filmPlay = $("#film-play"), filmLabel = $("strong", filmPlay);
  var tall = matchMedia("(max-aspect-ratio: 4/5)").matches;
  var filmSrc = tall ? video.dataset.srcMobile : video.dataset.src;
  if (tall) { filmFrame.classList.add("is-tall"); video.poster = video.dataset.posterMobile; }
  $("#film-direct").href = filmSrc;
  // the film is silent: saying so lets strict browsers (Safari, iPhone) play it without blocking
  video.muted = true; video.defaultMuted = true; video.playsInline = true;
  // the film file only starts loading as you come near it, so it never slows the opening
  new IntersectionObserver(function (es, o) {
    if (es[0].isIntersecting) { if (!video.getAttribute("src")) video.src = filmSrc; o.disconnect(); }
  }, { rootMargin: "1200px 0px" }).observe(filmFrame);
  function showControls() { filmFrame.classList.add("is-playing"); video.controls = true; filmLabel.textContent = "Play the film"; }
  function startFilm() {
    if (!filmMuted) filmHymnOn();          // start the music inside the tap, so strict phones allow it
    filmLabel.textContent = "Starting the film\u2026";
    if (!video.getAttribute("src") || video.error) { video.src = filmSrc; video.load(); }
    var p;
    try { p = video.play(); } catch (e) { showControls(); return; }
    // if a browser refuses, its own controls take over, which every phone knows how to use
    if (p && p.catch) p.catch(showControls);
    setTimeout(function () { if (video.paused) showControls(); }, 4000);
  }
  filmPlay.addEventListener("click", startFilm);
  $("[data-open-film]").addEventListener("click", function () {
    startFilm();
    $("#film").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  });
  video.addEventListener("playing", showControls);
  video.addEventListener("play", function () {
    filmOn = true;
    if (!audio.paused) audio.pause();
    if (!filmMuted) filmHymnOn(); else ambient.pause();
  });
  // paused or finished: the film's hymn stops and the page hymn carries on if it was playing before
  function filmStopped() {
    if (!filmOn) return;
    filmOn = false; filmHymn.pause();
    if (soundWanted && audio.paused) { tryPlay(ambient); meta("Sleep on, Beloved"); }
  }
  video.addEventListener("pause", filmStopped);
  video.addEventListener("error", showControls);
  video.addEventListener("ended", function () { filmStopped(); filmFrame.classList.remove("is-playing"); video.controls = false; video.currentTime = 0; });

  /* ------------------------------------------------ phones: one big button names where you are and opens every section */
  var HINTS = ["Date, church and officiants", "The running order", "Hymns, readings and prayers", "His life story",
               "From family and friends", "Photo Speak", "The memorial film", "The family's thanks"];
  var sheet = $("#sections"), sheetList = $("#sections-list"), sheetBtn = $("#sections-btn"), sheetReturn = null;
  $$("#tab-list a").forEach(function (a, k) {
    var li = el("li"), link = el("a", "sheet__link");
    link.href = a.getAttribute("href");
    link.innerHTML = '<span class="sheet__num">' + (k + 1) + '</span><span class="sheet__words"><span class="sheet__name"></span><span class="sheet__hint"></span></span>';
    $(".sheet__name", link).textContent = a.textContent;
    $(".sheet__hint", link).textContent = HINTS[k] || "";
    li.appendChild(link); sheetList.appendChild(li);
  });
  function openSheet() {
    document.documentElement.classList.add("menu-seen");
    sheetReturn = document.activeElement;
    sheet.hidden = false; document.body.style.overflow = "hidden";
    sheetBtn.setAttribute("aria-expanded", "true");
    var cur = $(".sheet__link[aria-current]", sheet) || $(".sheet__link", sheet);
    requestAnimationFrame(function () { sheet.classList.add("is-open"); var panel = $(".sheet__panel", sheet); panel.scrollTop = Math.max(0, cur.offsetTop - panel.clientHeight / 2); cur.focus({ preventScroll: true }); });
  }
  function closeSheet(keepFocus) {
    sheet.classList.remove("is-open"); sheetBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    setTimeout(function () { sheet.hidden = true; }, reduce ? 0 : 260);
    if (!keepFocus && sheetReturn) sheetReturn.focus({ preventScroll: true });
  }
  sheetBtn.addEventListener("click", openSheet);
  $("#sections-close").addEventListener("click", function () { closeSheet(); });
  sheet.addEventListener("click", function (e) {
    if (e.target === sheet) return closeSheet();
    if (e.target.closest("a")) closeSheet(true);
  });
  sheet.addEventListener("keydown", function (e) {
    if (e.key === "Escape") return closeSheet();
    if (e.key !== "Tab") return;
    var f = $$("a, button", sheet), first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  var sheetLinks = $$(".sheet__link", sheet), curName = $("#sections-current"), curKicker = $("#sections-kicker");
  function nameSection(cur) {
    sheetLinks.forEach(function (a, k) { if (k === cur) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
    curKicker.textContent = cur >= 0 ? "Section " + (cur + 1) + " of " + sheetLinks.length : "Sections";
    curName.textContent = cur >= 0 ? sheetLinks[cur].querySelector(".sheet__name").textContent : "Choose a section";
  }
  nameSection(-1);

  /* ------------------------------------------------ section tabs follow the reading line */
  var tabLinks = $$("#tab-list a"), tabList = $("#tab-list");
  var chapters = $$("[data-tab]"), service = $("#service"), lastTab = -1, progressEl = $("#tabs-progress");
  function tabs() {
    tabList.classList.toggle("is-overflowing", tabList.scrollWidth > tabList.clientWidth + 2);
    var line = innerHeight * 0.3, cur = -1;
    chapters.forEach(function (c) { if (c.getBoundingClientRect().top <= line) cur = +c.dataset.tab; });
    if (cur !== lastTab) {
      tabLinks.forEach(function (a, k) { if (k === cur) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
      nameSection(cur);
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

  /* ------------------------------------------------ the opening
     Holds while the type, the opening picture and the page arrive (at least long enough for the cross to rise,
     never more than five seconds), then asks once whether to enter with the hymn. */
  (function () {
    var loader = $("#loader"), bar = $("#loader-bar"), root = document.documentElement;
    var t0 = performance.now(), MIN = reduce ? 400 : 1900, MAX = 5000, done = false;
    // the opening needs the type, the first picture and the start of the showreel; the rest streams in afterwards
    var reelReady = new Promise(function (res) { if (reel.readyState >= 2) res(); else { reel.addEventListener("loadeddata", res, { once: true }); setTimeout(res, 3500); } });
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    var poster = new Promise(function (res) { var i = new Image(); i.onload = i.onerror = res; i.src = reel.poster; });
    var parts = [reelReady, fonts, poster], got = 0;
    parts.forEach(function (pr) { pr.then(function () { got++; bar.style.transform = "scaleX(" + (0.2 + 0.8 * got / parts.length).toFixed(2) + ")"; }); });
    bar.style.transform = "scaleX(.12)";
    function ready() {
      if (done) return; done = true;
      bar.style.transform = "scaleX(1)";
      setTimeout(function () {
        $("#loader-wait").hidden = true;
        $("#loader-enter").hidden = false;
        $("#enter-sound").focus({ preventScroll: true });
      }, Math.max(0, MIN - (performance.now() - t0)));
    }
    Promise.all(parts).then(ready);
    setTimeout(ready, MAX);
    function enter(withSound) {
      if (withSound) soundOn();
      loader.classList.add("is-leaving");
      root.classList.remove("is-loading");
      setTimeout(function () { loader.remove(); }, reduce ? 0 : 700);
      // warm the photographs in the background now that the opening is done
      setTimeout(function () { GALLERY.forEach(function (g) { var i = new Image(); i.decoding = "async"; i.src = g.thumb; }); }, 1500);
    }
    $("#enter-sound").addEventListener("click", function () { enter(true); });
    $("#enter-quiet").addEventListener("click", function () { enter(false); });
  })();

  ScrollCraft.mount(document.body);
  requestAnimationFrame(frame);
  addEventListener("load", onScroll);
})();
