const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:8744/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1500);
  console.log(await p.evaluate(() => {
    const r = document.getElementById('photo-rail'), l = document.querySelector('.photos__lead');
    const t = document.querySelector('.tabs__logo'), w = document.querySelector('#order .wrap h2');
    const tl = document.getElementById('tab-list');
    return JSON.stringify({ railPadL: getComputedStyle(r).paddingLeft, railTransform: getComputedStyle(r).transform,
      tabsLogoX: Math.round(t.getBoundingClientRect().left), contentX: Math.round(w.getBoundingClientRect().left),
      tabsOverflow: tl.scrollWidth - tl.clientWidth });
  }));
  // rail before it starts panning
  await p.evaluate(() => { const s = document.getElementById('photos'); scrollTo({ top: s.getBoundingClientRect().top + scrollY, behavior: 'instant' }); });
  await p.waitForTimeout(700);
  console.log('lead x at p=0:', await p.evaluate(() => Math.round(document.querySelector('.photos__lead').getBoundingClientRect().left)));
  await p.screenshot({ path: 'C:/Users/USER/Documents/memorial_curo_pawelsey/.impeccable/review/desktop-rail-start.png' });
  // keyboard focus on a tab: real Tab key presses so :focus-visible applies
  await p.evaluate(() => { scrollTo({ top: document.getElementById('tributes').getBoundingClientRect().top + scrollY, behavior: 'instant' }); document.querySelector('.tabs__logo').focus(); });
  await p.keyboard.press('Tab'); await p.keyboard.press('Tab'); await p.waitForTimeout(300);
  console.log('focused:', await p.evaluate(() => document.activeElement.textContent.trim() + ' visible=' + document.activeElement.matches(':focus-visible')));
  await p.screenshot({ path: 'C:/Users/USER/Documents/memorial_curo_pawelsey/.impeccable/review/desktop-tabs-focus.png' });
  await b.close();
})();
