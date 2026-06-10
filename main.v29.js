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
  const canvas = document.getElementById('datastream-canvas');
  canvas.style.display = 'none';

  // ── 全屏终端容器 ──────────────────────────────────────────
  const term = document.createElement('div');
  term.id = 'term-fullscreen';
  Object.assign(term.style, {
    position: 'fixed', inset: '0', zIndex: '200',
    background: '#0a0c10',
    fontFamily: '"JetBrains Mono","Fira Code","Courier New",monospace',
    fontSize: '13px', lineHeight: '20px',
    padding: '20px 56px',
    boxSizing: 'border-box',
    overflow: 'hidden',
    display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
    opacity: '0', transition: 'opacity 0.35s ease',
  });

  // 行容器：flex-col justify-end，新行append到底，旧行自然被推上去
  const termInner = document.createElement('div');
  Object.assign(termInner.style, {
    display: 'flex', flexDirection: 'column',
    width: '100%', minHeight: '0',
  });
  term.appendChild(termInner);
  layer.appendChild(term);

  // ── 配色 ─────────────────────────────────────────────────
  const C = {
    bg: '#0a0c10', white: '#cdd6f4', dim: '#4a4d60',
    blue: '#89b4fa', green: '#a6e3a1', yellow: '#f9e2af',
    red: '#f38ba8', cyan: '#89dceb', mauve: '#cba6f7',
    orange: '#fab387', pink: '#f5c2e7',
  };

  function span(color, text) {
    return `<span style="color:${color}">${String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;')}</span>`;
  }
  const d  = t => span(C.dim,    t);
  const w  = t => span(C.white,  t);
  const bl = t => span(C.blue,   t);
  const gr = t => span(C.green,  t);
  const ye = t => span(C.yellow, t);
  const re = t => span(C.red,    t);
  const cy = t => span(C.cyan,   t);
  const mv = t => span(C.mauve,  t);
  const or = t => span(C.orange, t);

  const ri   = (a,b) => Math.floor(a + Math.random()*(b-a));
  const rms  = ()    => (0.1 + Math.random()*180).toFixed(1)+'ms';
  const hex  = ()    => '0x'+Array.from({length:6},()=>ri(0,256).toString(16).padStart(2,'0').toUpperCase()).join('');
  const ts   = ()    => { const n=new Date(); return [n.getHours(),n.getMinutes(),n.getSeconds()].map(x=>String(x).padStart(2,'0')).join(':')+'.'+String(n.getMilliseconds()).padStart(3,'0'); };

  // ── 构建行队列 ────────────────────────────────────────────
  // 每项: { segments: [{text, color}], delay }
  // text 是纯文本（逐字打），color 是颜色
  // 也支持 prebuilt: true → 直接 innerHTML（进度条等不逐字打）

  const QUEUE = [];  // { html, delay, typewriter }
  // typewriter=true → 逐字符打出
  // typewriter=false → 直接插入（progress bar / sep）

  const psh = (html, delay=4, tw=true) => QUEUE.push({ html, delay, tw });
  const sep  = () => psh(`<div style="color:${C.dim};margin:2px 0">${'─'.repeat(90)}</div>`, 5, false);
  const blank= () => psh(`<div style="height:6px"></div>`, 5, false);
  const prog = (label, pct) => {
    const f = Math.round(pct*50), e = 50-f;
    const bar = `<span style="color:${C.blue}">${'█'.repeat(f)}</span><span style="color:${C.dim}">${'░'.repeat(e)}</span>`;
    psh(`<div>${d(label.padEnd(20))}  ${bar}  ${cy(String(Math.round(pct*100))+'%')}</div>`, 8, false);
  };

  // helper: push a typewriter line (HTML string, printed char by char)
  const line = (html, delay) => psh(`<div>${html}</div>`, delay ?? 4, true);
  const cmd  = (path, c2)    => line(`${bl(path)} ${d('$')} ${w(c2)}`, 20);

  // ── BLOCK 1: BOOT ────────────────────────────────────────
  sep();
  line(`${d('[')}${cy('BOOT')}${d(']')} ${w('evans-core v2.5.0  build #20240610  pid=')}${or(String(ri(10000,99999)))}  ${d('uid=1000  gid=1000  ppid=1  cwd=/srv/evans  umask=0022')}`);
  line(`${d('[')}${cy('BOOT')}${d(']')} ${d('arch=x86_64-linux  kernel=6.6.30-5.tl4  node=23.4.0  python=3.12.2  go=1.22.3  rust=1.78.0  llvm=18.1.4')}`);
  line(`${d('[')}${cy('BOOT')}${d(']')} ${d('cpu=AMD EPYC 9654 96-Core  threads=192  cpu_mhz=3707  cache_l3=384MB  numa_nodes=2  iommu=on')}`);
  line(`${d('[')}${cy('BOOT')}${d(']')} ${d('gpu=4×NVIDIA H100 SXM5 80GB  nvlink=4th-gen  cuda=12.4  cudnn=9.1.0  driver=550.90.07')}`);
  line(`${d('[')}${cy('BOOT')}${d(']')} ${d('mem_total=1024GB  mem_free=621GB  swap=128GB  hugepages=64GB  transparent_hp=madvise')}`);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('memory allocator  jemalloc=5.3.0  heap_max=256GB  arena=32  tcache=on  decay_ms=10000')}`);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('storage  nvme0n1=/srv  nvme1n1=/data  raid=zfs-raidz2  atime=off  compression=lz4  dedup=off')}`);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('network  eth0=10Gbe  bond0=2×25Gbe  ipv4=10.0.1.42/24  ipv6=fd00::42/64  mtu=9000  rss=16')}`);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('AES-256-GCM keystore  keys=12  hsmslot=3  tpm2=active  pcr_policy=sha256  expiry=all-ok  seal=ok')}`);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('RSA-4096 pubkey  fp=')}${mv(hex())}${d('  ecdsa-p384 backup fp=')}${mv(hex())}`);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('TLS 1.3  cert=evans.internal  san=*.evans.internal,*.evans.svc.cluster.local  ocsp=stapled  ct=yes')}`);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('redis 7.2.4  127.0.0.1:6379  pool=128  maxmem=32GB  policy=allkeys-lru  latency=')}${gr('0.28ms')}${d('  aof=yes')}`);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('postgres 16.2  socket=/run/pg  pool=64  max_conn=500  wal_level=logical  archive=on  replication=sync')}`);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('kafka 3.7.0  brokers=3  topics=24  partitions=192  replication=3  retention=7d  compression=zstd')}`);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('prometheus :9090  grafana :3000  jaeger :16686  alertmanager :9093  loki :3100  tempo :4317')}`);
  line(`${d('[')}${ye('WARN')}${d(']')} ${ye('legacy JWT v1 tokens in cache (n=47)  rotating all  new_exp=')}${or(String(Math.floor(Date.now()/1000+86400)))}${d('  algo=EdDSA  curve=ed25519')}`);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('all subsystems nominal  uptime=0s  ready=true  health=green  watchdog=armed  pid_file=/run/evans.pid')}`);
  blank();

  // ── BLOCK 2: git + build ─────────────────────────────────
  cmd('~/evans', 'git fetch --all --prune && git pull origin main --rebase --autostash && git log --oneline -5');
  line(`${d('Fetching origin  delta=247 objects  pack=1.82MiB  idx=ok  loose=0  prune=3  tags=synced')}`);
  line(`${d('remote: Compressing objects: 100% (88/88)  reused=159  pack-reused=0  wire=24.3MiB/s  done.')}`);
  line(`${d('Applying: ')}${w('feat(archive): add S15 restricted scene encryption + access audit log  author=evans  ')}${mv(hex().slice(0,8))}`);
  line(`${d('Applying: ')}${w('fix(memory): resolve heap fragmentation in long-running sessions under sustained load  ')}${mv(hex().slice(0,8))}`);
  line(`${d('Applying: ')}${w('chore(deps): bump transformers 4.40→4.41.2 torch 2.2→2.3.1 datasets 2.19→2.20  ')}${mv(hex().slice(0,8))}`);
  line(`${mv(hex().slice(0,7))} ${gr('feat(archive):')}${d(' S15 restricted scene encryption + access audit log')}`);
  line(`${mv(hex().slice(0,7))} ${gr('fix(memory):')}${d('  heap fragmentation resolved  sessions now stable >72h  rss delta <0.1%')}`);
  line(`${mv(hex().slice(0,7))} ${gr('chore(deps):')}${d(' bump transformers/torch/datasets  all tests passing  no breaking changes')}`);
  line(`${mv(hex().slice(0,7))} ${ye('refactor:')}${d('       extract scene decoder into standalone module  coverage +2.1%  size -12KB')}`);
  line(`${mv(hex().slice(0,7))} ${cy('docs:')}${d('          update API reference for v2 archive endpoints  add openapi spec  add examples')}`);
  blank();
  cmd('~/evans', 'npm ci --prefer-offline && npx tsc --noEmit && npx vite build --mode production --minify esbuild');
  line(`${d('npm')} ${ye('warn')} ${d('deprecated glob@7.2.3 → use glob@10.x  inflight@1.0.6 (memory leak, no upstream fix planned)')}`);
  line(`${d('npm')} ${ye('warn')} ${d('deprecated rimraf@2.7.1 → use rimraf@5  @humanwhocodes/object-schema@2.0.3 → use @eslint/object-schema')}`);
  prog('npm ci', 0.22);
  prog('npm ci', 0.58);
  prog('npm ci', 1.00);
  line(`${d('added 2,341 packages  audited 2,347  found 0 vulnerabilities  lockfile ok')}  ${gr('✓')}`);
  line(`${bl('tsc')} ${d('--noEmit  checking 148 source files  strict=true  target=ES2022  module=ESNext  ')}${gr('0 errors  0 warnings')}`);
  line(`${bl('vite')} ${d('v5.2.11  building for production  entry=src/main.ts  chunks=14  tree-shake=on  sourcemap=hidden')}`);
  prog('vite bundle', 0.35);
  prog('vite bundle', 0.72);
  prog('vite bundle', 1.00);
  line(`${gr('✓')} ${d('built in 8.41s  dist/assets/main-')}${mv(hex().slice(0,8))}${d('.js  gzip=142KB  brotli=118KB  css=24KB')}`);
  blank();

  // ── BLOCK 3: test + lint ──────────────────────────────────
  cmd('~/evans', 'npm run lint:strict && npm run test:ci -- --coverage --reporter=verbose --pool=forks --poolOptions.forks.maxForks=12');
  line(`${bl('eslint')} ${d('. --ext .ts,.tsx,.vue --max-warnings 0 --cache --cache-strategy content  parsing 148 files...')}  ${gr('0 errors  0 warnings')}`);
  line(`${d('  ✓')} ${w('src/core/archive.test.ts         ')} ${d('(14 tests)')}  ${gr('4.2ms')}  ${d('heap=28MB  branches=97.1%  lines=98.4%  funcs=100%')}`);
  line(`${d('  ✓')} ${w('src/core/memory.test.ts          ')} ${d('(11 tests)')}  ${gr('2.1ms')}  ${d('heap=24MB  branches=94.3%  lines=96.7%  funcs=100%')}`);
  line(`${d('  ✓')} ${w('src/core/crypto.test.ts          ')} ${d('(18 tests)')}  ${gr('6.8ms')}  ${d('heap=31MB  branches=99.1%  lines=99.8%  funcs=100%')}`);
  line(`${d('  ✓')} ${w('src/core/scheduler.test.ts       ')} ${d('(9 tests) ')}  ${gr('3.1ms')}  ${d('heap=22MB  branches=91.2%  lines=94.1%  funcs=96.3%')}`);
  line(`${d('  ✓')} ${w('src/core/delta.test.ts           ')} ${d('(7 tests) ')}  ${gr('2.4ms')}  ${d('heap=20MB  branches=93.7%  lines=95.0%  funcs=100%')}`);
  line(`${d('  ✓')} ${w('src/ui/datastream.test.ts        ')} ${d('(8 tests) ')}  ${gr('3.7ms')}  ${d('heap=26MB  branches=88.9%  lines=92.3%  funcs=94.7%')}`);
  line(`${d('  ✓')} ${w('src/ui/stage1.test.ts            ')} ${d('(12 tests)')}  ${gr('5.1ms')}  ${d('heap=29MB  branches=96.4%  lines=97.9%  funcs=100%')}`);
  line(`${d('  ✓')} ${w('src/ui/archive.test.ts           ')} ${d('(15 tests)')}  ${gr('7.3ms')}  ${d('heap=33MB  branches=98.2%  lines=99.1%  funcs=100%')}`);
  line(`${d('  ✓')} ${w('src/api/routes.test.ts           ')} ${d('(21 tests)')}  ${gr('9.4ms')}  ${d('heap=38MB  branches=95.6%  lines=97.2%  funcs=98.8%')}`);
  line(`${d('  ✓')} ${w('src/api/middleware.test.ts       ')} ${d('(10 tests)')}  ${gr('4.6ms')}  ${d('heap=27MB  branches=90.1%  lines=93.4%  funcs=97.1%')}`);
  line(`${gr(' PASS ')}${d(' 125 tests  0 failed  0 skipped  duration=48.7ms  overall coverage=')}${gr('95.8%')}${d('  threshold=90% ')}${gr('✓')}`);
  blank();

  // ── BLOCK 4: model training ───────────────────────────────
  cmd('~/evans', 'torchrun --nproc_per_node=4 --nnodes=1 train.py --cfg configs/evans_v5.yaml --amp --fsdp --ckpt-dir ./ckpt');
  line(`${d('[')}${cy('INFO')}${d(']')} torch=2.3.1+cu121  transformers=4.41.2  accelerate=0.30.1  deepspeed=0.14.2  flash-attn=2.5.8')}`);
  line(`${d('[')}${cy('INFO')}${d(']')} devices=4×H100-SXM5-80GB  nvlink=900GB/s  dtype=bfloat16  fsdp=FULL_SHARD  activation_ckpt=on')}`);
  line(`${d('[')}${cy('INFO')}${d(']')} model  arch=transformer-xl  layers=48  heads=32  dim=4096  ffn=16384  params=13.1B  trainable=98.3M')}`);
  line(`${d('[')}${cy('INFO')}${d(']')} dataset  train=1,842,304  val=102,400  test=51,200  vocab=128000  seq_len=8192  packing=true')}`);
  line(`${d('[')}${cy('INFO')}${d(']')} opt=AdamW  lr=1e-4  wd=0.1  warmup=2000  schedule=cosine  grad_clip=1.0  fp16_master=true')}`);
  line(`${d('training...')}`);
  for (let ep=1; ep<=60; ep++) {
    const loss = Math.max(0.18, 2.84 - ep*0.044 + (Math.random()-0.5)*0.06).toFixed(4);
    const acc  = Math.min(96.8, 28 + ep*1.13 + (Math.random()-0.5)*0.4).toFixed(1);
    const ppl  = Math.exp(parseFloat(loss)).toFixed(2);
    const lrc  = (1e-4 * Math.max(0.1, 1 - ep/70)).toExponential(2);
    const col  = parseFloat(loss) < 1.2 ? C.green : C.yellow;
    line(`${d('Epoch ')}${or(String(ep).padStart(2,'0'))}${d('/60  loss=')}${span(col,loss)}${d('  acc=')}${span(col,acc+'%')}${d('  ppl=')}${span(col,ppl)}${d('  lr=')}${bl(lrc)}${d('  tput=')}${or(String(ri(840,980))+'K tok/s')}${d('  mem=')}${or(String(ri(74,79))+'GB/GPU')}${d('  step=')}${or(String(ep*312))}${d('  eta=')}${or(String(60-ep)+'ep')}`);
    if (ep%10===0) prog('epoch '+String(ep).padStart(2,'0')+'/60', ep/60);
  }
  line(`${d('[')}${gr(' OK ')}${d(']')} ${gr('checkpoint saved')}  ./ckpt/epoch_12_loss0.6214_acc94.7.pt  sha256=${mv(hex())}  size=49.2GB`);
  blank();

  // ── BLOCK 5: HTTP access log ─────────────────────────────
  cmd('~/evans', 'tail -f /var/log/evans/access.log | ts "[%Y-%m-%d %H:%M:%.S]" | grep -v healthz');
  const METHODS = ['GET','POST','PUT','DELETE','PATCH','OPTIONS','HEAD'];
  const ROUTES  = [
    '/api/v2/archive/scenes?limit=15&offset=0&sort=id&order=asc&include=meta,preview,stat',
    '/api/v2/archive/unlock?scene=S14&token='+hex()+'&audit=true&requester=viewer-'+ri(1000,9999),
    '/api/v2/memory/diff?from='+hex().slice(0,8)+'&to='+hex().slice(0,8)+'&format=unified&context=5',
    '/api/v2/memory/recall?query=first_encounter&limit=20&threshold=0.82&model=evans-embed-v3',
    '/api/v2/auth/verify?alg=EdDSA&iat='+(Math.floor(Date.now()/1000)-ri(10,300))+'&nbf=now&aud=viewer',
    '/api/v2/auth/refresh?grant=refresh_token&scope=archive.read+memory.read&ttl=3600',
    '/api/v2/stream/live?scene=S07&quality=high&codec=h265&fps=60&bitrate=8M&latency=low',
    '/api/v2/delta/push?batch=true&compress=zstd&seq='+ri(10000,99999)+'&ack='+ri(1000,9999),
    '/api/v2/user/'+hex()+'?fields=id,role,permissions,quota,last_seen&expand=settings',
    '/api/v2/search?q=evans+memory+trace&scope=archive&highlight=true&limit=10&offset=0',
    '/static/scene_s07.enc?v='+ri(100,999)+'&cdn=edge&range=bytes=0-'+ri(100000,999999),
    '/static/scene_s14.enc?v='+ri(100,999)+'&integrity=sha384-'+hex()+hex(),
    '/admin/export?format=ndjson&range=30d&compress=gzip&sign=true&dest=s3://evans-backup',
    '/internal/gc?force=true&target=old_gen&compact=true&snapshot=false&timeout=30s',
    '/api/v2/debug/trace?session='+hex()+'&level=verbose&format=otlp&include_spans=true',
  ];
  const CODES = [200,200,200,200,200,200,201,204,206,304,304,400,401,403,404,408,429,500,502,503];
  for (let i = 0; i < 80; i++) {
    const m    = METHODS[ri(0, METHODS.length)];
    const r    = ROUTES[ri(0, ROUTES.length)];
    const code = CODES[ri(0, CODES.length)];
    const cc   = code<300?C.green:code<400?C.cyan:code<500?C.yellow:C.red;
    const mc   = m==='GET'?C.blue:m==='POST'?C.green:m==='DELETE'?C.red:m==='OPTIONS'?C.dim:C.mauve;
    const ip   = ri(10,192)+'.'+ri(0,255)+'.'+ri(0,255)+'.'+ri(1,254);
    line(
      `${d(ts()+'  ')}${d(ip.padEnd(16)+'  ')}` +
      `<span style="color:${cc};display:inline-block;min-width:3ch">${code}</span>  ` +
      `<span style="color:${mc};display:inline-block;min-width:8ch">${m}</span>  ` +
      `<span style="color:${C.white}">${r.slice(0,88)}</span>  ` +
      `${or(rms())}  ${d('pid='+ri(1000,9999)+'  tid='+ri(10,99)+'  req_id='+hex().slice(0,12))}`,
      4
    );
  }
  blank();

  // ── BLOCK 6: memory / GC ─────────────────────────────────
  cmd('~/evans', 'evans-inspect --mem --gc-trace --heap-snapshot --flamegraph --alloc-profile --duration 30s');
  line(`  ${d('heap_used     ')}  ${or('48,214 MB')}  ${d('/')}  ${or('262,144 MB')}  ${ye('[18.4%]')}  ${d('rss=64,108MB  vsz=128,441MB  anon=52,210MB')}`);
  line(`  ${d('heap_total    ')}  ${or('262,144 MB')}  ${d('arena=32  bins=256  tcache_max=32KB  dirty=2,847MB  muzzy=1,241MB')}`);
  line(`  ${d('external      ')}  ${or('  3,124 MB')}  ${d('(wasm=1,820MB  arraybuf=842MB  external_str=312MB  shared_mem=150MB)')}`);
  line(`  ${d('v8_spaces     ')}  ${d('new=')}${or('256MB')}${d('  old=')}${or('44,712MB')}${d('  code=')}${or('812MB')}${d('  map=')}${or('124MB')}${d('  lo=')}${or('2,310MB')}`);
  line(`  ${d('gc_stats      ')}  ${d('minor_total=')}${or('8,821')}${d('  major_total=')}${or('204')}${d('  inc_total=')}${or('1,042')}${d('  total_pause=')}${or('4.21s')}`);
  for (let i=0; i<20; i++) {
    const freed = ri(4,480);
    const type = freed>200?'major':'minor';
    const col  = freed>200?C.yellow:C.green;
    line(`  ${d('GC '+type+'  #')}${mv(String(8821+i).padStart(5))}  ${d('freed=')}${span(col,String(freed).padStart(5)+' MB')}  ${d('pause=')}${or(rms())}  ${d('reason=allocation_failure  gen='+(type==='major'?'2':'0')+' trigger=size')}`);
  }
  line(`${d('[')}${ye('WARN')}${d(']')} ${ye('heap pressure HIGH (74.2%)  old_gen fragmentation=31.4%  initiating incremental compaction')}`);
  prog('incremental GC', 0.28);
  prog('incremental GC', 0.61);
  prog('incremental GC', 1.00);
  line(`${d('[')}${gr(' OK ')}${d(']')} ${d('compaction done  freed=')}${gr('12,481 MB')}  ${d('in ')}${or('847ms')}  ${d('fragmentation=4.2%  promotion_rate=1.2%')}`);
  blank();

  // ── BLOCK 7: crypto + openssl ─────────────────────────────
  cmd('~/evans', 'openssl dgst -sha512 -verify pub4096.pem -signature sig.bin archive.enc && openssl cms -verify -in archive.cms -CAfile ca-chain.pem -purpose any -no_check_time');
  line(`${d('Verified OK  ')}${gr('SHA-512 match')}  ${d('digest=')}${cy('SHA-512')}  ${d('hash=')}${mv(hex()+hex())}  ${d('salt=')}${mv(hex().slice(0,8))}`);
  line(`${d('RSA-4096  ')}${gr('VALID')}  ${d('issuer=evans-keyserver-01  serial=')}${mv(hex())}  ${d('ski=')}${mv(hex())}  ${d('aki=')}${mv(hex())}`);
  line(`${d('CMS verify ok  type=signedData  signer=')}${mv('evans-signing-key-2024')}  ${d('policy=EV  ct_log=Cloudflare_Nimbus_2024')}`);
  line(`${d('cert chain: [')}${gr('LEAF')}${d('] evans.internal → [')}${gr('ICA')}${d('] evans-ca-g3 → [')}${gr('ROOT')}${d('] evans-root-ca  depth=3  path_len=1')}`);
  line(`${d('validity: not_before=')}${or('2024-01-01T00:00:00Z')}  ${d('not_after=')}${or('2025-12-31T23:59:59Z')}  ${d('ocsp=good  crl=ok  ct_scts=3')}`);
  blank();

  // ── BLOCK 8: archive decrypt ──────────────────────────────
  sep();
  line(`${mv('[EVANS]')} ${w('archive.unlock(0xFF) — initiating full scene decryption sequence  caller=')}${mv(hex())}  ${d('ts=')}${or(ts())}`);
  line(`${mv('[EVANS]')} ${d('fetching encrypted index from keystore  addr=')}${mv(hex())}  ${d('hsmslot=3  tpm2_seal=verified  pcr7=ok')}`);
  prog('index decrypt', 0.15);
  prog('index decrypt', 0.52);
  prog('index decrypt', 1.00);
  line(`${mv('[EVANS]')} ${d('index ok  records=15  schema=v2  crc32=')}${mv(hex().slice(0,10))}  ${d('hmac=verified  size=40.2KB  loaded')}`);
  line(`${mv('[EVANS]')} ${d('decrypting scenes in parallel  workers=8  queue=15  algo=AES-256-GCM  kdf=HKDF-SHA512')}`);
  for (let i=1; i<=15; i++) {
    const id   = String(i).padStart(2,'0');
    const flag = i===15 ? re('RESTRICTED') : gr('OK     ');
    const size = ri(800,4200);
    line(`  ${d('scene S'+id+'  ')}${cy('AES-256-GCM')}  ${d('iv=')}${mv(hex().slice(0,16))}  ${d('tag=')}${mv(hex().slice(0,8))}  ${d('size=')}${or(String(size)+'KB')}  ${flag}  ${d('worker=')}${or(String(ri(0,8)))}`);
  }
  line(`${mv('[EVANS]')} ${gr('15/15 scenes decrypted successfully')}  ${d('total_size=40.2KB  elapsed=284ms  integrity=all-ok')}`);
  line(`${mv('[EVANS]')} ${ye('SECURITY NOTICE')}${d(': scene ')}${re('S15')}${d(' carries RESTRICTED classification  access event logged  audit_id=')}${mv(hex())}`);
  line(`${mv('[EVANS]')} ${d('flushing event to audit log  siem=splunk  soc_alert=low  retention=7yr  signed=')}${gr('yes')}`);
  line(`${mv('[EVANS]')} ${gr('viewer handoff ready')}  ${d('session_id=')}${mv(hex())}  ${d('perms=[archive.read,scene.view]  ttl=3600s')}`);
  sep();
  blank();


  // ── 滚动引擎（整行直插，无逐字，极速） ──────────────────
  let qi = 0;
  const LINE_H = 20;
  const MAX_LINES = Math.ceil((window.innerHeight || 900) / LINE_H) + 6;

  function flushLine(item) {
    const div = document.createElement('div');
    div.innerHTML = item.html;
    termInner.appendChild(div);
    while (termInner.children.length > MAX_LINES) {
      termInner.removeChild(termInner.firstChild);
    }
  }

  function runQueue() {
    if (qi >= QUEUE.length) return;
    flushLine(QUEUE[qi++]);
    setTimeout(runQueue, 15);
  }

  // 淡入 + 启动
  requestAnimationFrame(() => {
    term.style.opacity = '1';
    setTimeout(runQueue, 60);
  });

  // 总时长后淡出 → enterStage2
  const STREAM_DURATION = 10000;
  setTimeout(() => {
    term.style.transition = 'opacity 0.7s ease';
    term.style.opacity = '0';
    setTimeout(() => {
      term.remove();
      layer.style.display = 'none';
      enterStage2();
      resolve();
    }, 750);
  }, STREAM_DURATION);

  // stage1 + HUD 淡出
  const s1 = document.getElementById('stage1');
  s1.classList.add('fade-out');
  setTimeout(() => { s1.style.display = 'none'; }, 1200);
  ['hud-corners','hud-header','hud-footer','hud-card-1','hud-card-2','hud-card-3','hud-card-4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.style.transition='opacity 0.8s ease'; el.style.opacity='0'; }
  });
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
