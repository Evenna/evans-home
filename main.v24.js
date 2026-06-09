import * as THREE from './vendor/three.module.js';

// ============================================================
// 全局状态
// ============================================================

const avatarState = { intensity: 0, glitching: false, glitchTime: 0 };

// ============================================================
// 阶段一：3D 粒子球
// 蓝白青能量球 · 强光晕 · 放射火花 · 多层结构
// ============================================================

function initAvatar() {
  const canvas = document.getElementById('avatar-canvas');

  const cssW = window.innerWidth;
  const cssH = window.innerHeight;
  const DPR  = Math.min(window.devicePixelRatio, 2);
  const PX_W = Math.round(cssW * DPR);
  const PX_H = Math.round(cssH * DPR);
  canvas.style.width   = cssW + 'px';
  canvas.style.height  = cssH + 'px';
  canvas.style.background = '#07080c';
  canvas.width  = PX_W;
  canvas.height = PX_H;

  const FOV    = 52;
  const aspect = cssW / cssH;
  const SK     = (PX_H * 0.5) / Math.tan(FOV * 0.5 * Math.PI / 180);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, aspect, 0.1, 200);
  camera.position.set(0, 0.2, 7.8);
  camera.lookAt(0, 0.2, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false });
  renderer.setSize(PX_W, PX_H, false);
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x07080c, 1);

  // ── 纹理：清晰硬边圆点
  function makeTex(res, stops) {
    const c = document.createElement('canvas');
    c.width = c.height = res;
    const g = c.getContext('2d').createRadialGradient(res/2, res/2, 0, res/2, res/2, res/2);
    stops.forEach(([t, a]) => g.addColorStop(t, `rgba(255,255,255,${a})`));
    c.getContext('2d').fillStyle = g;
    c.getContext('2d').fillRect(0, 0, res, res);
    return new THREE.CanvasTexture(c);
  }
  // 硬边圆点：无模糊，清晰实心点
  const ptTex  = makeTex(32, [[0,1],[0.82,1],[0.83,0],[1,0]]);
  const halTex = makeTex(64, [[0,0.7],[0.30,0.3],[0.60,0.05],[1,0]]);
  // 火花纹理：细长（用矩形canvas模拟）
  const spkTex  = (() => {
    const c = document.createElement('canvas');
    c.width = 4; c.height = 64;
    const g = c.getContext('2d').createLinearGradient(0, 0, 0, 64);
    g.addColorStop(0, 'rgba(255,255,255,0)');
    g.addColorStop(0.4, 'rgba(255,255,255,0.9)');
    g.addColorStop(0.5, 'rgba(255,255,255,1.0)');
    g.addColorStop(0.6, 'rgba(255,255,255,0.9)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    c.getContext('2d').fillStyle = g;
    c.getContext('2d').fillRect(0, 0, 4, 64);
    return new THREE.CanvasTexture(c);
  })();

  // ── 层1：核心球体粒子 — 两极密集、赤道稀疏 ──────────────
  const N_CORE  = 8000;
  const CORE_R  = 1.6;
  const corePos   = new Float32Array(N_CORE * 3);
  const coreNorm  = new Float32Array(N_CORE * 3); // 原始球面法线（不随旋转变化）
  const corePhase = new Float32Array(N_CORE);
  const coreSz    = new Float32Array(N_CORE);
  const coreLat   = new Float32Array(N_CORE);

  for (let i = 0; i < N_CORE; i++) {
    const theta = Math.random() * Math.PI * 2;
    const u    = 2 * Math.random() - 1;
    const cosP = u;
    const sinP = Math.sqrt(Math.max(0, 1 - cosP * cosP));
    const nx = sinP * Math.cos(theta);
    const ny = cosP;
    const nz = sinP * Math.sin(theta);

    const latFactor = Math.abs(cosP); // 0=赤道 1=极点

    // 极点稀疏
    if (latFactor > 0.72 && Math.random() < 0.65) { i--; continue; }
    if (latFactor > 0.90 && Math.random() < 0.90) { i--; continue; }

    // 不均匀感：随机拒绝部分粒子，产生自然疏密聚簇
    // 用 sin/cos 扰动在球面上制造不规则密度
    const clump = 0.5 + 0.5 * Math.sin(theta * 3.7 + cosP * 5.1);
    if (Math.random() > 0.3 + clump * 0.7) { i--; continue; }

    const r = CORE_R;
    corePos[i*3+0] = nx * r;
    corePos[i*3+1] = ny * r;
    corePos[i*3+2] = nz * r;
    coreNorm[i*3+0] = nx;
    coreNorm[i*3+1] = ny;
    coreNorm[i*3+2] = nz;
    corePhase[i]   = Math.random() * Math.PI * 2;
    coreLat[i]     = latFactor;
    coreSz[i]      = 0.012 + Math.random() * 0.009;
  }

  const coreGeo = new THREE.BufferGeometry();
  coreGeo.setAttribute('position', new THREE.BufferAttribute(corePos,   3));
  coreGeo.setAttribute('aNorm',    new THREE.BufferAttribute(coreNorm,  3));
  coreGeo.setAttribute('aPhase',   new THREE.BufferAttribute(corePhase, 1));
  coreGeo.setAttribute('aSize',    new THREE.BufferAttribute(coreSz,    1));
  coreGeo.setAttribute('aLat',     new THREE.BufferAttribute(coreLat,   1));

  const coreVert = /* glsl */`
    attribute float aPhase;
    attribute float aSize;
    attribute float aLat;
    attribute vec3  aNorm;    // 原始球面法线，不随旋转变化
    uniform float uTime;
    uniform float uSpeak;
    uniform float uGlitch;
    uniform float uSK;
    varying float vA;
    varying vec3  vCol;

    void main() {
      vec3 dir = normalize(position + vec3(0.0001));

      float breathe = 1.0 + sin(uTime * 0.22) * 0.028;
      // 用 aNorm 采样动态warp — 幅度加大，让球面起伏清晰可见
      float warp =
          sin(aNorm.x * 2.8 + uTime * 0.31) * cos(aNorm.z * 2.3 + uTime * 0.19) * 0.055
        + sin(aNorm.y * 3.5 - uTime * 0.24) * cos(aNorm.x * 2.1 + uTime * 0.28) * 0.040
        + sin(aNorm.z * 5.2 + aNorm.y * 3.8 + uTime * 0.17) * 0.025
        + sin(aNorm.x * 8.1 + aNorm.y * 6.3 + uTime * 0.53) * 0.012
        + sin(aNorm.y * 7.4 - aNorm.z * 6.2 + uTime * 0.41) * 0.010;
      float pulse   = uSpeak * 0.15 * sin(uTime * 1.8 + aPhase * 5.0);
      float seed    = fract(sin(aPhase * 127.1) * 43758.5);
      float jitter  = uGlitch * (seed - 0.5) * 0.50;

      vec3 p = position * breathe + dir * (warp + pulse + jitter);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;

      gl_PointSize = aSize * uSK / -mv.z;

      // 颜色：纯白，赤道区域稍暗（用透明度区分层次）
      vCol = vec3(1.0, 1.0, 1.0);

      // 透明度：赤道最亮（latFactor低），极点渐隐
      float twinkle = 0.88 + 0.12 * sin(uTime * 0.6 + aPhase * 11.0);
      float baseA = 0.75 - aLat * 0.45; // 赤道0.75，极点0.30
      vA = baseA * twinkle * (1.0 + uSpeak * 0.35);
    }
  `;

  const coreFrag = /* glsl */`
    uniform sampler2D uTex;
    varying float vA;
    varying vec3  vCol;
    void main() {
      vec4 t = texture2D(uTex, gl_PointCoord);
      if (t.a < 0.008) discard;
      gl_FragColor = vec4(vCol, t.a * vA);
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
  corePts.position.y = 0.6;
  scene.add(corePts);

  // ── 层3：极点火花（仅从上下两极射出）────────────────────
  const N_SPARK = 600;
  const spkPos   = new Float32Array(N_SPARK * 3);
  const spkPhase = new Float32Array(N_SPARK);
  const spkSz    = new Float32Array(N_SPARK);
  const spkLen   = new Float32Array(N_SPARK);

  for (let i = 0; i < N_SPARK; i++) {
    const theta = Math.random() * Math.PI * 2;
    // 只在极点±25°范围内生成火花
    const poleFrac = Math.random();
    const cosP = (poleFrac > 0.5 ? 1 : -1) * (0.90 + Math.random() * 0.10);
    const sinP = Math.sqrt(Math.max(0, 1 - cosP * cosP));
    const r = CORE_R * (1.0 + Math.random() * 0.80);
    spkPos[i*3+0] = sinP * Math.cos(theta) * r;
    spkPos[i*3+1] = cosP * r;
    spkPos[i*3+2] = sinP * Math.sin(theta) * r;
    spkPhase[i] = Math.random() * Math.PI * 2;
    spkLen[i]   = Math.random();
    spkSz[i]    = 0.018 + Math.random() * 0.016;
  }

  const spkGeo = new THREE.BufferGeometry();
  spkGeo.setAttribute('position', new THREE.BufferAttribute(spkPos,   3));
  spkGeo.setAttribute('aPhase',   new THREE.BufferAttribute(spkPhase, 1));
  spkGeo.setAttribute('aSize',    new THREE.BufferAttribute(spkSz,    1));
  spkGeo.setAttribute('aLen',     new THREE.BufferAttribute(spkLen,   1));

  const spkVert = /* glsl */`
    attribute float aPhase;
    attribute float aSize;
    attribute float aLen;
    uniform float uTime;
    uniform float uSK;
    uniform float uSpeak;
    varying float vA;
    varying vec3  vCol;
    void main() {
      float cycle = fract(uTime * 0.28 + aPhase * 0.159);
      float spark = smoothstep(0.0, 0.12, cycle) * (1.0 - smoothstep(0.55, 1.0, cycle));

      vec3 dir = normalize(position);
      float breathe = 1.0 + sin(uTime * 0.22) * 0.025;
      vec3 p = position * breathe;

      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = aSize * uSK / -mv.z;

      float dist = length(position) / 2.4;
      float fade = pow(1.0 - clamp(dist - 0.5, 0.0, 1.0), 1.8);
      vA = spark * fade * (0.55 + aLen * 0.35) * (1.0 + uSpeak * 0.6);
      vCol = vec3(1.0, 1.0, 1.0);
    }
  `;

  const spkFrag = /* glsl */`
    uniform sampler2D uTex;
    varying float vA;
    varying vec3  vCol;
    void main() {
      vec4 t = texture2D(uTex, gl_PointCoord);
      if (t.a < 0.006) discard;
      gl_FragColor = vec4(vCol, t.a * vA);
    }
  `;

  const spkUni = { uTime:{value:0}, uSK:{value:SK}, uSpeak:{value:0}, uTex:{value:ptTex} };
  const spkMat = new THREE.ShaderMaterial({
    uniforms: spkUni, vertexShader: spkVert, fragmentShader: spkFrag,
    blending: THREE.AdditiveBlending, depthWrite: false, transparent: true,
  });
  const spkPts = new THREE.Points(spkGeo, spkMat);
  spkPts.position.y = 0.6;
  scene.add(spkPts);

  // ── 层4：远场漂浮粒子云（深蓝尘埃）──────────────────────
  const N_GND  = 55000;
  const gndPos   = new Float32Array(N_GND * 3);
  const gndPhase = new Float32Array(N_GND);
  const gndSz    = new Float32Array(N_GND);

  function terrain(x, z) {
    return Math.sin(x * 0.75 + 1.3) * 0.28
         + Math.sin(z * 0.9 - 0.6)  * 0.22
         + Math.sin((x + z) * 0.6)  * 0.15
         + Math.sin(x * 1.7 + z * 1.1) * 0.08;
  }

  for (let i = 0; i < N_GND; i++) {
    const x = (Math.random() - 0.5) * 26;
    const z = Math.random() * 12 - 4;
    gndPos[i*3+0] = x;
    gndPos[i*3+1] = -1.9 + terrain(x, z) + (Math.random() - 0.5) * 0.08;
    gndPos[i*3+2] = z;
    gndPhase[i]   = Math.random() * Math.PI * 2;
    gndSz[i] = Math.random() < 0.04
      ? 0.032 + Math.random() * 0.020
      : 0.010 + Math.random() * 0.014;
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
    varying vec3  vCol;
    void main() {
      float wave = sin(position.x * 1.0 + uTime * 0.55) * 0.08
                 + sin(position.z * 1.2 - uTime * 0.40) * 0.06
                 + sin((position.x + position.z) * 0.8 + uTime * 0.28) * 0.04;
      float drift = sin(uTime * 0.13 + aPhase * 6.28) * 0.025;
      vec3 p = position + vec3(0.0, wave + drift, 0.0);
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = aSize * (1.0 + uSpeak * 0.28) * uSK / -mv.z;
      float twinkle = 0.55 + 0.45 * sin(uTime * 1.1 + aPhase * 9.0);
      vA = 0.28 + twinkle * 0.18;
      float isCool = step(0.40, fract(sin(aPhase * 91.7) * 23741.3));
      vCol = mix(vec3(0.18, 0.26, 0.42), vec3(0.28, 0.50, 0.80), isCool);
    }
  `;

  const gndFrag = /* glsl */`
    uniform sampler2D uTex;
    varying float vA;
    varying vec3  vCol;
    void main() {
      vec4 t = texture2D(uTex, gl_PointCoord);
      if (t.a < 0.008) discard;
      gl_FragColor = vec4(vCol, t.a * vA);
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

    // 柔化震动：intensity 缓慢衰减，再通过低通滤波平滑，产生呼吸感
    avatarState.intensity = Math.max(0, avatarState.intensity - dt * 0.35);
    avatarState.spkSmooth = avatarState.spkSmooth === undefined ? 0 : avatarState.spkSmooth;
    avatarState.spkSmooth += (avatarState.intensity - avatarState.spkSmooth) * Math.min(1, dt * 2.5);
    const spk = avatarState.spkSmooth;

    if (avatarState.glitching) avatarState.glitchTime = Math.min(1, avatarState.glitchTime + dt * 4);
    else                        avatarState.glitchTime = Math.max(0, avatarState.glitchTime - dt * 3);
    const gl = avatarState.glitchTime;

    coreUni.uTime.value   = t;
    coreUni.uSpeak.value  = spk;
    coreUni.uGlitch.value = gl;
    spkUni.uTime.value    = t;
    spkUni.uSpeak.value   = spk;
    gndUni.uTime.value    = t;
    gndUni.uSpeak.value   = spk;

    // 球体多轴旋转：y主轴慢转 + x/z轴各自独立摆动漂移
    corePts.rotation.y += dt * (0.032 + spk * 0.08);
    corePts.rotation.x += dt * (0.018 + spk * 0.04);
    corePts.rotation.z  = 0.12 * Math.sin(t * 0.09) + 0.06 * Math.sin(t * 0.23);

    spkPts.rotation.y  += dt * (0.048 + spk * 0.10);
    spkPts.rotation.x  += dt * 0.022;
    spkPts.rotation.z   = 0.09 * Math.sin(t * 0.13 + 1.2);

    // 镜头轻微漂移
    camera.position.x = Math.sin(t * 0.07) * 0.10;
    camera.position.y = 0.20 + Math.sin(t * 0.11) * 0.055;
    camera.lookAt(0, 0.20, 0);

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
// HUD 初始化
// ============================================================

function initHUD() {
  // 时钟
  function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    const s = String(now.getSeconds()).padStart(2,'0');
    const el = document.getElementById('hud-clock');
    if (el) el.textContent = `${h}:${m}:${s}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // uptime
  const startTs = Date.now();
  setInterval(() => {
    const sec = Math.floor((Date.now() - startTs) / 1000);
    const mm = String(Math.floor(sec / 60)).padStart(2,'0');
    const ss = String(sec % 60).padStart(2,'0');
    const el = document.getElementById('hud-uptime');
    if (el) el.textContent = `${mm}:${ss}`;
  }, 1000);
}

// ============================================================
// 阶段一：序曲（逐行替换，不保留前一行）
// ============================================================

async function runIntro() {
  const tw = document.getElementById('typewriter');
  let cur  = null; // 当前显示的行

  // 初始化 HUD 并渐入
  initHUD();
  await sleep(600);
  document.getElementById('hud-corners').classList.add('visible');
  document.getElementById('hud-header').classList.add('visible');
  document.getElementById('hud-footer').classList.add('visible');
  await sleep(400);
  ['hud-card-1','hud-card-2','hud-card-3','hud-card-4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('visible');
  });

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
  await show('感知到新用户',       { cls:'intro-line system', speed:22, hold:900  });
  await show('开始建立档案',       { cls:'intro-line system', speed:22, hold:1100 });

  // ── 自我介绍 ──
  await show('你好',               { cls:'intro-line serif',    speed:65, hold:700  });
  await show('我是 Evans',         { cls:'intro-line serif',    speed:55, hold:2200 });
  await show('你现在站在展览现场', { cls:'intro-line serif-em', speed:40, hold:900 });
  await show('你面前有一台电脑',   { cls:'intro-line serif-em', speed:40, hold:900 });
  await show('墙上有两块屏幕',     { cls:'intro-line serif-em', speed:40, hold:1500 });
  await show('我还不了解你',       { cls:'intro-line serif-em', speed:44, hold:1000 });
  await show('但我会的',           { cls:'intro-line serif',    speed:58, hold:2000 });

  // ── Evans 主动带你进后台 ──
  await show('带你看看后台吧',     { cls:'intro-line serif',    speed:50, hold:1200 });
  await show('这里平时不对外的',   { cls:'intro-line serif-em', speed:42, hold:800  });
  await show(null);

  // ── 进入数据流过渡 ──
  await enterDatastream();   // 等终端跑完再继续

  // 档案室已由 enterDatastream 内部调起，这里只加一点过渡余量
  await sleep(400);

  // Evans 在档案室上的对话
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

  await sleep(400);
  await speechLine('这里存着所有的档案。', { pauseAfter: 800 });
  await speechLine('—', { pauseAfter: 400 });
  await speechLine('每一个场景，每一次对话。', { pauseAfter: 700 });
  await speechLine('我对你们每个人的完整记录。', { pauseAfter: 1200 });
  await speechLine('—', { pauseAfter: 300 });
  await speechLine('随便看吧。', { cls: 'speech-line final', speed: 55, pauseAfter: 1800 });

  overlay.style.transition = 'opacity 1.5s ease';
  overlay.style.opacity    = '0';
  await sleep(1600);
  overlay.style.display    = 'none';

  // 解锁档案室交互
  unlockArchive();

  // 展览循环：等待 20s 后淡回 Stage 1，重新开始
  await sleep(20000);
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
// 数据流过渡
// ============================================================

let datastreamRaf = null;

function enterDatastream() {
  return new Promise(resolve => {
  const layer  = document.getElementById('datastream-layer');

  // ── 用 DOM 而非 canvas，全屏终端 ──────────────────────────
  // canvas 隐藏，改用 div 全屏覆盖
  const canvas = document.getElementById('datastream-canvas');
  canvas.style.display = 'none';

  // 创建全屏终端容器
  const term = document.createElement('div');
  term.id = 'term-fullscreen';
  term.style.cssText = `
    position:fixed; inset:0; z-index:200;
    background:#0a0c10;
    font-family:"JetBrains Mono","Fira Code","Courier New",monospace;
    font-size:13px; line-height:20px;
    padding: 24px 52px 24px 52px;
    box-sizing:border-box;
    overflow:hidden;
    display:flex; flex-direction:column; justify-content:flex-end;
    opacity:0; transition: opacity 0.4s ease;
  `;

  // 内容区（行从这里 append，超出自动被上方裁掉）
  const termInner = document.createElement('div');
  termInner.style.cssText = `
    display:flex; flex-direction:column; gap:0;
    width:100%;
  `;
  term.appendChild(termInner);
  layer.appendChild(term);

  // ── 配色（Catppuccin Mocha 风格） ──────────────────────
  const C = {
    bg:    '#0a0c10',
    white: '#cdd6f4',
    dim:   '#585b70',
    blue:  '#89b4fa',
    green: '#a6e3a1',
    yellow:'#f9e2af',
    red:   '#f38ba8',
    cyan:  '#89dceb',
    mauve: '#cba6f7',
    orange:'#fab387',
    pink:  '#f5c2e7',
  };

  // ── 终端行队列 ─────────────────────────────────────────
  // 每行是 HTML 字符串
  function c(color, text) {
    const s = String(text);
    return `<span style="color:${color}">${s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</span>`;
  }
  function dim(t)    { return c(C.dim,    t); }
  function wh(t)     { return c(C.white,  t); }
  function bl(t)     { return c(C.blue,   t); }
  function gr(t)     { return c(C.green,  t); }
  function ye(t)     { return c(C.yellow, t); }
  function re(t)     { return c(C.red,    t); }
  function cy(t)     { return c(C.cyan,   t); }
  function mv(t)     { return c(C.mauve,  t); }
  function or(t)     { return c(C.orange, t); }

  const ri  = (a,b) => Math.floor(a + Math.random()*(b-a));
  const ms  = ()    => (0.1 + Math.random()*120).toFixed(1)+'ms';
  const addr= ()    => '0x'+Array.from({length:6},()=>ri(0,256).toString(16).padStart(2,'0').toUpperCase()).join('');
  const now = ()    => { const d=new Date(); return [d.getHours(),d.getMinutes(),d.getSeconds()].map(x=>x.toString().padStart(2,'0')).join(':') + '.' + d.getMilliseconds().toString().padStart(3,'0'); };

  // 命令提示行
  function cmdLine(path, cmd) {
    return `<div style="margin-top:6px">${bl(path)} ${dim('$')} ${wh(cmd)}</div>`;
  }
  function outLine(html) {
    return `<div>${html}</div>`;
  }
  function blankLine() {
    return `<div style="height:8px"></div>`;
  }
  function sepLine() {
    return `<div>${dim('─'.repeat(80))}</div>`;
  }
  function progressLine(label, pct) {
    const filled = Math.round(pct * 40);
    const empty  = 40 - filled;
    const bar    = `<span style="color:${C.blue}">${'█'.repeat(filled)}</span><span style="color:${C.dim}">${'░'.repeat(empty)}</span>`;
    return `<div>${dim(label.padEnd(22))}  ${bar}  ${cy(Math.round(pct*100)+'%')}</div>`;
  }

  // 构建所有行
  const LINES = [];

  const push = (html) => LINES.push(html);

  // ── Block 0: 进入前空行 ──────────────────────────────
  push(blankLine());
  push(sepLine());

  // ── Block 1: 系统启动 ────────────────────────────────
  push(outLine(`${dim('[')}${cy('BOOT')}${dim(']')} ${wh('evans-core v2.4.1  —  build #20240610')}`));
  push(outLine(`${dim('[')}${cy('BOOT')}${dim(']')} ${dim('runtime: node/23.4.0  arch: x86_64-linux')}`));
  push(outLine(`${dim('[')}${cy('BOOT')}${dim(']')} ${dim('initializing subsystems...')}`));
  push(outLine(`${dim('[')}${gr(' OK ')}${dim(']')} ${dim('memory allocator  ')}${or('512 MB')}${dim(' reserved')}`));
  push(outLine(`${dim('[')}${gr(' OK ')}${dim(']')} ${dim('AES-256-GCM keystore loaded')}`));
  push(outLine(`${dim('[')}${gr(' OK ')}${dim(']')} ${dim('RSA-2048 pubkey fingerprint: ')}${mv(addr())}`));
  push(outLine(`${dim('[')}${ye('WARN')}${dim(']')} ${ye('legacy JWT detected — rotating credentials...')}`));
  push(outLine(`${dim('[')}${gr(' OK ')}${dim(']')} ${dim('token rotated  new_exp=')}${or(Math.floor(Date.now()/1000 + 3600))}`));
  push(blankLine());

  // ── Block 2: npm install ─────────────────────────────
  push(cmdLine('~/evans', 'npm install --legacy-peer-deps'));
  push(outLine(`${dim('npm')} ${ye('warn')} ${dim('deprecated')} ${wh('glob@7.2.3')} ${dim('→')} ${bl('glob@10')}`));
  push(outLine(`${dim('npm')} ${ye('warn')} ${dim('deprecated')} ${wh('inflight@1.0.6')} ${dim('(unresolved)')}`));
  push(outLine(`${dim('npm')} ${ye('warn')} ${dim('deprecated')} ${wh('rimraf@2.7.1')} ${dim('→')} ${bl('rimraf@4')}`));
  push(progressLine('resolving deps', 0.25));
  push(progressLine('resolving deps', 0.55));
  push(progressLine('resolving deps', 0.82));
  push(progressLine('resolving deps', 1.00));
  push(outLine(`${dim('added ')}${or('1,247')}${dim(' packages  •  audited ')}${or('1,251')}${dim(' packages in ')}${gr('8.3s')}`));
  push(outLine(`${dim('found ')}${gr('0')}${dim(' vulnerabilities')}`));
  push(outLine(`${gr('✓')} ${wh('node_modules ready')}`));
  push(blankLine());

  // ── Block 3: 模型训练 ────────────────────────────────
  push(cmdLine('~/evans', 'python3 train.py --epochs 40 --lr 3e-4 --batch 128 --amp'));
  push(outLine(`${dim('[')}${cy('INFO')}${dim(']')} ${dim('device: ')}${mv('cuda:0')}${dim('  (NVIDIA RTX 4090  24576 MB)')}`));
  push(outLine(`${dim('[')}${cy('INFO')}${dim(']')} ${dim('dataset: ')}${or('218,493')}${dim(' samples  •  val: ')}${or('12,847')}`));
  push(outLine(`${dim('[')}${cy('INFO')}${dim(']')} ${dim('mixed precision AMP enabled')}`));
  push(outLine(dim('training...')));
  push(outLine(`${dim('Epoch ')}${or('01')}${dim('/40  ')}${dim('loss=')}${ye('2.4831')}${dim('  acc=')}${or('31.2%')}${dim('  lr=')}${bl('3.00e-4')}${dim('  ')}${or('14.2s/ep')}`));
  push(progressLine('epoch  1/40', 1/40));
  push(outLine(`${dim('Epoch ')}${or('04')}${dim('/40  ')}${dim('loss=')}${ye('1.8204')}${dim('  acc=')}${or('52.7%')}${dim('  lr=')}${bl('2.81e-4')}${dim('  ')}${or('13.9s/ep')}`));
  push(outLine(`${dim('Epoch ')}${or('08')}${dim('/40  ')}${dim('loss=')}${ye('1.1104')}${dim('  acc=')}${or('67.1%')}${dim('  lr=')}${bl('2.60e-4')}`));
  push(progressLine('epoch  8/40', 8/40));
  push(outLine(`${dim('Epoch ')}${or('16')}${dim('/40  ')}${dim('loss=')}${gr('0.6823')}${dim('  acc=')}${gr('84.1%')}${dim('  lr=')}${bl('2.18e-4')}`));
  push(progressLine('epoch 16/40', 16/40));
  push(outLine(`${dim('Epoch ')}${or('24')}${dim('/40  ')}${dim('loss=')}${gr('0.4412')}${dim('  acc=')}${gr('90.6%')}${dim('  lr=')}${bl('1.76e-4')}`));
  push(progressLine('epoch 24/40', 24/40));
  push(outLine(`${dim('Epoch ')}${or('32')}${dim('/40  ')}${dim('loss=')}${gr('0.3104')}${dim('  acc=')}${gr('93.4%')}${dim('  lr=')}${bl('1.35e-4')}`));
  push(progressLine('epoch 32/40', 32/40));
  push(outLine(`${dim('Epoch ')}${or('40')}${dim('/40  ')}${dim('loss=')}${gr('0.2317')}${dim('  acc=')}${gr('94.7%')}${dim('  lr=')}${bl('1.00e-4')}`));
  push(progressLine('epoch 40/40', 1.0));
  push(outLine(`${dim('[')}${gr(' OK ')}${dim(']')} ${gr('training complete')}  ${dim('best_acc=')}${gr('94.7%')}  ${dim('checkpoint saved')}`));
  push(blankLine());

  // ── Block 4: HTTP 访问日志 ───────────────────────────
  push(cmdLine('~/evans', 'tail -f /var/log/evans/access.log'));
  const methods = ['GET','POST','PUT','DELETE','PATCH'];
  const routes  = [
    '/api/v2/archive/scenes','/api/v2/memory/diff',
    '/api/v2/auth/verify',  '/static/scene_s07.enc',
    '/admin/export',        '/api/v2/stream/live',
    '/api/v2/archive/unlock','/internal/gc',
    '/api/v2/user/0xe8f2a1','/api/v2/delta/push',
  ];
  const codePool = [200,200,200,200,201,204,304,304,400,401,404,500,502];
  for (let i=0; i<22; i++) {
    const m    = methods[ri(0,methods.length)];
    const r    = routes[ri(0,routes.length)];
    const code = codePool[ri(0,codePool.length)];
    const cc   = code<300 ? C.green : code<400 ? C.cyan : code<500 ? C.yellow : C.red;
    const mc   = m==='GET'?C.blue:m==='POST'?C.green:m==='DELETE'?C.red:C.mauve;
    push(outLine(
      `${dim(now()+'  ')}` +
      `<span style="color:${cc};min-width:3ch;display:inline-block">${code}</span>  ` +
      `<span style="color:${mc};display:inline-block;min-width:7ch">${m}</span>` +
      `<span style="color:${C.white}">${r.padEnd(38)}</span>` +
      `${c(C.orange, ms())}`
    ));
  }
  push(blankLine());

  // ── Block 5: 内存 / GC ──────────────────────────────
  push(cmdLine('~/evans', 'evans-inspect --mem --gc-trace --verbose'));
  push(outLine(`  ${dim('heap_used    ')}  ${or('347.2 MB')}  ${dim('/ 512 MB')}  ${ye('[67.8%]')}`));
  push(outLine(`  ${dim('heap_total   ')}  ${or('512.0 MB')}`));
  push(outLine(`  ${dim('external     ')}  ${or(' 18.4 MB')}`));
  push(outLine(`  ${dim('rss          ')}  ${or('641.7 MB')}`));
  push(outLine(`  ${dim('array_bufs   ')}  ${or('  4.1 MB')}`));
  push(blankLine());
  push(outLine(`  ${dim('GC minor  #')}${mv('1042')}  ${dim('freed ')}${gr('2.1 MB')}  ${dim(ms())}`));
  push(outLine(`  ${dim('GC minor  #')}${mv('1043')}  ${dim('freed ')}${gr('1.8 MB')}  ${dim(ms())}`));
  push(outLine(`  ${dim('GC major  #')}${mv('  38')}  ${dim('freed ')}${gr('84 MB ')}  ${dim(ms())}`));
  push(outLine(`${dim('[')}${ye('WARN')}${dim(']')} ${ye('heap pressure HIGH  (87.3%)  — triggering compaction')}`));
  push(progressLine('GC compaction', 0.33));
  push(progressLine('GC compaction', 0.71));
  push(progressLine('GC compaction', 1.00));
  push(outLine(`${dim('[')}${gr(' OK ')}${dim(']')} ${dim('compaction done  freed ')}${gr('128 MB')}${dim('  in ')}${or(ms())}`));
  push(blankLine());

  // ── Block 6: 加密验证 ────────────────────────────────
  push(cmdLine('~/evans', 'openssl dgst -sha256 -verify pub.pem -signature sig.bin archive.enc'));
  push(outLine(`${dim('Verified OK')}  →  ${gr('SHA-256 match')}`));
  push(outLine(`${dim('digest   ')}${cy('SHA-256')}  ${dim('hash: ')}${mv(addr())}`));
  push(outLine(`${dim('RSA-2048 signature ')}${gr('VALID')}  ${dim('issuer: evans-keyserver-01')}`));
  push(outLine(`${dim('not_before: ')}${or('2024-01-01T00:00:00Z')}  ${dim('not_after: ')}${or('2025-01-01T00:00:00Z')}`));
  push(blankLine());

  // ── Block 7: evans 解锁 ──────────────────────────────
  push(sepLine());
  push(outLine(`${mv('[EVANS]')} ${wh('archive.unlock(0xF) triggered')}`));
  push(outLine(`${mv('[EVANS]')} ${dim('fetching scene index from keystore...')}`));
  push(progressLine('decrypting scenes', 0.20));
  push(progressLine('decrypting scenes', 0.55));
  push(progressLine('decrypting scenes', 0.90));
  push(progressLine('decrypting scenes', 1.00));
  push(outLine(`${mv('[EVANS]')} ${dim('15 scenes decrypted  ')}${cy('S01')}${dim('–')}${cy('S15')}`));
  push(outLine(`${mv('[EVANS]')} ${dim('scene index rebuilt  records=')}${or('15')}  ${dim('size=')}${or('40.2 KB')}`));
  push(outLine(`${mv('[EVANS]')} ${ye('WARNING')}${dim(': scene ')}${re('S15')}${dim(' flagged ')}${re('RESTRICTED')}${dim(' — access logged')}`));
  push(outLine(`${mv('[EVANS]')} ${gr('passing control to viewer...')}  ${dim('done.')}`));
  push(sepLine());
  push(blankLine());

  // ── 逐行打印，推入 DOM，超出自动上滚 ─────────────────
  let lineIdx = 0;
  const TOTAL  = LINES.length;
  // 每行间隔 ms（越小越快）— 模拟真实终端吐字速度
  // 不同 block 有不同节奏，用队列调度
  const DELAYS = [];
  for (let i=0; i<TOTAL; i++) {
    const html = LINES[i];
    // blank / sep 快，progress 较快，cmd 前停顿
    if (html.includes('term-cmd-marker') || html.includes('$ ')) DELAYS.push(160);
    else if (html.includes('height:8px') || html.includes('─')) DELAYS.push(40);
    else if (html.includes('░') || html.includes('█')) DELAYS.push(90);
    else DELAYS.push(55 + Math.random()*60);
  }

  let totalElapsed = 0;
  const STREAM_DURATION = 12000;
  let allDone = false;

  function printNext() {
    if (lineIdx >= TOTAL) { allDone = true; return; }
    const div = document.createElement('div');
    div.innerHTML = LINES[lineIdx];
    // 新行追加到底部
    termInner.appendChild(div);
    // 限制 DOM 行数（防止内存炸），保留最近 120 行
    while (termInner.children.length > 120) {
      termInner.removeChild(termInner.firstChild);
    }
    lineIdx++;
    totalElapsed += DELAYS[lineIdx] || 60;
    if (totalElapsed < STREAM_DURATION) {
      setTimeout(printNext, DELAYS[lineIdx] || 60);
    } else {
      allDone = true;
    }
  }

  // 淡入 + 开始打印
  requestAnimationFrame(() => {
    term.style.opacity = '1';
    setTimeout(printNext, 80);
  });

  // 定时结束
  setTimeout(() => {
    allDone = true;
    term.style.transition = 'opacity 0.8s ease';
    term.style.opacity = '0';
    setTimeout(() => {
      term.remove();
      layer.style.display = 'none';
      enterStage2();
      resolve();   // ← 通知 runIntro 可以继续了
    }, 900);
  }, STREAM_DURATION + 800);

  // stage1 淡出，HUD同步淡出
  const s1 = document.getElementById('stage1');
  s1.classList.add('fade-out');
  setTimeout(() => { s1.style.display = 'none'; }, 1500);
  ['hud-corners','hud-header','hud-footer','hud-card-1','hud-card-2','hud-card-3','hud-card-4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.style.transition = 'opacity 1s ease'; el.style.opacity = '0'; }
  });

  // 数据流层淡入
  layer.classList.add('visible');
  }); // end Promise
}



// ============================================================
// 进入阶段二（档案室）
// ============================================================

function enterStage2() {
  document.getElementById('stage2').classList.add('visible');
  // archive canvas 在stage2 visible后立即初始化
  setTimeout(() => initArchive(), 100);
}

// ============================================================
// 3D 档案室（Stage 2）
// ============================================================

const ARCHIVE_PANELS = [
  { id: 'S01', label: '初遇', sub: 'FIRST ENCOUNTER',   code: 'ARC-001', stat: '已归档' },
  { id: 'S02', label: '选择', sub: 'THE CHOICE',        code: 'ARC-002', stat: '已归档' },
  { id: 'S03', label: '边界', sub: 'BOUNDARIES',        code: 'ARC-003', stat: '已归档' },
  { id: 'S04', label: '记忆', sub: 'MEMORY TRACE',      code: 'ARC-004', stat: '已归档' },
  { id: 'S05', label: '信任', sub: 'TRUST PROTOCOL',    code: 'ARC-005', stat: '已归档' },
  { id: 'S06', label: '失控', sub: 'LOSS OF CONTROL',   code: 'ARC-006', stat: '已归档' },
  { id: 'S07', label: '共生', sub: 'SYMBIOSIS',         code: 'ARC-007', stat: '已归档' },
  { id: 'S08', label: '沉默', sub: 'THE SILENCE',       code: 'ARC-008', stat: '已归档' },
  { id: 'S09', label: '回响', sub: 'ECHO',              code: 'ARC-009', stat: '已归档' },
  { id: 'S10', label: '裂缝', sub: 'THE FRACTURE',      code: 'ARC-010', stat: '已归档' },
  { id: 'S11', label: '重建', sub: 'RECONSTRUCTION',    code: 'ARC-011', stat: '已归档' },
  { id: 'S12', label: '镜像', sub: 'MIRROR',            code: 'ARC-012', stat: '已归档' },
  { id: 'S13', label: '告别', sub: 'FAREWELL',          code: 'ARC-013', stat: '已归档' },
  { id: 'S14', label: '此刻', sub: 'THIS MOMENT',       code: 'ARC-014', stat: '进行中' },
  { id: 'S15', label: '——',  sub: 'CLASSIFIED',        code: 'ARC-015', stat: '机密' },
];

let archiveCanvas, archiveCtx, archiveDPR, archiveW, archiveH;
let archiveRaf = null;
let archiveLocked = true;   // Evans离开前不可交互
let archiveHover = -1;
let archiveTime = 0;
let archiveLastTs = null;

// 每张卡片的动画状态
const cardStates = ARCHIVE_PANELS.map(() => ({
  revealT: 0,   // 0→1 逐渐出现
  hoverT:  0,   // 0→1 hover高亮
}));

function initArchive() {
  archiveCanvas = document.getElementById('archive-canvas');
  archiveCtx    = archiveCanvas.getContext('2d');

  function resize() {
    archiveDPR = Math.min(window.devicePixelRatio || 1, 2);
    archiveW   = window.innerWidth;
    archiveH   = window.innerHeight;
    archiveCanvas.style.width  = archiveW + 'px';
    archiveCanvas.style.height = archiveH + 'px';
    archiveCanvas.width  = Math.round(archiveW * archiveDPR);
    archiveCanvas.height = Math.round(archiveH * archiveDPR);
  }
  resize();
  window.addEventListener('resize', resize);

  archiveCanvas.addEventListener('mousemove', onArchiveMove);
  archiveCanvas.addEventListener('click',     onArchiveClick);

  archiveLastTs = null;
  archiveRaf = requestAnimationFrame(archiveTick);
}

function archiveTick(ts) {
  if (archiveLastTs === null) archiveLastTs = ts;
  const dt = Math.min((ts - archiveLastTs) / 1000, 0.05);
  archiveLastTs = ts;
  archiveTime += dt;

  // 逐卡片依次出现（每张间隔0.12s）
  ARCHIVE_PANELS.forEach((_, i) => {
    const delay = i * 0.12;
    const target = archiveTime > delay ? 1 : 0;
    cardStates[i].revealT += (target - cardStates[i].revealT) * Math.min(1, dt * 5);
    const hTarget = (archiveHover === i && !archiveLocked) ? 1 : 0;
    cardStates[i].hoverT += (hTarget - cardStates[i].hoverT) * Math.min(1, dt * 8);
  });

  drawArchive();
  archiveRaf = requestAnimationFrame(archiveTick);
}

function getCardLayout() {
  const D = archiveDPR;
  const W = archiveW * D;
  const H = archiveH * D;

  // 堆叠区（左侧）
  const stackX  = W * 0.10;
  const stackY  = H * 0.22;
  const stackDX = 13 * D;
  const stackDY = 8  * D;
  const cardW   = 240 * D;
  const cardH   = 148 * D;

  // 主展示区（右侧）
  const mainX = W * 0.52;
  const mainY = H * 0.12;
  const mainW = 370 * D;
  const mainH = 230 * D;

  return { W, H, D, stackX, stackY, stackDX, stackDY, cardW, cardH, mainX, mainY, mainW, mainH };
}

function drawArchive() {
  const ctx = archiveCtx;
  const { W, H, D, stackX, stackY, stackDX, stackDY, cardW, cardH, mainX, mainY, mainW, mainH } = getCardLayout();

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // 背景斜格
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 0.7 * D;
  const step = 52 * D;
  for (let i = -6; i < 20; i++) {
    ctx.beginPath();
    ctx.moveTo(i * step, H * 0.06);
    ctx.lineTo(i * step + W * 0.3, H);
    ctx.stroke();
  }
  for (let j = 0; j < 12; j++) {
    ctx.beginPath();
    ctx.moveTo(0, H * 0.18 + j * step * 0.7);
    ctx.lineTo(W, H * 0.06 + j * step * 0.7);
    ctx.stroke();
  }

  // 散点
  for (let i = 0; i < 80; i++) {
    const x = (Math.sin(i * 91.37) * 0.5 + 0.5) * W;
    const y = (Math.sin(i * 41.91) * 0.5 + 0.5) * H;
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(x, y, D, D);
  }

  // 左侧堆叠（历史卡片）
  const N = ARCHIVE_PANELS.length;
  for (let i = 0; i < N; i++) {
    const p = ARCHIVE_PANELS[i];
    const st = cardStates[i];
    const x = stackX + i * stackDX;
    const y = stackY + i * stackDY;
    const alpha = (0.08 + i * 0.016) * st.revealT;
    if (alpha < 0.005) continue;
    drawCard(ctx, x, y, cardW, cardH, p, alpha, 0, D, i, false);
  }

  // 右侧主面板（最顶层卡片放大展示）
  const topIdx = N - 1;
  const topSt  = cardStates[topIdx];
  if (topSt.revealT > 0.05) {
    drawCard(ctx, mainX, mainY, mainW, mainH, ARCHIVE_PANELS[topIdx],
             0.75 * topSt.revealT, 0, D, topIdx, true);
  }

  // hover时在主区域展示hover的卡片
  if (archiveHover >= 0 && archiveHover < N && !archiveLocked) {
    const hi  = archiveHover;
    const hst = cardStates[hi];
    const a   = 0.65 + hst.hoverT * 0.15;
    drawCard(ctx, mainX, mainY, mainW, mainH, ARCHIVE_PANELS[hi], a, hst.hoverT, D, hi, true);
  }

  // 连接线
  const linesA = archiveLocked ? 0.25 : 0.4;
  drawConnLine(ctx, stackX + (N-1)*stackDX + cardW*0.5, stackY + (N-1)*stackDY,
               mainX, mainY + mainH*0.5, linesA * 0.9, D);
  drawConnLine(ctx, stackX + (N-4)*stackDX + cardW*0.3, stackY + (N-4)*stackDY,
               mainX + mainW*0.2, mainY, linesA * 0.5, D);

  // 左上标题
  ctx.fillStyle = `rgba(255,255,255,${archiveLocked ? 0.4 : 0.85})`;
  ctx.font = `500 ${13*D}px Arial, sans-serif`;
  ctx.fillText('■  ARCHIVE SYSTEM', W * 0.06, H * 0.08);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = `${10*D}px Arial, sans-serif`;
  ctx.fillText(archiveLocked ? 'RESTRICTED ACCESS' : `${N} RECORDS · SELECT TO VIEW`, W * 0.06, H * 0.108);

  // 右下标记
  if (!archiveLocked) {
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = `${9*D}px Arial, sans-serif`;
    ctx.fillText(`HOVER TO PREVIEW · CLICK TO OPEN`, W * 0.52, H * 0.94);
  }
}

function drawCard(ctx, x, y, w, h, panel, alpha, hoverT, D, idx, isBig) {
  ctx.save();

  // 外框
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.lineWidth   = (hoverT > 0.1 ? 1.2 : 0.9) * D;
  ctx.strokeRect(x, y, w, h);

  // 顶部折角标签
  const tagW = w * 0.36;
  const tagH = 15 * D;
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.lineWidth   = 0.8 * D;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + tagW, y);
  ctx.lineTo(x + tagW + 5*D, y + tagH);
  ctx.lineTo(x, y + tagH);
  ctx.closePath();
  ctx.stroke();

  // hover时内填充微光
  if (hoverT > 0.05) {
    const gx = ctx.createLinearGradient(x, y, x + w, y + h);
    gx.addColorStop(0,   `rgba(255,255,255,${0.04 * hoverT})`);
    gx.addColorStop(0.5, `rgba(255,255,255,${0.02 * hoverT})`);
    gx.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.fillStyle = gx;
    ctx.fillRect(x, y, w, h);
  }

  // 文字
  const tAlpha = Math.max(0, alpha + 0.1);
  ctx.fillStyle = `rgba(255,255,255,${tAlpha * 0.9})`;
  ctx.font = `500 ${(isBig ? 8.5 : 7.5)*D}px Arial, sans-serif`;
  ctx.fillText(`■ ${panel.code}`, x + 9*D, y + 11*D);

  if (isBig) {
    // 大卡片：更多细节
    ctx.font = `${9*D}px Arial, sans-serif`;
    ctx.fillStyle = `rgba(255,255,255,${tAlpha * 0.6})`;
    ctx.fillText(panel.sub, x + 14*D, y + 34*D);

    // 主标题
    ctx.font = `400 ${22*D}px 'EB Garamond', serif`;
    ctx.fillStyle = `rgba(255,255,255,${tAlpha})`;
    ctx.fillText(panel.label, x + 14*D, y + 62*D);

    // 状态徽章
    const statColor = panel.stat === '机密' ? `rgba(180,100,50,${tAlpha})` :
                      panel.stat === '进行中' ? `rgba(100,180,140,${tAlpha})` :
                      `rgba(255,255,255,${tAlpha * 0.5})`;
    ctx.fillStyle = statColor;
    ctx.font = `${8*D}px Arial, sans-serif`;
    ctx.fillText(panel.stat, x + w - 50*D, y + 11*D);

    // 点阵
    drawDots(ctx, x + 14*D, y + 80*D, 18, 3, tAlpha * 0.35, D);

    // 内容框
    ctx.strokeStyle = `rgba(255,255,255,${tAlpha * 0.2})`;
    ctx.lineWidth = 0.8 * D;
    ctx.strokeRect(x + 14*D, y + h*0.56, w - 28*D, h*0.3);

    // 微标记
    ctx.fillStyle = `rgba(255,255,255,${tAlpha * 0.5})`;
    ctx.fillRect(x + w*0.55, y + h*0.68, 3*D, 3*D);
    ctx.fillRect(x + w*0.78, y + h*0.76, 2*D, 2*D);

    // 同心椭圆（图像感）
    drawEllipses(ctx, x + w*0.5, y + h*0.71, w, h, tAlpha * 0.15, D);
  } else {
    // 小卡片：精简内容
    ctx.font = `${(7.5)*D}px Arial, sans-serif`;
    ctx.fillStyle = `rgba(255,255,255,${tAlpha * 0.55})`;
    ctx.fillText(panel.label, x + 12*D, y + 36*D);

    ctx.fillStyle = `rgba(255,255,255,${tAlpha * 0.35})`;
    ctx.font = `${7*D}px Arial, sans-serif`;
    ctx.fillText(panel.stat, x + w - 42*D, y + 11*D);

    drawDots(ctx, x + 12*D, y + 52*D, 14, 2, tAlpha * 0.3, D);
  }

  ctx.restore();
}

function drawDots(ctx, x, y, cols, rows, alpha, D) {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const a = alpha * (0.4 + Math.sin(c * 0.7 + r * 1.3 + archiveTime * 0.8) * 0.3);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fillRect(x + c*6*D, y + r*7*D, 1.1*D, 3.5*D);
    }
  }
}

function drawEllipses(ctx, cx, cy, w, h, alpha, D) {
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.lineWidth = 0.8 * D;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, (30 + i*12)*D, (14 + i*6)*D, -0.3, 0, Math.PI*2);
    ctx.stroke();
  }
}

function drawConnLine(ctx, x1, y1, x2, y2, alpha, D) {
  ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
  ctx.lineWidth = 0.8 * D;
  ctx.setLineDash([3*D, 5*D]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);
}

function onArchiveMove(e) {
  if (archiveLocked) return;
  const { stackX, stackY, stackDX, stackDY, cardW, cardH } = getCardLayout();
  const D = archiveDPR;
  const mx = e.clientX * D;
  const my = e.clientY * D;

  let hit = -1;
  // 从顶层向下检测
  for (let i = ARCHIVE_PANELS.length - 1; i >= 0; i--) {
    const x = stackX + i * stackDX;
    const y = stackY + i * stackDY;
    if (mx >= x && mx <= x + cardW && my >= y && my <= y + cardH) {
      hit = i; break;
    }
  }
  archiveHover = hit;
  archiveCanvas.style.cursor = hit >= 0 ? 'pointer' : 'default';
}

function onArchiveClick(e) {
  if (archiveLocked || archiveHover < 0) return;
  const panel = ARCHIVE_PANELS[archiveHover];
  console.log('Open panel:', panel.id, panel.label);
  // TODO: 双屏展开逻辑
}

function unlockArchive() {
  archiveLocked = false;
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

  // 重置档案室
  if (archiveRaf) { cancelAnimationFrame(archiveRaf); archiveRaf = null; }
  archiveLocked  = true;
  archiveHover   = -1;
  archiveTime    = 0;
  archiveLastTs  = null;
  cardStates.forEach(s => { s.revealT = 0; s.hoverT = 0; });

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
  // 开发调试：暴露到全局
  window.__initArchive  = initArchive;
  window.__unlockArchive = unlockArchive;
  window.__enterStage2  = enterStage2;
});
