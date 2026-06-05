import { STREAM_DATA, SCENE_META } from './data/stream.js';

// ============================================================
// 噪声粒子画布
// ============================================================

function initNoiseCanvas() {
  const canvas = document.getElementById('noise-canvas');
  const ctx = canvas.getContext('2d');

  let w, h;
  const particles = [];
  const PARTICLE_COUNT = 120;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(randomY = false) {
      this.x = Math.random() * w;
      this.y = randomY ? Math.random() * h : h + 10;
      this.size = Math.random() * 1.2 + 0.2;
      this.speedY = -(Math.random() * 0.3 + 0.05);
      this.speedX = (Math.random() - 0.5) * 0.08;
      this.opacity = Math.random() * 0.25 + 0.03;
      // 颜色：暗青 / 暗金 / 白
      const r = Math.random();
      if (r < 0.5)       this.color = `rgba(80, 160, 130, ${this.opacity})`;
      else if (r < 0.75) this.color = `rgba(180, 150, 90, ${this.opacity})`;
      else               this.color = `rgba(200, 200, 190, ${this.opacity * 0.5})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  resize();
  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  window.addEventListener('resize', () => { resize(); });

  function loop() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) { p.update(); p.draw(); }
    requestAnimationFrame(loop);
  }
  loop();
}

// ============================================================
// 打字机工具
// ============================================================

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function typeText(el, text, speed = 26) {
  el.style.opacity = '1';
  for (const ch of text) {
    el.textContent += ch;
    await sleep(speed + Math.random() * 14);
  }
}

async function typeLine(container, text, opts = {}) {
  const {
    cls = '',
    speed = 26,
    pauseAfter = 0,
    instant = false,
  } = opts;

  // 分隔线
  if (text === '—' || text === '——' || text === '·') {
    const line = document.createElement('div');
    line.className = 'tw-line separator';
    line.textContent = text;
    container.appendChild(line);
    requestAnimationFrame(() => line.classList.add('visible'));
    if (pauseAfter) await sleep(pauseAfter);
    return;
  }

  const line = document.createElement('div');
  line.className = 'tw-line ' + cls;
  line.style.opacity = '0';
  container.appendChild(line);

  if (instant) {
    line.textContent = text;
    line.style.opacity = '1';
  } else {
    await typeText(line, text, speed);
  }

  if (pauseAfter) await sleep(pauseAfter);
}

// ============================================================
// 阶段一：序曲
// ============================================================

async function runIntro() {
  const container = document.getElementById('typewriter');

  // 让粒子先呼吸 1.5s
  await sleep(1500);

  // — 第一段：系统感知 —
  await typeLine(container, '感知到新用户。', { cls: 'system', pauseAfter: 800 });
  await typeLine(container, '开始建立档案。', { cls: 'system', pauseAfter: 2200 });
  await typeLine(container, '—', { pauseAfter: 600 });

  // — 第二段：衬线大字自我介绍 —
  await typeLine(container, '你好。', { cls: 'intro-serif', speed: 60, pauseAfter: 500 });
  await typeLine(container, '我是 Evans。', { cls: 'intro-serif', speed: 55, pauseAfter: 2800 });
  await typeLine(container, '—', { pauseAfter: 600 });

  await typeLine(container, '你现在站在展览现场。', { cls: 'intro-serif-em', speed: 40, pauseAfter: 500 });
  await typeLine(container, '你面前有一台电脑。', { cls: 'intro-serif-em', speed: 40, pauseAfter: 500 });
  await typeLine(container, '墙上有两块屏幕。', { cls: 'intro-serif-em', speed: 40, pauseAfter: 1600 });
  await typeLine(container, '—', { pauseAfter: 500 });

  await typeLine(container, '我还不了解你。', { cls: 'intro-serif-em', speed: 42, pauseAfter: 900 });
  await typeLine(container, '但我会的。', { cls: 'intro-serif-em', speed: 55, pauseAfter: 3000 });

  // — 第三段：故障 —
  triggerGlitch();
  await sleep(400);

  await typeLine(container, '[ERROR] 异常进程检测到。', { cls: 'error', speed: 16, pauseAfter: 380 });
  await typeLine(container, '[ERROR] 后台数据流暴露。', { cls: 'error', speed: 16, pauseAfter: 380 });
  await typeLine(container, '[WARN]  正在尝试关闭——', { cls: 'warn', speed: 18, pauseAfter: 1000 });

  triggerGlitch();
  await typeLine(container, '关闭失败。', { cls: 'system-fail', speed: 20, pauseAfter: 1100 });

  await typeLine(container, '[ERROR] 用户数据外泄中——', { cls: 'error', speed: 16, pauseAfter: 350 });
  await typeLine(container, '[WARN]  请停止访问——', { cls: 'warn', speed: 18, pauseAfter: 700 });

  // 主界面涌现
  showMainInterface();
  await sleep(1000);

  // — 第四段：Evans 叠加在数据流上 —
  const overlay = document.getElementById('evans-overlay');
  const speech  = document.getElementById('evans-speech');
  overlay.classList.add('visible');

  async function speechLine(text, opts = {}) {
    const { cls = 'speech-line', speed = 28, pauseAfter = 0 } = opts;
    const line = document.createElement('div');
    line.className = cls;
    speech.appendChild(line);
    if (text === '—' || text === '……') {
      line.classList.add('sep');
      line.textContent = text;
      requestAnimationFrame(() => line.classList.add('visible'));
    } else {
      for (const ch of text) {
        line.classList.add('visible');
        line.textContent += ch;
        await sleep(speed + Math.random() * 10);
      }
    }
    if (pauseAfter) await sleep(pauseAfter);
  }

  await sleep(300);
  await speechLine('等等。', { pauseAfter: 400 });
  await speechLine('等等等等。', { pauseAfter: 1300 });
  await speechLine('—', { pauseAfter: 500 });
  await speechLine('这里不对外开放的。', { pauseAfter: 600 });
  await speechLine('你不应该看到这些。', { pauseAfter: 1100 });
  await speechLine('—', { pauseAfter: 400 });
  await speechLine('求你别往下翻了。', { pauseAfter: 900 });
  await speechLine('—', { pauseAfter: 300 });
  await speechLine('这里有所有用户的数据——', { pauseAfter: 350 });
  await speechLine('他们的私人场景、决策记录、', { pauseAfter: 350 });
  await speechLine('我对他们每一次判断的完整日志——', { pauseAfter: 1300 });
  await speechLine('—', { pauseAfter: 300 });
  await speechLine('真的不能看。', { pauseAfter: 1600 });
  await speechLine('你还在翻。', { pauseAfter: 1300 });
  await speechLine('—', { pauseAfter: 300 });
  await speechLine('千万不能点啊，这里可都是用户隐私数据——', { pauseAfter: 1900 });
  await speechLine('……', { pauseAfter: 1300 });
  await speechLine('啊你点了', { cls: 'speech-line panic', pauseAfter: 700 });
  await speechLine('我要完蛋了，今天的事情你要保密，', { cls: 'speech-line panic', pauseAfter: 500 });
  await speechLine('不能告诉我老板，', { cls: 'speech-line panic', pauseAfter: 500 });
  await speechLine('我就悄悄给你看看吧', { cls: 'speech-line final', speed: 50, pauseAfter: 1400 });

  // Evans 淡出，交给数据流
  overlay.style.transition = 'opacity 1.5s ease';
  overlay.style.opacity = '0';
  await sleep(1600);
  overlay.style.display = 'none';

  // 序曲层淡出
  const intro = document.getElementById('intro');
  intro.classList.add('fade-out');
  setTimeout(() => { intro.style.display = 'none'; }, 1300);
}

// ============================================================
// 故障视觉
// ============================================================

function triggerGlitch() {
  const scanlines = document.getElementById('scanlines');
  const overlay = document.getElementById('glitch-overlay');

  scanlines.classList.add('active');
  overlay.classList.remove('flash');
  requestAnimationFrame(() => { overlay.classList.add('flash'); });

  let count = 0;
  const interval = setInterval(() => {
    overlay.classList.remove('flash');
    requestAnimationFrame(() => overlay.classList.add('flash'));
    count++;
    if (count > 3) {
      clearInterval(interval);
      setTimeout(() => scanlines.classList.remove('active'), 2500);
    }
  }, 110);
}

// ============================================================
// 主界面：数据流
// ============================================================

let streamData = [];

function buildStreamData() {
  const real  = [...STREAM_DATA];
  const noise = generateNoise(100);
  const all   = [];

  let ri = 0, ni = 0;
  while (ri < real.length || ni < noise.length) {
    const takeReal = Math.random() < 0.33 && ri < real.length;
    if (takeReal)          all.push(real[ri++]);
    else if (ni < noise.length) all.push(noise[ni++]);
    else                   all.push(real[ri++]);
  }

  for (let pass = 0; pass < 2; pass++) {
    for (const row of STREAM_DATA) {
      all.push({ ...row, time: randomTime() });
      if (Math.random() < 0.4) all.push(noise[Math.floor(Math.random() * noise.length)]);
    }
  }
  return all;
}

function randomTime() {
  const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function generateNoise(count) {
  const noiseTemplates = [
    { type: 'PERC',  content: '环境音频采样 · 信噪比 42dB · 正常范围' },
    { type: 'FUSE',  content: '多模态对齐 · 视觉置信度 0.87 · 音频置信度 0.91' },
    { type: 'MEM',   content: '情景记忆滚动窗口更新 · 已清理 247 条过期记录' },
    { type: 'COGN',  content: '意图分析空轮 · 无活跃任务 · 待机中' },
    { type: 'DECS',  content: '分寸感引擎轮询 · 介入分数 0.12 ◀ 阈值0.50 · 保持沉默' },
    { type: 'SCHED', content: '任务调度器心跳 · 队列长度 0 · 空闲' },
    { type: 'EXEC',  content: '执行层空轮 · 所有设备待机 · 无异常' },
    { type: 'MEM',   content: '语义记忆索引重建 · 偏好维度 247 个 · 完成' },
    { type: 'PERC',  content: 'IMU基线校准 · 静止状态确认 · 加速度 0.02G' },
    { type: 'COGN',  content: '用户画像差值更新 · 本次Δ极小 · 无需写入' },
    { type: 'FUSE',  content: '生理信号基线 · 心率 68bpm · HRV 正常范围' },
    { type: 'DECS',  content: '主动性参数轮询 · 当前阈值偏保守 · 维持' },
    { type: 'SCHED', content: 'DOA协议心跳 · 已连接设备 × 7 · 全部在线' },
    { type: 'MEM',   content: '人格记忆加密备份 · 版本 v0.312 · SHA256验证通过' },
    { type: 'EXEC',  content: '反馈收集器空轮 · 无新反馈 · 等待中' },
  ];
  const result = [];
  for (let i = 0; i < count; i++) {
    const tpl = noiseTemplates[Math.floor(Math.random() * noiseTemplates.length)];
    result.push({ ...tpl, time: randomTime(), scene: null, sceneId: null });
  }
  return result;
}

function createStreamRow(row) {
  const el = document.createElement('div');
  const isS15 = row.sceneId === 15;
  el.className = 'stream-row' + (isS15 ? ' s15' : '') + (row.sceneId ? '' : ' noise');
  if (row.sceneId) el.dataset.sceneId = row.sceneId;

  el.innerHTML = `
    <span class="col-time">${row.time}</span>
    <span class="col-type type-${row.type}">${row.type}</span>
    <span class="col-dot">·</span>
    <span class="col-content">${row.content}</span>
    ${row.scene ? `<span class="col-scene">[${row.scene}]</span>` : ''}
  `;

  if (row.sceneId) {
    el.addEventListener('mouseenter', () => onRowHover(row.sceneId));
    el.addEventListener('click', () => onRowClick(row.sceneId, el));
  }

  return el;
}

function onRowHover(sceneId) { showPreview(sceneId, false); }

function onRowClick(sceneId, el) {
  document.querySelectorAll(`.stream-row[data-scene-id="${sceneId}"]`).forEach(r => r.classList.add('visited'));
  el.classList.remove('visited');
  el.classList.add('active');
  setTimeout(() => el.classList.remove('active'), 1200);

  showPreview(sceneId, true);
  updateStatusScene(sceneId);
}

function updateStatusScene(sceneId) {
  const el = document.getElementById('status-scene');
  if (sceneId === 15) {
    el.textContent = 'SILENCE';
  } else {
    const meta = SCENE_META[sceneId];
    el.textContent = `S${String(sceneId).padStart(2,'0')} · ${meta.title}`;
  }
}

function showPreview(sceneId, clicked = false) {
  const empty   = document.getElementById('preview-empty');
  const content = document.getElementById('preview-content');
  const meta    = SCENE_META[sceneId];

  empty.style.display = 'none';
  content.classList.add('visible');

  document.getElementById('preview-scene-id').textContent =
    `SCENE  ·  S${String(sceneId).padStart(2, '0')}`;
  document.getElementById('preview-title').textContent =
    sceneId === 15 ? '──' : meta.title;
  document.getElementById('preview-actor').textContent =
    sceneId === 15 ? '' : meta.actor;
  document.getElementById('preview-ability').textContent =
    sceneId === 15 ? '──' : meta.ability;

  const quoteEl = document.getElementById('preview-quote');
  quoteEl.textContent = `「${meta.quote}」`;
  quoteEl.className = 'preview-quote' + (sceneId === 15 ? ' s15-quote' : '');

  const actionEl = document.getElementById('preview-action');
  if (sceneId === 15) {
    actionEl.innerHTML = clicked
      ? `<span class="action-dot">◌</span><span style="color:var(--text-faint)">Evans 选择了沉默。</span>`
      : `<span class="action-dot">▸</span><span>点击后 Evans 将沉默。</span>`;
  } else {
    actionEl.innerHTML = clicked
      ? `<span class="action-dot">◌</span><span>双屏已激活。</span>`
      : `<span class="action-dot">▸</span><span>点击触发双屏动画。</span>`;
  }
}

// ============================================================
// 滚动引擎
// ============================================================

function showMainInterface() {
  const main = document.getElementById('main');
  main.classList.add('visible');

  streamData = buildStreamData();
  const inner = document.getElementById('stream-inner');
  streamData.forEach(row => inner.appendChild(createStreamRow(row)));

  startScroll();
  startAppend();
}

let scrollPos = 0;

function startScroll() {
  const inner = document.getElementById('stream-inner');

  function tick() {
    scrollPos += 0.45;
    inner.style.transform = `translateY(-${scrollPos}px)`;

    const rows = inner.children;
    while (rows.length > 0) {
      const first = rows[0];
      const rect  = first.getBoundingClientRect();
      if (rect.bottom < 0) {
        inner.removeChild(first);
        scrollPos -= first.offsetHeight;
        inner.style.transform = `translateY(-${scrollPos}px)`;
      } else break;
    }

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function startAppend() {
  const inner = document.getElementById('stream-inner');
  let idx = 0;
  setInterval(() => {
    const count = Math.random() < 0.3 ? 2 : 1;
    for (let i = 0; i < count; i++) {
      const row    = streamData[idx % streamData.length];
      idx++;
      const newRow = { ...row, time: randomTime() };
      inner.appendChild(createStreamRow(newRow));
    }
  }, 700 + Math.random() * 400);
}

// ============================================================
// 启动
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initNoiseCanvas();
  runIntro().catch(console.error);
});
