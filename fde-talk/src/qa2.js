const puppeteer = require('/root/node_modules/puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: 'new', executablePath: '/root/.cache/puppeteer/chrome/linux-149.0.7827.22/chrome-linux64/chrome', args: ['--no-sandbox','--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080 });
  await p.goto('file://' + __dirname + '/stage.html', { waitUntil: 'load' });
  const shots = await p.evaluate(() => __shots);
  for (const s of shots) for (const f of [.55, .95]) {
    const t = s.t0 + s.dur * f - .05;
    await p.evaluate(t => __seek(t), t); await p.evaluate(()=>__ready()); await p.evaluate(t => __seek(t), t);
    const r = await p.evaluate(() => {
      const out = [], plate = document.querySelector('.plate'), cut = document.querySelector('.cut');
      const vis = plate.style.display !== 'none' && +plate.style.opacity > .5;
      const W = vis ? plate.getBoundingClientRect() : null, full = W && W.width > 1800;
      // 人物剪影近似：抠像图 bbox 映射
      const ci = cut.querySelector('img').getBoundingClientRect();
      const P = { l: ci.left + ci.width * 586 / 1920, r: ci.left + ci.width * 1044 / 1920, t: ci.top + ci.height * 150 / 1080, b: ci.bottom };
      const sub = document.querySelector('#h_sub'), S = sub.style.display !== 'none' ? sub.getBoundingClientRect() : null;
      document.querySelectorAll('#fw .cn,#fw .en,#fw .mono,#fw .panel').forEach(e => {
        let o = 1, n = e; while (n && n.id !== 'stage') { o *= +getComputedStyle(n).opacity; n = n.parentElement; } if (o < .5) return;
        const R = e.getBoundingClientRect(); if (R.width < 2) return;
        const ov = (A) => Math.min(R.right, A.right ?? A.r) - Math.max(R.left, A.left ?? A.l) > 20 && Math.min(R.bottom, A.bottom ?? A.b) - Math.max(R.top, A.top ?? A.t) > 20;
        const tx = (e.textContent.trim() || 'VID').slice(0, 10);
        if (W && !full && ov(W)) out.push(`WIN「${tx}」`);
        if (W && full && ov(P)) out.push(`PERSON「${tx}」${R.left|0}-${R.right|0}`);
        if (S && ov(S)) out.push(`SUB「${tx}」${R.bottom|0}`);
      });
      return out;
    });
    if (r.length) console.log(String(s.i + 1).padStart(2, '0'), s.mode, f, [...new Set(r)].slice(0, 6).join(' | '));
  }
  await b.close();
})();
