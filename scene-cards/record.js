const puppeteer = require('puppeteer');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 7799;
const DURATION = 4;
const FPS = 30;
const WIDTH = 1920;
const HEIGHT = 1080;
const OUT_DIR = '/tmp/scene_cards';
const FRAMES_DIR = '/tmp/scene_card_frames';

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function recordScene(index) {
  const name = `scene-card-${String(index+1).padStart(2,'0')}`;
  const frameDir = path.join(FRAMES_DIR, name);
  if (fs.existsSync(frameDir)) fs.rmSync(frameDir, { recursive: true });
  fs.mkdirSync(frameDir, { recursive: true });

  const url = `http://localhost:${PORT}/scene-cards/index.html`;
  console.log(`\n[${name}] Recording...`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox','--disable-web-security','--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });

  await page.evaluateOnNewDocument(() => {
    document.addEventListener('DOMContentLoaded', () => {
      document.documentElement.style.background = 'transparent';
      document.body.style.background = 'transparent';
    });
  });

  await page.goto(url, { waitUntil: 'networkidle0' });

  // 切换到对应场景
  await page.evaluate((i) => {
    document.documentElement.style.background = 'transparent';
    document.body.style.background = 'transparent';
    window._renderScene(window._scenes[i]);
  }, index);

  // 等待动画开始
  await new Promise(r => setTimeout(r, 200));

  const totalFrames = DURATION * FPS;
  const frameInterval = 1000 / FPS;

  for (let i = 0; i < totalFrames; i++) {
    const framePath = path.join(frameDir, `frame_${String(i).padStart(5,'0')}.png`);
    await page.screenshot({ path: framePath, type: 'png', omitBackground: true });
    await new Promise(r => setTimeout(r, frameInterval));
  }

  await browser.close();

  const outFile = path.join(OUT_DIR, `${name}.webm`);
  execSync(
    `ffmpeg -y -framerate ${FPS} -i "${frameDir}/frame_%05d.png" -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 15 -auto-alt-ref 0 "${outFile}"`,
    { stdio: 'inherit' }
  );

  fs.rmSync(frameDir, { recursive: true });
  console.log(`[${name}] ✓`);
}

(async () => {
  for (let i = 0; i < 12; i++) {
    await recordScene(i);
  }
  console.log('\n✅ 全部完成 →', OUT_DIR);
})();
