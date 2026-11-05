const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:8744/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1200);
  await p.evaluate(() => scrollTo({ top: document.getElementById('tributes').getBoundingClientRect().top + scrollY, behavior: 'instant' })); await p.waitForTimeout(2500);
  console.log(await p.evaluate(() => { const h = document.querySelector('.thead .chapter__title'), l = document.querySelector('.thead__lede'), cs = getComputedStyle(h);
    return JSON.stringify({ mb: cs.marginBottom, lh: cs.lineHeight, fs: cs.fontSize, transform: cs.transform, hBottom: Math.round(h.getBoundingClientRect().bottom), lTop: Math.round(l.getBoundingClientRect().top), cls: h.className }); }));
  await b.close();
})();
