import { STREAM_DATA } from './data/stream.js';
import * as THREE from 'three';

// ============================================================
// 全局状态
// ============================================================

const avatarState = { intensity: 0, glitching: false, glitchTime: 0 };

// ============================================================
// 阶段一：3D 粒子球
// 极点双峰分布（两端密 · 中间疏）+ 切向旋流 + 散落粒子云
// ============================================================

function initAvatar() {
  const canvas = document.getElementById('avatar-canvas');

  // 全屏 canvas — 宽高跟随视口
  const cssW = window.innerWidth;
  const cssH = window.innerHeight;
  const DPR  = Math.min(window.devicePixelRatio, 2);
  const PX_W = Math.round(cssW * DPR);
  const PX_H = Math.round(cssH * DPR);
  canvas.style.width   = cssW + 'px';
  canvas.style.height  = cssH + 'px';
  canvas.style.background = '#050507';
  canvas.width  = PX_W;
  canvas.height = PX_H;

  const FOV    = 55;
  const aspect = cssW / cssH;
  const SK     = (PX_H * 0.5) / Math.tan(FOV * 0.5 * Math.PI / 180);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, aspect, 0.1, 200);
  camera.position.set(0, 0.35, 7.4);
  camera.lookAt(0, 0.35, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false });
  renderer.setSize(PX_W, PX_H, false);
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x050507, 1);

  function makeTex(res, stops) {
    const c = document.createElement('canvas');
    c.width = c.height = res;
    const g = c.getContext('2d').createRadialGradient(res/2, res/2, 0, res/2, res/2, res/2);
    stops.forEach(([t, a]) => g.addColorStop(t, `rgba(255,255,255,${a})`));
    c.getContext('2d').fillStyle = g;
    c.getContext('2d').fillRect(0, 0, res, res);
    return new THREE.CanvasTexture(c);
  }
  const ptTex = makeTex(64, [[0,1],[0.06,0.98],[0.18,0.40],[0.42,0.05],[1,0]]);

  // ── 3D 粒子球：两极密赤道疏 + 径向毛刺感 ─────────────────
  const N_CORE  = 42000;
  const CORE_R  = 1.65;
  const corePos   = new Float32Array(N_CORE * 3);
  const corePhase = new Float32Array(N_CORE);
  const coreSz    = new Float32Array(N_CORE);
  const coreHair  = new Float32Array(N_CORE);  // 0=球面最亮 1=径向尖端最淡
  const coreLat   = new Float32Array(N_CORE);  // 0=赤道 1=极点

  for (let i = 0; i < N_CORE; i++) {
    const theta = Math.random() * Math.PI * 2;
    const m     = 2 * Math.random() - 1;
    const cosP  = Math.sign(m) * Math.pow(Math.abs(m), 0.38);  // 两极密
    const sinP  = Math.sqrt(Math.max(0, 1 - cosP * cosP));
    const nx = sinP * Math.cos(theta);
    const ny = cosP;
    const nz = sinP * Math.sin(theta);

    // 沿法线径向分布 → 球面毛刺/触须
    const offset = (Math.random() - 0.32) * 0.42 * CORE_R;
    const r      = CORE_R + offset;
    corePos[i*3+0] = nx * r;
    corePos[i*3+1] = ny * r;
    corePos[i*3+2] = nz * r;
    corePhase[i]   = Math.random() * Math.PI * 2;
    coreHair[i]    = Math.min(1.0, Math.abs(offset) / (0.42 * CORE_R));
    coreLat[i]     = Math.abs(cosP);

    const poleBoost = 0.55 + 0.45 * Math.pow(Math.abs(cosP), 0.45);
    coreSz[i] = (0.018 + Math.random() * 0.014) * poleBoost
              + (Math.random() < 0.04 ? 0.010 : 0.0);
  }

  const coreGeo = new THREE.BufferGeometry();
  coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos,   3));
  coreGeo.setAttribute('aPhase',   new THREE.BufferAttribute(corePhase, 1));
  coreGeo.setAttribute('aSize',    new THREE.BufferAttribute(coreSz,    1));
  coreGeo.setAttribute('aHair',    new THREE.BufferAttribute(coreHair,   1));
  coreGeo.setAttribute('aLat',     new THREE.BufferAttribute(coreLat,    1));

  const coreVert = /* glsl */`
    attribute float aPhase;
    attribute float aSize;
    attribute float aHair;
    attribute float aLat;
    uniform float uTime;
    uniform float uSpeak;
    uniform float uGlitch;
    uniform float uSK;
    varying float vA;

    void main() {
      vec3 dir = normalize(position + vec3(0.0001));

      float breathe = 1.0 + sin(uTime * 0.20) * 0.028;
      float wave = sin(dir.x * 2.2 + uTime * 0.16)
                 * sin(dir.y * 2.0 + uTime * 0.14) * 0.022;
      float pulse = uSpeak * 0.16 * sin(uTime * 1.7 + aPhase * 5.0);

      float seed   = fract(sin(aPhase * 127.1) * 43758.5);
      float jitter = uGlitch * (seed - 0.5) * 0.65;

      vec3 p = position * (breathe + wave) + dir * (pulse + jitter);

      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position  = projectionMatrix * mv;

      float szMul = 1.0 + (1.0 - aHair) * 0.7 + aLat * 0.35;
      gl_PointSize = aSize * szMul * uSK / -mv.z;

      // 球面最亮，径向尖端渐淡；两极更亮
      float surfGlow = pow(1.0 - aHair, 0.42);
      float poleGlow = 0.55 + aLat * 0.55;
      float twinkle  = 0.95 + 0.05 * sin(uTime * 0.50 + aPhase * 9.0);
      vA = (0.20 + surfGlow * 1.20) * poleGlow * twinkle * (1.0 + uSpeak * 0.35);
    }
  `;

  const coreFrag = /* glsl */`
    uniform sampler2D uTex;
    varying float vA;
    void main() {
      vec4 t = texture2D(uTex, gl_PointCoord);
      if (t.a < 0.01) discard;
      gl_FragColor = vec4(1.0, 1.0, 1.0, t.a * vA);
    }
  `;

  const coreUni = {
    uTime:{value:0}, uSpeak:{value:0}, uGlitch:{value:0},
    uSK:{value:SK}, uTex:{value:ptTex},
  };
  const coreMat = new THREE.ShaderMaterial({
    uniforms: coreUni, vertexShader: coreVert, fragmentShader: coreFrag,
    blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
  });
  const corePts = new THREE.Points(coreGeo, coreMat);
  // 球居中偏上，下方留给流动沙丘
  corePts.position.y = 0.8;
  scene.add(corePts);

  // ── 地面粒子（起伏丘陵 + 橙色余烬）──────────────────────
  const N_GND  = 70000;
  const gndPos   = new Float32Array(N_GND * 3);
  const gndPhase = new Float32Array(N_GND);
  const gndSz    = new Float32Array(N_GND);

  // 起伏地形高度场：更密的多频正弦，整体幅度更小
  function terrain(x, z) {
    return Math.sin(x * 0.75 + 1.3) * 0.32
         + Math.sin(z * 0.9 - 0.6) * 0.26
         + Math.sin((x + z) * 0.6) * 0.18
         + Math.sin(x * 1.7 + z * 1.1) * 0.10;
  }

  for (let i = 0; i < N_GND; i++) {
    const x = (Math.random() - 0.5) * 24;
    const z = Math.random() * 11 - 4;  // z: -4 to 7
    gndPos[i*3+0] = x;
    gndPos[i*3+1] = -1.7 + terrain(x, z) + (Math.random() - 0.5) * 0.10;
    gndPos[i*3+2] = z;
    gndPhase[i]   = Math.random() * Math.PI * 2;
    gndSz[i] = Math.random() < 0.05
      ? 0.038 + Math.random() * 0.024
      : 0.013 + Math.random() * 0.016;
  }

  const gndGeo = new THREE.BufferGeometry();
  gndGeo.setAttribute('position', new THREE.BufferAttribute(gndPos,   3));
  gndGeo.setAttribute('aPhase',   new THREE.BufferAttribute(gndPhase, 1));
  gndGeo.setAttribute('aSize',    new THREE.BufferAttribute(gndSz,    1));

  const gndVert = /* glsl */`
    attribute float aPhase;
    attribute float aSize;
    uniform float uTime;
    uniform float uSK;
    uniform float uSpeak;
    varying float vA;
    varying float vWarm;
    void main() {
      // 流动沙丘：更密的多向行波，幅度更小
      float wave = sin(position.x * 1.0 + uTime * 0.6) * 0.09
                 + sin(position.z * 1.2 - uTime * 0.45) * 0.07
                 + sin((position.x + position.z) * 0.8 + uTime * 0.3) * 0.05;
      float drift = sin(uTime * 0.14 + aPhase * 6.28) * 0.03;
      vec3 p = position + vec3(0.0, wave + drift, 0.0);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position  = projectionMatrix * mv;
      gl_PointSize = aSize * (1.0 + uSpeak * 0.3) * uSK / -mv.z;
      float twinkle = 0.5 + 0.5 * sin(uTime * 1.1 + aPhase * 9.0);
      vA = (0.30 + twinkle * 0.32);
      // 约 55% 为暖橙余烬，其余为冷灰尘
      vWarm = step(0.45, fract(sin(aPhase * 91.7) * 23741.3));
    }
  `;

  const gndFrag = /* glsl */`
    uniform sampler2D uTex;
    varying float vA;
    varying float vWarm;
    void main() {
      vec4 t = texture2D(uTex, gl_PointCoord);
      if (t.a < 0.01) discard;
      vec3 warm = vec3(0.70, 0.30, 0.07);  // 橙色余烬（暗）
      vec3 cool = vec3(0.36, 0.36, 0.40);  // 灰白尘埃（暗）
      vec3 col  = mix(cool, warm, vWarm);
      gl_FragColor = vec4(col, t.a * vA);
    }
  `;

  const gndUni = { uTime:{value:0}, uSK:{value:SK}, uSpeak:{value:0}, uTex:{value:ptTex} };
  const gndMat = new THREE.ShaderMaterial({
    uniforms: gndUni, vertexShader: gndVert, fragmentShader: gndFrag,
    blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
  });
  const gndPts = new THREE.Points(gndGeo, gndMat);
  scene.add(gndPts);

  // ── 动画循环 ─────────────────────────────────────────────
  const clock = new THREE.Clock();
  function tick() {
    requestAnimationFrame(tick);
    const dt = clock.getDelta();
    const t  = clock.elapsedTime;

    avatarState.intensity = Math.max(0, avatarState.intensity - dt * 0.78);
    const spk = avatarState.intensity;

    if (avatarState.glitching) avatarState.glitchTime = Math.min(1, avatarState.glitchTime + dt * 4);
    else                        avatarState.glitchTime = Math.max(0, avatarState.glitchTime - dt * 3);
    const gl = avatarState.glitchTime;

    coreUni.uTime.value   = t;
    coreUni.uSpeak.value  = spk;
    coreUni.uGlitch.value = gl;
    gndUni.uTime.value    = t;
    gndUni.uSpeak.value   = spk;

    // 球体极慢自转
    corePts.rotation.y += dt * (0.04 + spk * 0.10);
    corePts.rotation.x  = 0.035 * Math.sin(t * 0.16);

    // 镜头轻微漂移（环的涡旋已在 shader 内流动，无需整体自转）
    camera.position.x = Math.sin(t * 0.07) * 0.12;
    camera.position.y = 0.35 + Math.sin(t * 0.11) * 0.06;
    camera.lookAt(0, 0.35, 0);

    renderer.render(scene, camera);
  }
  tick();
}


// ============================================================
// 工具：打字机（第一字符出现时才显现）
// ============================================================

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function typeText(el, text, speed = 38) {
  for (let i = 0; i < text.length; i++) {
    if (i === 0) el.style.opacity = '1'; // 第一字出现 → 行立刻可见
    el.textContent += text[i];
    await sleep(speed + Math.random() * 18);
  }
}

// ============================================================
// 阶段一：序曲（逐行替换，不保留前一行）
// ============================================================

async function runIntro() {
  const tw = document.getElementById('typewriter');
  let cur  = null; // 当前显示的行

  async function show(text, opts = {}) {
    const { cls = 'intro-line', speed = 40, hold = 1300 } = opts;

    // 淡出并移除前一行
    if (cur) {
      cur.style.transition = 'opacity 0.38s ease';
      cur.style.opacity    = '0';
      await sleep(420);
      cur.remove();
      cur = null;
    }

    if (text === null) return; // 仅移除，不新建

    const line = document.createElement('div');
    line.className = cls;
    line.style.opacity = '0';
    tw.appendChild(line);
    cur = line;

    avatarState.intensity = Math.min(1, avatarState.intensity + 0.78);
    await typeText(line, text, speed);
    await sleep(hold);
  }

  await sleep(1000);

  // ── 系统感知 ──
  await show('感知到新用户。',     { cls:'intro-line system', speed:22, hold:900  });
  await show('开始建立档案。',     { cls:'intro-line system', speed:22, hold:1100 });

  // ── 自我介绍 ──
  await show('你好。',             { cls:'intro-line serif',    speed:65, hold:700  });
  await show('我是 Evans。',       { cls:'intro-line serif',    speed:55, hold:2200 });
  await show('你现在站在展览现场。', { cls:'intro-line serif-em', speed:40, hold:900 });
  await show('你面前有一台电脑。',  { cls:'intro-line serif-em', speed:40, hold:900 });
  await show('墙上有两块屏幕。',   { cls:'intro-line serif-em', speed:40, hold:1500 });
  await show('我还不了解你。',     { cls:'intro-line serif-em', speed:44, hold:1000 });
  await show('但我会的。',         { cls:'intro-line serif',    speed:58, hold:2500 });

  // ── 故障 ──
  triggerGlitch();
  await sleep(380);
  await show('[ERROR] 异常进程检测到。',  { cls:'intro-line error', speed:16, hold:480 });
  await show('[ERROR] 后台数据流暴露。',  { cls:'intro-line error', speed:16, hold:480 });
  await show('[WARN]  正在尝试关闭——',   { cls:'intro-line warn',  speed:18, hold:900 });
  triggerGlitch();
  await show('关闭失败。',               { cls:'intro-line system-fail', speed:20, hold:800 });
  await show('[WARN]  请停止访问——',     { cls:'intro-line warn',  speed:18, hold:680 });
  await show(null); // 淡出最后一行

  // ── 进入阶段二 ──
  enterStage2();
  await sleep(800);

  // Evans 在代码流上的对话（保留逐行积累，与 Stage 1 区分）
  const overlay = document.getElementById('evans-overlay');
  const speech  = document.getElementById('evans-speech');
  overlay.classList.add('visible');

  async function speechLine(text, opts = {}) {
    const { cls = 'speech-line', speed = 30, pauseAfter = 0 } = opts;
    const line = document.createElement('div');
    line.className = cls;
    line.style.opacity = '0';
    speech.appendChild(line);
    if (text === '—' || text === '……') {
      line.style.opacity = '1';
      line.textContent = text;
    } else {
      avatarState.intensity = Math.min(1, avatarState.intensity + 0.52);
      await typeText(line, text, speed);
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
  await speechLine('我就悄悄给你看看吧', { cls: 'speech-line final', speed: 55, pauseAfter: 1400 });

  overlay.style.transition = 'opacity 1.5s ease';
  overlay.style.opacity    = '0';
  await sleep(1600);
  overlay.style.display    = 'none';

  // 展览循环：等待 12s 后淡回 Stage 1，重新开始
  await sleep(12000);
  await restartIntro();
}

// ============================================================
// 故障视觉
// ============================================================

function triggerGlitch() {
  const scanlines = document.getElementById('scanlines');
  const glitchEl  = document.getElementById('glitch-overlay');
  scanlines.classList.add('active');
  glitchEl.classList.remove('flash');
  requestAnimationFrame(() => glitchEl.classList.add('flash'));
  avatarState.glitching = true;
  avatarState.glitchTime = 0;
  avatarState.intensity  = 1;
  let n = 0;
  const iv = setInterval(() => {
    glitchEl.classList.remove('flash');
    requestAnimationFrame(() => glitchEl.classList.add('flash'));
    if (++n > 4) {
      clearInterval(iv);
      setTimeout(() => scanlines.classList.remove('active'), 2500);
      avatarState.glitching = false;
    }
  }, 110);
}

// ============================================================
// 进入阶段二
// ============================================================

function enterStage2() {
  buildStream();
  document.getElementById('stage2').classList.add('visible');
  const s1 = document.getElementById('stage1');
  s1.classList.add('fade-out');
  setTimeout(() => { s1.style.display = 'none'; }, 1500);
}

// ============================================================
// 代码流（Stage 2）
// ============================================================

let streamData = [];

function buildStream() {
  streamData = buildStreamData();
  const inner = document.getElementById('stream-inner');
  streamData.forEach(row => inner.appendChild(createStreamRow(row)));
  startScroll();
  startAppend();
}

function buildStreamData() {
  const real = [...STREAM_DATA];
  const noise = generateNoise(100);
  const all = [];
  let ri = 0, ni = 0;
  while (ri < real.length || ni < noise.length) {
    const takeReal = Math.random() < 0.33 && ri < real.length;
    if (takeReal)               all.push(real[ri++]);
    else if (ni < noise.length) all.push(noise[ni++]);
    else                        all.push(real[ri++]);
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
  return [Math.floor(Math.random()*24), Math.floor(Math.random()*60), Math.floor(Math.random()*60)]
    .map(n => String(n).padStart(2,'0')).join(':');
}

function generateNoise(count) {
  const tpls = [
    { type:'PERC',  content:'环境音频采样 · 信噪比 42dB · 正常范围' },
    { type:'FUSE',  content:'多模态对齐 · 视觉置信度 0.87 · 音频置信度 0.91' },
    { type:'MEM',   content:'情景记忆滚动窗口更新 · 已清理 247 条过期记录' },
    { type:'COGN',  content:'意图分析空轮 · 无活跃任务 · 待机中' },
    { type:'DECS',  content:'分寸感引擎轮询 · 介入分数 0.12 ◀ 阈值0.50 · 保持沉默' },
    { type:'SCHED', content:'任务调度器心跳 · 队列长度 0 · 空闲' },
    { type:'EXEC',  content:'执行层空轮 · 所有设备待机 · 无异常' },
    { type:'MEM',   content:'语义记忆索引重建 · 偏好维度 247 个 · 完成' },
    { type:'PERC',  content:'IMU基线校准 · 静止状态确认 · 加速度 0.02G' },
    { type:'COGN',  content:'用户画像差值更新 · 本次Δ极小 · 无需写入' },
    { type:'FUSE',  content:'生理信号基线 · 心率 68bpm · HRV 正常范围' },
    { type:'DECS',  content:'主动性参数轮询 · 当前阈值偏保守 · 维持' },
    { type:'SCHED', content:'DOA协议心跳 · 已连接设备 × 7 · 全部在线' },
    { type:'MEM',   content:'人格记忆加密备份 · 版本 v0.312 · SHA256验证通过' },
    { type:'EXEC',  content:'反馈收集器空轮 · 无新反馈 · 等待中' },
  ];
  return Array.from({ length: count }, () => ({
    ...tpls[Math.floor(Math.random() * tpls.length)],
    time: randomTime(), scene: null, sceneId: null,
  }));
}

function createStreamRow(row) {
  const el = document.createElement('div');
  el.className = 'stream-row' + (row.sceneId === 15 ? ' s15' : '') + (row.sceneId ? '' : ' noise');
  if (row.sceneId) el.dataset.sceneId = row.sceneId;
  el.innerHTML = `
    <span class="col-time">${row.time}</span>
    <span class="col-type type-${row.type}">${row.type}</span>
    <span class="col-dot">·</span>
    <span class="col-content">${row.content}</span>
    ${row.scene ? `<span class="col-scene">[${row.scene}]</span>` : ''}
  `;
  return el;
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
      if (first.getBoundingClientRect().bottom < 0) {
        inner.removeChild(first);
        scrollPos -= first.offsetHeight;
        inner.style.transform = `translateY(-${scrollPos}px)`;
      } else break;
    }
    if (rows.length === 0) { scrollPos = 0; inner.style.transform = ''; }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function startAppend() {
  const inner = document.getElementById('stream-inner');
  let idx = 0;
  setInterval(() => {
    const n = Math.random() < 0.3 ? 3 : 2;
    for (let i = 0; i < n; i++) {
      inner.appendChild(createStreamRow({ ...streamData[idx % streamData.length], time: randomTime() }));
      idx++;
    }
  }, 320 + Math.random() * 200);
}

// ============================================================
// 展览循环重置
// ============================================================

async function restartIntro() {
  // 淡出 Stage 2
  const s2 = document.getElementById('stage2');
  s2.style.transition = 'opacity 1.8s ease';
  s2.style.opacity    = '0';
  await sleep(2000);
  s2.classList.remove('visible');
  s2.style.opacity    = '';

  // 重置 Stage 1
  const s1 = document.getElementById('stage1');
  s1.style.display = 'flex';
  s1.style.opacity = '0';
  s1.classList.remove('fade-out');
  s1.style.transition = 'opacity 1.5s ease';
  document.getElementById('typewriter').innerHTML = '';

  // 重置 Evans overlay
  const overlay = document.getElementById('evans-overlay');
  overlay.style.display    = '';
  overlay.style.opacity    = '0';
  overlay.style.transition = '';
  overlay.classList.remove('visible');
  document.getElementById('evans-speech').innerHTML = '';

  await sleep(200);
  s1.style.opacity = '1';
  await sleep(1600);
  s1.style.opacity    = '';
  s1.style.transition = '';

  await runIntro();
}

// ============================================================
// 启动
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initAvatar();
  runIntro().catch(console.error);
});
