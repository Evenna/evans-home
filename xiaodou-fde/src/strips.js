// 每镜 4 帧关键帧条（入场 / 1/3 / 2/3 / 出场前）→ strips/sNN_k.jpg，供详细分镜用
const puppeteer = require('/root/node_modules/puppeteer'); const fs = require('fs');
const PART = +(process.argv[2] || 0), NP = +(process.argv[3] || 1);
(async () => {
  fs.mkdirSync(__dirname + '/strips', { recursive: true });
  const b = await puppeteer.launch({ headless: 'new', executablePath: '/root/.cache/puppeteer/chrome/linux-149.0.7827.22/chrome-linux64/chrome', args: ['--no-sandbox', '--allow-file-access-from-files', '--force-color-profile=srgb'] });
  const p = await b.newPage(); await p.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 / 3 });
  await p.goto('file://' + __dirname + '/stage.html', { waitUntil: 'load' });
  const S = await p.evaluate(() => window.__shots);
  for (const s of S) { if (s.i % NP !== PART) continue;
    const ts = [.12, .38, .64, .9].map(f => s.t0 + Math.min(s.dur * f, s.dur - .2));
    for (let k = 0; k < 4; k++) { await p.evaluate(t => __seek(t), ts[k]); await p.evaluate(() => __ready()); await p.evaluate(t => __seek(t), ts[k]);
      await p.screenshot({ path: `${__dirname}/strips/s${String(s.i + 1).padStart(2, '0')}_${k}.jpg`, type: 'jpeg', quality: 78 }); } }
  await b.close(); console.log('strips done', PART);
})();
