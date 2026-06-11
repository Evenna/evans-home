const puppeteer = require('puppeteer');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 7799;
const DURATION = 6;
const FPS = 30;
const WIDTH = 800;
const HEIGHT = 500;
const OUT_DIR = '/tmp/overlay_alpha';
const FRAMES_DIR = '/tmp/overlay_frames';

const FILES = [
  { html: 'ui2/ui-char-chenjianguo.html', name: 'char-chenjianguo' },
  { html: 'ui2/ui-char-liming.html',      name: 'char-liming' },
  { html: 'ui2/ui-screen-capsule.html',   name: 'screen-capsule' },
  { html: 'ui2/ui-screen-dispatch.html',  name: 'screen-dispatch' },
  { html: 'ui2/ui-screen-filter.html',    name: 'screen-filter' },
  { html: 'ui2/ui-screen-fraud.html',     name: 'screen-fraud' },
  { html: 'ui2/ui-screen-home.html',      name: 'screen-home' },
  { html: 'ui2/ui-screen-options.html',   name: 'screen-options' },
  { html: 'ui2/ui-screen-translate.html', name: 'screen-translate' },
  { html: 'ui2/ui-silence.html',          name: 'brooch-silent' },
  { html: 'ui2/ui-specs.html',            name: 'specs' },
  { html: 'ui2/ui-waveform.html',         name: 'waveform' },
  { html: 'ui2/ui-chapter-title.html',    name: 'chapter-title' },
  { html: 'ui2/ui-endcard.html',          name: 'endcard' },
  { html: 'ui/ui-a.html',  name: 'ui-a' },
  { html: 'ui/ui-b.html',  name: 'ui-b' },
  { html: 'ui/ui-c.html',  name: 'ui-c' },
  { html: 'ui/ui-d.html',  name: 'ui-d' },
  { html: 'ui/ui-e.html',  name: 'ui-e' },
  { html: 'ui/ui-f.html',  name: 'ui-f' },
  { html: 'ui/ui-g.html',  name: 'ui-g' },
  { html: 'ui/ui-h.html',  name: 'ui-h' },
  { html: 'ui/ui-i.html',  name: 'ui-i' },
  { html: 'ui/ui-j.html',  name: 'ui-j' },
  { html: 'ui/ui-k.html',  name: 'ui-k' },
  { html: 'ui/ui-l.html',  name: 'ui-l' },
];

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function recordOne({ html, name }) {
  const frameDir = path.join(FRAMES_DIR, name);
  if (fs.existsSync(frameDir)) fs.rmSync(frameDir, { recursive: true });
  fs.mkdirSync(frameDir, { recursive: true });

  const url = `http://localhost:${PORT}/${html}`;
  console.log(`\n[${name}] → ${url}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security', '--disable-gpu'],
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
  await page.evaluate(() => {
    document.documentElement.style.background = 'transparent';
    document.body.style.background = 'transparent';
  });

  await new Promise(r => setTimeout(r, 500));

  const totalFrames = DURATION * FPS;
  const frameInterval = 1000 / FPS;

  for (let i = 0; i < totalFrames; i++) {
    const framePath = path.join(frameDir, `frame_${String(i).padStart(5, '0')}.png`);
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
  console.log(`[${name}] ✓ ${outFile}`);
}

(async () => {
  for (const f of FILES) {
    try {
      await recordOne(f);
    } catch (e) {
      console.error(`[${f.name}] ERROR:`, e.message);
    }
  }
  console.log('\n✅ All done →', OUT_DIR);
})();
