const { chromium } = require('playwright-core');
(async () => {
  const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); p.on('pageerror', e => console.log('PAGEERROR', e.message)); p.on('console', m => console.log('CONSOLE', m.type(), m.text()));
  await p.goto('http://localhost:8744/', { waitUntil: 'networkidle' });
  await p.waitForTimeout(500); await p.evaluate(()=>{window.scrollTo({top:5,behavior:'instant'});}); await p.waitForTimeout(300); console.log('after scroll5', await p.evaluate(()=>document.getElementById('folio').className+' lbhidden='+document.getElementById('lightbox').hidden));
  console.log(await p.evaluate(() => {
    const f = document.getElementById('folio');
    const marks=[...document.querySelectorAll('[data-folio]')].filter(m=>m.getBoundingClientRect().top<=innerHeight*0.35).map(m=>m.tagName+'#'+m.id+':'+Math.round(m.getBoundingClientRect().top));
    return JSON.stringify({ y: scrollY, cls: f.className, hidden: f.hidden, marks, docH: document.documentElement.scrollHeight });
  }));
  await b.close();
})();
