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

  /* PDF page on which each order-of-service item is printed */
  var PAGE = { 1: "03", 2: "04", 3: "05", 4: "06", 5: "07", 6: "08", 7: "09", 8: "10", 9: "10",
               10: "11", 11: "11", 12: "11", 13: "11", 14: "12", 15: "12", 16: "14", 17: "16" };

  /* ------------------------------------------------ page 01: officiants */
  $("#officiants").innerHTML = SERVICE_INFO.officiants.map(function (o) {
    return '<li><span class="name">' + o.name + "</span>" + (o.role ? '<span class="role">' + o.role + "</span>" : "") + "</li>";
  }).join("");
  $("#needs-list").innerHTML = SERVICE_INFO.churchNeeds.map(function (n) { return "<li>" + n + "</li>"; }).join("");

  /* ------------------------------------------------ page 02: the order (as printed) */
  var EN = ["Receiving of the Body", "Sentences", "Hymn", "Psalm 90", "Lessons 1 Thess. 4:13-18", "Intercessory Prayer", "Hymn",
            "Sermon", "Prayers", "Thanksgiving", "Notices", "Vote of Thanks", "Recessional Hymn",
            "Admonition", "Hymn", "Committal and Prayer", "Benediction and Grace"];
  var YO = ["Gbigb oku ni enu ona", "Awon Asayan oro Olorun", "Orin", "Iwe Orin Dafidi 90", "Eko Kika 1 Thess. 4:13-18", "Adura fun gbogbo eniyan", "Orin",
            "Iwasu", "Adura", "Idupe", "Ifilo", "Idupe lati owo ebi", "Orin Akojade",
            "Awon oro Iyanju", "Orin", "Gbigbe oku si iboji ati adura", "Adura ikehin ati ore-ofe"];
  function orderCol(list, bar, cls, lang) {
    var col = el("div", "contents__col " + cls);
    col.setAttribute("lang", lang);
    var a = el("ol"), b = el("ol");
    list.forEach(function (t, i) {
      var li = el("li"), link = el("a");
      link.href = "#step-" + (i + 1);
      link.innerHTML = "<span>" + (i + 1) + ".</span><span>" + t + "</span>";
      li.appendChild(link);
      (i < 13 ? a : b).appendChild(li);
    });
    col.appendChild(a);
    col.appendChild(el("p", "gravebar", bar));
    col.appendChild(b);
    return col;
  }
  var cols = $("#contents-cols");
  cols.appendChild(orderCol(EN, "The Grave Side", "contents__col--en", "en"));
  cols.appendChild(orderCol(YO, "Ni Ite Oku", "contents__col--yo", "yo"));

  /* ------------------------------------------------ pages 03 to 16: the service */
  function body(items) {
    var f = document.createDocumentFragment();
    items.forEach(function (it) {
      if (it.type === "p") f.appendChild(el("p", "", it.text));
      else if (it.type === "liturgy") {
        var p = el("p", "liturgy-line");
        p.appendChild(el("span", "speaker", it.speaker + ":"));
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

  function head(step, lang) {
    var h = el("h3", "ihead");
    var num = el("span", "ihead__num", step.num + ".");
    num.setAttribute("aria-hidden", lang === "yo" ? "true" : "false");
    h.appendChild(num);
    var src = lang === "yo" ? step.sub : step.title;
    var parts = splitTitle(src);
    var n = step.num;
    if (n === 8 || n === 9 || n === 15 || n === 17) {
      h.classList.add("ihead--tall");
      var word = lang === "yo"
        ? { 8: "Iwasu", 9: "Adura", 15: "Orin", 17: "Adura Ikehin" }[n]
        : { 8: "Sermon", 9: "Prayer", 15: "Hymns", 17: "Benediction" }[n];
      h.appendChild(el("span", "ihead__caps", word));
      var sub = lang === "yo"
        ? { 8: "", 9: "", 15: "Maa Sun Olufe", 17: "ati Ore Ofe" }[n]
        : { 8: "", 9: "", 15: "Sleep on Beloved", 17: "and Grace" }[n];
      if (sub) h.appendChild(el("span", "ihead__title", sub));
    } else if (n === 16) {
      h.classList.add("ihead--didone");
      h.appendChild(el("span", "ihead__caps", lang === "yo" ? "Isinku Ati Adura" : "Committal Prayer"));
    } else if (n === 13 && lang === "en") {
      h.appendChild(el("span", "ihead__caps", "Recessional Hymn"));
      h.appendChild(el("span", "ihead__script", "Hymn 261"));
    } else if (n === 13) {
      h.appendChild(el("span", "ihead__caps", "Orin Akojade"));
      h.appendChild(el("span", "ihead__script", "Orin 261"));
    } else if (parts[1]) {
      h.appendChild(el("span", "ihead__script", parts[0] + ":"));
      h.appendChild(el("span", "ihead__title", parts[1]));
    } else {
      h.appendChild(el("span", "ihead__caps", parts[0]));
    }
    return h;
  }

  var root = $("#service-items");
  var steps = ORDER_OF_SERVICE;
  var isStatic = function (s) { return !s.body.length && !(s.yoruba && s.yoruba.length); };
  for (var i = 0; i < steps.length; i++) {
    var s = steps[i];
    if (isStatic(s)) {
      var run = [s];
      while (steps[i + 1] && isStatic(steps[i + 1])) run.push(steps[++i]);
      var blk = el("article", "item item--run");
      blk.id = "step-" + run[0].num;
      blk.setAttribute("data-folio", PAGE[run[0].num]);
      blk.setAttribute("data-folio-title", run.map(function (r) { return r.title; }).join(", "));
      var grid = el("div", "run");
      run.forEach(function (r) {
        var en = el("h3", "run__en");
        if (r !== run[0]) en.id = "step-" + r.num;
        en.innerHTML = '<span class="ihead__num">' + r.num + '.</span><span class="ihead__caps">' + r.title + "</span>";
        var yo = el("p", "run__yo", r.sub);
        yo.setAttribute("lang", "yo");
        grid.appendChild(en); grid.appendChild(yo);
      });
      blk.appendChild(grid);
      root.appendChild(blk);
      continue;
    }
    var art = el("article", "item");
    art.id = "step-" + s.num;
    art.setAttribute("data-folio", PAGE[s.num]);
    art.setAttribute("data-folio-title", splitTitle(s.title).join(" ").trim());
    if (s.num === 16) {
      var fig = el("figure", "item__photo");
      fig.setAttribute("data-sc-in", "");
      fig.innerHTML = '<img src="/assets/print/prayer.webp" width="1600" height="792" loading="lazy" alt="Worshippers in prayer beside an open Bible">';
      art.appendChild(fig);
    }
    var c = el("div", "item__cols");
    var enCol = el("div", "item__col item__col--en");
    enCol.setAttribute("lang", "en");
    enCol.appendChild(head(s, "en"));
    enCol.appendChild(body(s.body));
    var yoCol = el("div", "item__col item__col--yo");
    yoCol.setAttribute("lang", "yo");
    yoCol.appendChild(head(s, "yo"));
    var hasHymn = s.body.some(function (b) { return b.type === "hymn"; });
    var lines = (s.yoruba || []).slice(1);
    if (hasHymn && lines.length) {
      var ol = el("ol", "verses");
      lines.forEach(function (t) { ol.appendChild(el("li", "", t)); });
      yoCol.appendChild(ol);
      if (s.num === 15) yoCol.appendChild(el("p", "hymn-title", "Ninu Kristi"));
    } else {
      lines.forEach(function (t) { yoCol.appendChild(el("p", "", t)); });
    }
    if (s.num === 15) {
      var note = $$(".hymn-title", enCol).pop();
      if (note && note.nextElementSibling) note.nextElementSibling.classList.add("copyright-note");
    }
    c.appendChild(enCol); c.appendChild(yoCol);
    art.appendChild(c);
    root.appendChild(art);
  }

  /* language: both columns side by side like the print on wide screens, English first on phones */
  var langBtns = $$(".lang button");
  var keep = null;
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

  /* ------------------------------------------------ pages 17 to 18: the darkroom */
  var ERAS = [
    { src: "/assets/print/bio-portrait.webp", cut: true, alt: "Pa. Wesley Olajide Ojo Aiyegboka" },
    { src: "/assets/photos/full/img-01.jpg", alt: "A young Wesley Olajide Ojo Aiyegboka in a suit" },
    { src: "/assets/photos/full/img-09.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka seated beside a woman in glasses" },
    { src: "/assets/photos/full/img-13.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka seated in purple traditional attire" },
    { src: "/assets/photos/full/img-30.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka with two young people" },
    { src: "/assets/photos/full/img-02.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka standing in patterned traditional attire" },
    { src: "/assets/photos/full/img-05.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka walking in white agbada" },
    { src: "/assets/photos/full/img-22.jpg", alt: "Pa. Wesley Olajide Ojo Aiyegboka beside a woman, both in yellow" },
    { src: "/assets/photos/full/img-08.jpg", alt: "Portrait of Pa. Wesley Olajide Ojo Aiyegboka smiling" }
  ];
  var tray = $("#dr-tray"), yearEl = $("#dr-year");
  var paras = $$("#dr-text p");
  function makePrint(era, k) {
    var f = el("figure", "print " + (era.cut ? "print--cutout" : "print--photo"));
    f.style.setProperty("--tilt", (k % 2 ? 1.4 : -1.6) + "deg");
    f.style.zIndex = String(k + 1);
    f.innerHTML = '<img src="' + era.src + '" alt="' + era.alt + '" loading="' + (k < 2 ? "eager" : "lazy") + '" decoding="async">';
    return f;
  }
  var trayPrints = ERAS.map(function (e, k) { var f = makePrint(e, k); tray.appendChild(f); return f; });
  var firstOfEra = [];
  paras.forEach(function (p) {
    var e = +p.dataset.era;
    if (firstOfEra[e] == null) firstOfEra[e] = p;
  });
  var inlinePrints = firstOfEra.map(function (p, e) {
    var holder = el("div", "darkroom__inline");
    holder.setAttribute("aria-hidden", "true");
    var f = makePrint(ERAS[e], e);
    holder.appendChild(f);
    p.parentNode.insertBefore(holder, p);
    return f;
  });

  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  var lastYear = null;
  var devs = [];
  function darkroom() {
    var vh = innerHeight, line = vh * 0.42;
    var wide = innerWidth > 860;
    // develop: each era's print comes up as its first paragraph reaches the reading line
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
    // an earlier print leaves the tray once the next one has nearly developed
    trayPrints.forEach(function (f, e) {
      var nx = devs[e + 1] || 0;
      f.style.setProperty("--gone", clamp01((nx - 0.6) / 0.4).toFixed(3));
    });
    // the year: only the years the biography states, rolling between them as you read
    var year = 1943, era = 0;
    paras.forEach(function (p) {
      var r = p.getBoundingClientRect();
      var reading = r.top < line && r.bottom > line - 1;
      if (wide) p.classList.toggle("is-reading", reading || (r.top < line && p === paras[paras.length - 1]));
      if (r.top < line) {
        era = +p.dataset.era;
        if (p.dataset.years) {
          var ys = p.dataset.years.split(" ").map(Number);
          if (ys.length === 1) year = ys[0];
          else {
            var t = clamp01((line - r.top) / Math.max(r.height, 1));
            year = Math.round(ys[0] + (ys[1] - ys[0]) * (reduce ? 1 : t));
          }
        }
      }
    });
    if (year !== lastYear) { yearEl.textContent = String(year); lastYear = year; }
  }

  /* ------------------------------------------------ pages 19 to 36: tributes */
  var tlist = $("#tribute-list"), tindex = $("#tribute-index");
  TRIBUTES.forEach(function (t, k) {
    var id = "tribute-" + (k + 1);
    var a = el("article", "tribute");
    a.id = id;
    if (t.title) {
      a.appendChild(el("h3", "tribute__title", t.title));
    }
    var b = el("div", "tribute__body");
    t.body.forEach(function (para) { b.appendChild(el("p", "", para)); });
    a.appendChild(b);
    var sign = el("p", "tribute__sign");
    var who = el("span", "tribute__author");
    who.appendChild(el("span", "tribute__name", t.author));
    if (t.relation) who.appendChild(el("span", "tribute__rel", t.relation));
    sign.appendChild(who);
    a.appendChild(sign);
    tlist.appendChild(a);
    var li = el("li"), link = el("a", "", t.author);
    link.href = "#" + id;
    li.appendChild(link);
    tindex.appendChild(li);
  });

  if (innerWidth > 860) $("#tribute-finder").open = true;
  tindex.addEventListener("click", function (e) { if (e.target.closest("a") && innerWidth <= 860) $("#tribute-finder").open = false; });

  /* ------------------------------------------------ pages 41 to 44: photo speak */
  var PORTRAIT = { 1: 1, 2: 1, 4: 1, 5: 1, 10: 1, 11: 1, 15: 1, 16: 1, 18: 1, 29: 1 };
  var rail = $("#photo-rail");
  var queue = GALLERY.slice();
  function tile(ph) {
    var b = el("button", "ph");
    b.type = "button";
    b.dataset.index = String(ph.id - 1);
    b.setAttribute("aria-label", "Open photograph " + ph.id + " of " + GALLERY.length);
    b.innerHTML = '<img src="' + ph.thumb + '" alt="' + ph.alt + '" loading="' + (ph.id <= 8 ? "eager" : "lazy") + '" decoding="async">';
    return b;
  }
  while (queue.length) {
    var ph = queue.shift();
    var col;
    if (PORTRAIT[ph.id] || !queue.length || PORTRAIT[queue[0].id]) {
      col = el("div", "pcol pcol--tall");
      col.appendChild(tile(ph));
    } else {
      col = el("div", "pcol pcol--pair");
      col.appendChild(tile(ph));
      col.appendChild(tile(queue.shift()));
    }
    rail.appendChild(col);
  }
  // a tile reached by Tab can sit off-screen on the panning rail: move the page until it pans into view
  var photosAct = $("#photos");
  rail.addEventListener("focusin", function (e) {
    var t = e.target.closest(".ph"); if (!t || reduce) return;
    var travel = rail.scrollWidth - innerWidth;
    if (travel <= 0) return;
    var x = t.offsetLeft + t.offsetWidth / 2 - innerWidth / 2;
    var p = Math.max(0, Math.min(1, x / travel));
    var top = photosAct.getBoundingClientRect().top + scrollY;
    var span = photosAct.offsetHeight - innerHeight;
    scrollTo({ top: top + p * span, behavior: "instant" });
  });
  var end = el("p", "photos__end", "Forever in our Heart.");
  rail.appendChild(end);

  /* lightbox: arrows, keyboard and swipe */
  var lb = $("#lightbox"), lbImg = $("#lightbox-img"), lbCap = $("#lightbox-cap");
  var lbIndex = 0, lbReturn = null;
  function showPhoto(k) {
    lbIndex = (k + GALLERY.length) % GALLERY.length;
    lbImg.src = GALLERY[lbIndex].full;
    lbImg.alt = GALLERY[lbIndex].alt;
    lbCap.textContent = "Photograph " + (lbIndex + 1) + " of " + GALLERY.length;
  }
  function openLb(k) { lbReturn = document.activeElement; showPhoto(k); lb.hidden = false; document.body.style.overflow = "hidden"; $(".lightbox__close").focus(); folio.classList.add("is-hidden"); }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; if (lbReturn) lbReturn.focus(); updateFolio(); }
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

  /* ------------------------------------------------ folio and contents */
  var folio = $("#folio"), fNum = $("#folio-num"), fTitle = $("#folio-title");
  var dialog = $("#contents-dialog"), tocList = $("#toc-list");
  var marks = $$("[data-folio]");
  var TOC = [
    ["#cover", "", "Front cover"], ["#funeral-service", "01", "Funeral Service"], ["#order", "02", "Order of Funeral Services"]
  ];
  steps.forEach(function (st) { TOC.push(["#step-" + st.num, PAGE[st.num], st.num + ". " + splitTitle(st.title).join(" ").trim(), true]); });
  TOC.push(["#biography", "17", "Biography"], ["#tributes", "19", "Tributes"], ["#photos", "41", "Photo Speak"],
           ["#film", "", "Memorial film"], ["#appreciation", "", "Appreciation"]);
  tocList.innerHTML = TOC.map(function (r) {
    return '<li' + (r[3] ? ' class="is-sub"' : "") + '><a href="' + r[0] + '"><span>' + r[1] + "</span><span>" + r[2] + "</span></a></li>";
  }).join("");
  $("#folio-btn").addEventListener("click", function () {
    $$("a", tocList).forEach(function (a) { a.setAttribute("aria-current", String(a.getAttribute("href") === currentId)); });
    dialog.showModal();
  });
  dialog.addEventListener("click", function (e) { if (e.target === dialog || e.target.closest("[data-close]") || e.target.closest("a")) dialog.close(); });

  var currentId = "";
  function updateFolio() {
    var line = innerHeight * 0.35, cur = marks[0];
    for (var m = 0; m < marks.length; m++) if (marks[m].getBoundingClientRect().top <= line) cur = marks[m];
    var onCover = cur.id === "cover";
    folio.hidden = false;
    folio.classList.toggle("is-hidden", onCover || !lb.hidden);
    var n = cur.getAttribute("data-folio");
    fNum.textContent = /^\d+$/.test(n) ? n : "";
    fNum.style.display = /^\d+$/.test(n) ? "" : "none";
    fTitle.textContent = cur.getAttribute("data-folio-title");
    currentId = "#" + cur.id;
  }

  /* ------------------------------------------------ the film */
  var video = $("#film-video");
  $("[data-open-film]").addEventListener("click", function () {
    $("#film").scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    setTimeout(function () { if (video) { var p = video.play(); if (p && p.catch) p.catch(function () {}); } }, reduce ? 50 : 900);
  });

  /* ------------------------------------------------ one loop for the page's own moves */
  var ticking = false;
  function frame() { ticking = false; darkroom(); updateFolio(); }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  ScrollCraft.mount(document.body);
  requestAnimationFrame(frame);
  addEventListener("load", onScroll);
})();
