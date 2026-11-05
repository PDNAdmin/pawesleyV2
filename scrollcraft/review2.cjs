const { chromium } = require('playwright-core');
const O = 'C:/Users/USER/Documents/memorial_curo_pawelsey/.impeccable/review/';
const go = async (b, w, h, opts = {}) => {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: w < 700, hasTouch: w < 700, reducedMotion: opts.reduced ? 'reduce' : 'no-preference' });
  const p = await ctx.newPage(); await p.goto('http://localhost:8744/', { waitUntil: 'domcontentloaded' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200); return p;
};
const to = (p, sel, off = 0) => p.evaluate(([s, o]) => { const e = document.querySelector(s); scrollTo({ top: e.getBoundingClientRect().top + scrollY + innerHeight * o, behavior: 'instant' }); }, [sel, off]).then(() => p.waitForTimeout(800));
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  // full pages: walk the document so lazy images and cues settle, then stitch viewport frames
  for (const [w, h, name] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
    const p = await go(b, w, h); const H = await p.evaluate(() => document.documentElement.scrollHeight);
    const frames = [];
    for (let y = 0; y < H; y += h) { await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(350); frames.push(await p.screenshot()); }
    require('fs').writeFileSync(O + name + '-frames.json', JSON.stringify({ w, h, H, n: frames.length }));
    frames.forEach((f, i) => require('fs').writeFileSync(O + `_${name}-${String(i).padStart(3, '0')}.png`, f));
    await p.context().close();
  }
  let p = await go(b, 1440, 900);
  await p.waitForTimeout(1500); await p.screenshot({ path: O + 'desktop-hero.png' });
  await to(p, '#life', 1.8); await p.screenshot({ path: O + 'desktop-life.png' });
  await to(p, '#step-3', -0.05); await p.screenshot({ path: O + 'desktop-service.png' });
  await to(p, '#photos', 0.6); await p.focus('#photo-rail .ph'); await p.waitForTimeout(300); await p.screenshot({ path: O + 'desktop-rail-focus.png' }); await p.context().close();
  p = await go(b, 390, 844); await p.waitForTimeout(1500); await p.screenshot({ path: O + 'mobile-hero.png' });
  await to(p, '#life', 1); await p.screenshot({ path: O + 'mobile-life.png' });
  await to(p, '#step-3', -0.05); await p.click('[data-lang="yo"]'); await p.waitForTimeout(400); await p.screenshot({ path: O + 'mobile-lang-yoruba.png' });
  await p.click('[data-lang="both"]'); await p.waitForTimeout(400); await p.screenshot({ path: O + 'mobile-lang-both.png' });
  await to(p, '#tributes', 0); await p.focus('#tab-list a[href="#tributes"]'); await p.waitForTimeout(300); await p.screenshot({ path: O + 'mobile-tabs-focus.png' });
  await to(p, '#photos', 0.5); await p.evaluate(() => document.querySelector('#photo-rail .ph').click()); await p.waitForTimeout(600); await p.screenshot({ path: O + 'mobile-lightbox.png' }); await p.context().close();
  p = await go(b, 390, 844, { reduced: true }); await to(p, '#life', 1); await p.screenshot({ path: O + 'mobile-life-reduced.png' }); await p.context().close();
  await b.close();
})();
