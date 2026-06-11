const puppeteer = require('puppeteer');
const fs = require('fs');

const OUT = '/tmp/scene_previews';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto('http://localhost:7799/scene-cards/index.html', { waitUntil: 'networkidle0' });

  for (let i = 0; i < 12; i++) {
    await page.evaluate((idx) => {
      window._renderScene(window._scenes[idx]);
    }, i);
    await new Promise(r => setTimeout(r, 1600)); // wait for animation
    const num = String(i+1).padStart(2,'0');
    await page.screenshot({ path: `${OUT}/scene-${num}.png` });
    console.log(`scene-${num} done`);
  }

  await browser.close();
  console.log('✅ all done');
})();
