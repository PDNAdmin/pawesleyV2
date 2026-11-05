(function () {
  "use strict";

  /* ---------------------------------- Nav ---------------------------------- */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navAnchors = Array.from(document.querySelectorAll(".nav-links a"));
  if (sections.length && navAnchors.length && "IntersectionObserver" in window) {
    const byId = (id) => navAnchors.find((a) => a.getAttribute("href") === `#${id}`);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = byId(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            navAnchors.forEach((a) => a.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
  }

  /* ------------------------------- Reveal on scroll ------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const ro = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => ro.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* ------------------------------ Order of Service ------------------------------ */
  function renderLiturgyLine(item) {
    const p = document.createElement("p");
    p.className = "liturgy-line";
    const speaker = document.createElement("span");
    speaker.className = "speaker";
    speaker.textContent = item.speaker + ":";
    p.appendChild(speaker);
    p.appendChild(document.createTextNode(item.text));
    return p;
  }

  function renderServiceBody(body) {
    const frag = document.createDocumentFragment();
    body.forEach((item) => {
      if (item.type === "p") {
        const p = document.createElement("p");
        p.textContent = item.text;
        frag.appendChild(p);
      } else if (item.type === "liturgy") {
        frag.appendChild(renderLiturgyLine(item));
      } else if (item.type === "verse") {
        const p = document.createElement("p");
        p.className = "verse-block";
        p.textContent = `“${item.text}”`;
        const cite = document.createElement("span");
        cite.style.display = "block";
        cite.style.marginTop = "4px";
        cite.style.fontStyle = "normal";
        cite.style.fontWeight = "600";
        cite.style.fontSize = "0.85rem";
        cite.style.color = "var(--gold-deep)";
        cite.textContent = "— " + item.ref;
        p.appendChild(cite);
        frag.appendChild(p);
      } else if (item.type === "hymn-title") {
        const h = document.createElement("p");
        h.style.fontWeight = "700";
        h.style.color = "var(--wine)";
        h.style.marginBottom = "0.4em";
        h.textContent = item.text;
        frag.appendChild(h);
      } else if (item.type === "hymn") {
        const ol = document.createElement("ol");
        ol.className = "hymn-verses";
        item.verses.forEach((v) => {
          const li = document.createElement("li");
          li.textContent = v;
          ol.appendChild(li);
        });
        frag.appendChild(ol);
      }
    });
    return frag;
  }

  function renderOrderOfService() {
    const root = document.getElementById("service-accordion");
    const metaRoot = document.getElementById("service-meta");
    const officiantsRoot = document.getElementById("officiant-list");
    const needsRoot = document.getElementById("church-needs-list");
    if (!root || typeof ORDER_OF_SERVICE === "undefined") return;

    if (metaRoot) {
      metaRoot.innerHTML = `
        <div class="meta-card"><span class="meta-label">Church</span><span class="meta-value">${SERVICE_INFO.church}</span></div>
        <div class="meta-card"><span class="meta-label">Diocese</span><span class="meta-value">${SERVICE_INFO.diocese}</span></div>
        <div class="meta-card"><span class="meta-label">Slept in the Lord</span><span class="meta-value">${SERVICE_INFO.deceasedDate}</span></div>
        <div class="meta-card"><span class="meta-label">Burial &amp; Funeral Service</span><span class="meta-value">${SERVICE_INFO.serviceDate}</span></div>
      `;
    }
    if (officiantsRoot) {
      officiantsRoot.innerHTML = SERVICE_INFO.officiants
        .map((o) => `<li>${o.role ? `<span class="role">${o.role}</span>` : ""}<span class="name">${o.name}</span></li>`)
        .join("");
    }
    if (needsRoot) {
      needsRoot.innerHTML = SERVICE_INFO.churchNeeds.map((n) => `<li>${n}</li>`).join("");
    }

    ORDER_OF_SERVICE.forEach((step) => {
      const item = document.createElement("div");
      item.className = "acc-item";

      if (!step.body.length && !(step.yoruba && step.yoruba.length)) {
        item.classList.add("acc-static");
        item.innerHTML = `
          <div class="acc-trigger">
            <span class="step-num">${step.num}</span>
            <span class="step-title">${step.title}<span class="step-sub">${step.sub}</span></span>
          </div>`;
        root.appendChild(item);
        return;
      }

      const trigger = document.createElement("button");
      trigger.className = "acc-trigger";
      trigger.setAttribute("aria-expanded", "false");
      trigger.innerHTML = `
        <span class="step-num">${step.num}</span>
        <span class="step-title">${step.title}<span class="step-sub">${step.sub}</span></span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      `;

      const panel = document.createElement("div");
      panel.className = "acc-panel";
      const panelInner = document.createElement("div");
      panelInner.className = "acc-panel-inner";
      const bodyWrap = document.createElement("div");
      bodyWrap.className = "acc-body";
      bodyWrap.appendChild(renderServiceBody(step.body));

      if (step.yoruba && step.yoruba.length) {
        const wrap = document.createElement("div");
        wrap.className = "yoruba-toggle-wrap";
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "yoruba-toggle";
        btn.textContent = "Yorùbá text ▸";
        const yBody = document.createElement("div");
        yBody.className = "yoruba-body";
        step.yoruba.forEach((line) => {
          const p = document.createElement("p");
          p.textContent = line;
          yBody.appendChild(p);
        });
        btn.addEventListener("click", () => {
          const open = yBody.classList.toggle("open");
          btn.textContent = open ? "Yorùbá text ▾" : "Yorùbá text ▸";
        });
        wrap.appendChild(btn);
        wrap.appendChild(yBody);
        bodyWrap.appendChild(wrap);
      }

      panelInner.appendChild(bodyWrap);
      panel.appendChild(panelInner);

      trigger.addEventListener("click", () => {
        const isOpen = panel.classList.contains("open");
        panel.classList.toggle("open", !isOpen);
        trigger.setAttribute("aria-expanded", String(!isOpen));
      });

      item.appendChild(trigger);
      item.appendChild(panel);
      root.appendChild(item);
    });
  }

  /* ----------------------------------- Tributes ----------------------------------- */
  function excerptOf(paragraphs, maxLen) {
    const text = paragraphs.join(" ");
    if (text.length <= maxLen) return text;
    const cut = text.slice(0, maxLen);
    const lastSpace = cut.lastIndexOf(" ");
    return cut.slice(0, lastSpace) + "…";
  }

  function renderTributes() {
    const root = document.getElementById("tribute-grid");
    const countEl = document.getElementById("tribute-count");
    if (!root || typeof TRIBUTES === "undefined") return;
    if (countEl) countEl.textContent = `${TRIBUTES.length} tributes, in the order shared by the family`;

    TRIBUTES.forEach((t, i) => {
      const card = document.createElement("article");
      card.className = "tribute-card";

      const index = document.createElement("span");
      index.className = "tribute-index";
      index.textContent = String(i + 1).padStart(2, "0");
      card.appendChild(index);

      if (t.title) {
        const title = document.createElement("h3");
        title.className = "tribute-title";
        title.textContent = t.title;
        card.appendChild(title);
      }

      const excerpt = document.createElement("div");
      excerpt.className = "tribute-excerpt";
      const excerptP = document.createElement("p");
      excerptP.textContent = excerptOf(t.body, 220);
      excerpt.appendChild(excerptP);
      card.appendChild(excerpt);

      const full = document.createElement("div");
      full.className = "tribute-full";
      t.body.forEach((para) => {
        const p = document.createElement("p");
        p.textContent = para;
        full.appendChild(p);
      });
      card.appendChild(full);

      const foot = document.createElement("div");
      foot.className = "tribute-foot";
      const authorWrap = document.createElement("div");
      authorWrap.className = "tribute-author";
      authorWrap.innerHTML = `<span class="name">${t.author}</span>${t.relation ? `<span class="relation">${t.relation}</span>` : ""}`;
      foot.appendChild(authorWrap);

      const toggleBtn = document.createElement("button");
      toggleBtn.type = "button";
      toggleBtn.className = "tribute-read-more";
      toggleBtn.textContent = "Read full tribute ↓";
      toggleBtn.addEventListener("click", () => {
        const open = full.classList.toggle("open");
        excerpt.classList.toggle("hidden", open);
        toggleBtn.textContent = open ? "Show less ↑" : "Read full tribute ↓";
      });
      foot.appendChild(toggleBtn);

      card.appendChild(foot);
      root.appendChild(card);
    });
  }

  /* ----------------------------------- Gallery ----------------------------------- */
  function renderGallery() {
    const root = document.getElementById("gallery-grid");
    if (!root || typeof GALLERY === "undefined") return;

    GALLERY.forEach((photo, i) => {
      const fig = document.createElement("figure");
      fig.className = "gallery-item";
      fig.innerHTML = `
        <button type="button" data-index="${i}" aria-label="Open photograph ${i + 1} of ${GALLERY.length}">
          <img src="${photo.thumb}" alt="${photo.alt}" loading="lazy" decoding="async">
        </button>
        <span class="zoom-hint" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.3-4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M11 8v6M8 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        </span>
      `;
      root.appendChild(fig);
    });

    root.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-index]");
      if (!btn) return;
      openLightbox(Number(btn.dataset.index));
    });
  }

  /* ----------------------------------- Lightbox ----------------------------------- */
  let lbIndex = 0;
  let lastFocused = null;
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightbox-img");
  const lbCaption = document.getElementById("lightbox-caption");

  function openLightbox(index) {
    if (!lightbox || typeof GALLERY === "undefined") return;
    lbIndex = index;
    updateLightbox();
    lastFocused = document.activeElement;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox-close").focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function updateLightbox() {
    const photo = GALLERY[lbIndex];
    if (!photo) return;
    lbImg.src = photo.full;
    lbImg.alt = photo.alt;
    if (lbCaption) lbCaption.textContent = `Photo ${lbIndex + 1} of ${GALLERY.length}`;
  }

  function nextPhoto() {
    lbIndex = (lbIndex + 1) % GALLERY.length;
    updateLightbox();
  }
  function prevPhoto() {
    lbIndex = (lbIndex - 1 + GALLERY.length) % GALLERY.length;
    updateLightbox();
  }

  if (lightbox) {
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-next").addEventListener("click", nextPhoto);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", prevPhoto);
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    });

    let touchStartX = null;
    const figure = lightbox.querySelector(".lightbox-figure");
    figure.addEventListener("touchstart", (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
    figure.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { dx < 0 ? nextPhoto() : prevPhoto(); }
      touchStartX = null;
    }, { passive: true });
  }

  /* ----------------------------------- Init ----------------------------------- */
  renderOrderOfService();
  renderTributes();
  renderGallery();

  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
