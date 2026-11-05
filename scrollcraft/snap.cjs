// node snap.cjs <width> <height> <outprefix> <target1> [target2...]   target = css selector or y-pixel or "sel+offsetVh"
const { chromium } = require('playwright-core');
(async () => {
  const [w, h, out, ...targets] = process.argv.slice(2);
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, isMobile: +w < 700, hasTouch: +w < 700 });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  await p.goto('http://localhost:8744/', { waitUntil: 'domcontentloaded' });
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200);
  let i = 0;
  for (const t of targets) {
    await p.evaluate((t) => {
      let y;
      if (/^\d+$/.test(t)) y = +t;
      else { const [sel, off] = t.split('+'); const el = document.querySelector(sel); y = el.getBoundingClientRect().top + scrollY + (off ? innerHeight * parseFloat(off) : 0); }
      window.scrollTo({ top: y, behavior: 'instant' });
    }, t);
    await p.waitForTimeout(700);
    await p.screenshot({ path: `${out}-${i++}.png` });
  }
  if (errs.length) console.log('ERRORS:', errs.join(' | '));
  await b.close();
})();
