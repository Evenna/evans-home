const puppeteer = require('/root/node_modules/puppeteer');
const fs = require('fs');
const FPS = 25, MODE = process.argv[2] || 'stills';
const PART = +(process.argv[3] || 0), NP = +(process.argv[4] || 1);
(async () => {
  const dir = MODE === 'stills' ? __dirname + '/stills' : __dirname + '/frames';
  fs.mkdirSync(dir, { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', protocolTimeout: 600000, executablePath: '/root/.cache/puppeteer/chrome/linux-149.0.7827.22/chrome-linux64/chrome',
    args: ['--no-sandbox', '--allow-file-access-from-files', '--force-color-profile=srgb', '--font-render-hinting=none', '--enable-gpu-rasterization', '--ignore-gpu-blocklist'] });
  const p = await b.newPage(); const errs = [];
  p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.setViewport({ width: 1080, height: 1920 });
  await p.goto('file://' + __dirname + '/stage.html', { waitUntil: 'load' });
  const shots = await p.evaluate(() => window.__shots), total = await p.evaluate(() => __total);
  let list;
  if (MODE === 'stills') list = shots.map(s => [s.t0 + Math.min(s.dur * .72, s.dur - .35), `s${String(s.i + 1).padStart(2, '0')}.jpg`]);
  else { const N = Math.round(total * FPS); list = []; for (let f = PART; f < N; f += NP) list.push([f / FPS, String(f).padStart(5, '0') + '.jpg']); }
  for (const [t, name] of list) {
    if (MODE !== 'stills' && fs.existsSync(`${dir}/${name}`) && fs.statSync(`${dir}/${name}`).size > 1000) continue;
    await p.evaluate(t => __seek(t), t);
    await p.evaluate(() => __ready());
    await p.evaluate(t => __seek(t), t);
    await p.screenshot({ path: `${dir}/${name}`, type: 'jpeg', quality: MODE === 'stills' ? 90 : 84 });
  }
  console.log('DONE', MODE, PART, list.length, 'ERRS', JSON.stringify(errs.slice(0, 5)));
  await b.close();
})();
