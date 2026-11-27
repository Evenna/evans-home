const puppeteer = require('/root/node_modules/puppeteer');
(async () => {
  const b = await puppeteer.launch({ headless: 'new', executablePath: '/root/.cache/puppeteer/chrome/linux-149.0.7827.22/chrome-linux64/chrome', args: ['--no-sandbox','--allow-file-access-from-files'] });
  const p = await b.newPage(); await p.setViewport({ width: 1920, height: 1080 });
  await p.goto('file://' + __dirname + '/stage.html', { waitUntil: 'load' });
  const shots = await p.evaluate(() => __shots);
  for (const s of shots) {
    const t = s.t0 + s.dur - .4;
    await p.evaluate(t => __seek(t), t); await p.evaluate(()=>__ready()); await p.evaluate(t => __seek(t), t);
    const r = await p.evaluate(() => {
      const out = [], boxes = [];
      document.querySelectorAll('.world .cn,.world .en,.world .mono').forEach(e => {
        if (e.closest('.n') && getComputedStyle(e.closest('.n')).opacity < .5) return;
        let o = 1, n = e; while (n && n.id !== 'stage') { o *= +getComputedStyle(n).opacity; n = n.parentElement; } if (o < .5) return;
        const r = e.getBoundingClientRect(); if (r.width < 2) return;
        const txt = e.textContent.trim().slice(0, 14);
        if (r.left < 60 || r.right > 1860 || r.top < 110 || r.bottom > 1020) out.push(`EDGE「${txt}」${r.left|0},${r.top|0},${r.right|0},${r.bottom|0}`);
        boxes.push([txt, r, e]);
      });
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const [a, A, ea] = boxes[i], [bb, B, eb] = boxes[j];
        if (ea.contains(eb) || eb.contains(ea) || ea.closest('.n').parentElement === eb.closest('.n').parentElement && a === bb) continue;
        const ix = Math.min(A.right, B.right) - Math.max(A.left, B.left), iy = Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top);
        if (ix > 20 && iy > 20 && a !== bb) out.push(`OVER「${a}」×「${bb}」`);
      }
      return out;
    });
    if (r.length) console.log(String(s.i + 1).padStart(2, '0'), [...new Set(r)].slice(0, 6).join(' | '));
  }
  await b.close();
})();
