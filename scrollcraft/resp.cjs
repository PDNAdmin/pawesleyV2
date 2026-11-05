const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  for (const [w, h] of [[320, 640], [390, 844], [768, 1024], [1024, 768], [1280, 800], [1920, 1080]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, isMobile: w < 800, hasTouch: w < 800 });
    await p.goto('http://localhost:8744/', { waitUntil: 'domcontentloaded' }); await p.waitForTimeout(1800);
    const r = await p.evaluate(() => {
      const de = document.documentElement, out = [];
      document.querySelectorAll('body *').forEach(e => { const b = e.getBoundingClientRect(); if (b.width && (b.right > innerWidth + 1 || b.left < -1) && !e.closest('#photo-rail') && getComputedStyle(e).position !== 'fixed') out.push((e.id ? '#' + e.id : e.className.toString().split(' ')[0] || e.tagName) + ' R=' + Math.round(b.right)); });
      const v = document.getElementById('hero-reel');
      return { scrollW: de.scrollWidth, clientW: de.clientWidth, offenders: [...new Set(out)].slice(0, 8), reel: v.currentSrc.split('/').pop(), reelReady: v.readyState, reelPaused: v.paused };
    });
    console.log(w + 'x' + h, JSON.stringify(r));
    const shots = { hero: '#cover', film: '#film', photos: '#photos', thanks: '#appreciation' };
    for (const [n, sel] of Object.entries(shots)) {
      await p.evaluate(s => { const e = document.querySelector(s); scrollTo({ top: e.getBoundingClientRect().top + scrollY + (s === '#photos' ? innerHeight * .8 : 0), behavior: 'instant' }); }, sel);
      await p.waitForTimeout(600);
      await p.screenshot({ path: `lab/r-${w}-${n}.png` });
    }
    await p.close();
  }
  await b.close();
})();
