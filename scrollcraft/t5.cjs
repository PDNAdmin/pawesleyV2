const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  for (const [w, h] of [[390, 844], [1440, 900]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, isMobile: w < 800 });
    await p.goto('http://localhost:8744/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1500);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    let stuck = new Set();
    for (let y = 0; y < H; y += Math.round(h * 0.6)) {
      await p.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await p.waitForTimeout(250);
    }
    await p.waitForTimeout(1200);
    // after walking the page, anything still waiting to arrive was never seen
    const r = await p.evaluate(() => ({ total: document.querySelectorAll('.arrive').length, notIn: [...document.querySelectorAll('.arrive:not(.is-in)')].filter(e => e.offsetParent).map(e => e.className.split(' ')[0]).slice(0, 10) }));
    console.log(w, JSON.stringify(r));
    await p.evaluate(() => scrollTo({ top: document.getElementById('tributes').getBoundingClientRect().top + scrollY, behavior: 'instant' })); await p.waitForTimeout(3000);
    await p.screenshot({ path: `lab/t5-${w}.png` });
    await p.close();
  }
  await b.close();
})();
