/* v3 · 3D motion engine — 确定性：任意 t 可 seek，逐帧截图渲染 */
(() => {
const FPS = 25;
const E = {
  lin: x => x,
  out: x => 1 - Math.pow(1 - x, 3),
  expo: x => x >= 1 ? 1 : 1 - Math.pow(2, -10 * x),
  in: x => x * x * x,
  io: x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
  qio: x => x < .5 ? 8 * x ** 4 : 1 - Math.pow(-2 * x + 2, 4) / 2,
  back: x => { const c = 1.35, d = c + 1; return 1 + d * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); },
  snap: x => x >= 1 ? 1 : 1 - Math.pow(2, -14 * x),
};
// 轨道： number | [[t, v, ease?], ...]
function ev(tr, t) {
  if (typeof tr === "number" || typeof tr === "string") return tr;
  if (t <= tr[0][0]) return tr[0][1];
  for (let i = 1; i < tr.length; i++) {
    const [t1, v1, e = "expo"] = tr[i];
    if (t <= t1) {
      const [t0, v0] = tr[i - 1];
      const p = t1 === t0 ? 1 : (t - t0) / (t1 - t0);
      return v0 + (v1 - v0) * E[e](p);
    }
  }
  return tr[tr.length - 1][1];
}
// 确定性噪声（镜头抖动/呼吸）
function noise(t, seed = 1) {
  return Math.sin(t * 13.1 + seed * 7.3) * .5 + Math.sin(t * 29.7 + seed * 3.1) * .3 + Math.sin(t * 5.3 + seed) * .2;
}

const SHOTS = [];
window.shot = (o) => SHOTS.push(o);

let stage, persp, world, bworld, scene, cur = -1, ctx = null;
const TK = {};
const hud = {};

function mkCtx(el) {
  const c = { nodes: [], fns: [], cam: {}, shakes: [], flashes: [], leaks: [], imgs: [], tk: null, B: bworld };
  // 3D 节点：居中锚点
  c.add = (html, k = {}, parent = null, opt = {}) => {
    const d = document.createElement("div");
    d.className = "n " + (opt.cls || "");
    if (opt.style) d.style.cssText += opt.style;
    d.innerHTML = html;
    (parent || world).appendChild(d);
    c.nodes.push({ el: d, k, center: opt.center !== false });
    return d;
  };
  c.group = (k = {}, parent = null) => c.add("", k, parent);
  // 图像序列做的「视频面板」
  c.vid = (key, w, h, k = {}, opt = {}) => {
    const n = window.SEQ[key];
    if (!n) throw new Error("no seq " + key);
    const d = c.add(`<img class="vid" draggable="false">`, k, opt.parent, { cls: "panel " + (opt.cls || ""), style: `width:${w}px;height:${h}px;${opt.style || ""}` });
    const img = d.firstChild;
    if (opt.filter) img.style.filter = opt.filter;
    const off = opt.off || 0, rate = opt.rate == null ? 1 : opt.rate, still = opt.still;
    c.imgs.push({ img, f: t => {
      let i = still != null ? still : Math.floor((off + t * rate) * FPS);
      i = ((i % n) + n) % n;
      return `seq/${key}/${String(i + 1).padStart(3, "0")}.jpg`;
    } });
    return d;
  };
  // 文本
  c.text = (s, size, k = {}, opt = {}) => {
    const font = opt.font || "cn";
    const html = fmt(s);
    if (opt.extrude) {
      const g = c.add("", k, opt.parent);
      const N = opt.extrude, depth = opt.depth || 2.2;
      for (let i = N; i >= 1; i--) {
        const sh = 0.16 + 0.34 * (1 - i / N);
        c.add(`<div class="${font}" style="font-size:${size}px;color:rgb(${(40 + 60 * sh) | 0},${(38 + 52 * sh) | 0},${(36 + 44 * sh) | 0})">${html}</div>`,
          { z: -i * depth }, g);
      }
      c.add(`<div class="${font} ${opt.cls || ""}" style="font-size:${size}px;${opt.color ? "color:" + opt.color : ""}">${html}</div>`, {}, g);
      return g;
    }
    return c.add(`<div class="${font} ${opt.cls || ""}" style="font-size:${size}px;${opt.color ? "color:" + opt.color : ""};${opt.css || ""}">${html}</div>`, k, opt.parent);
  };
  // 逐字 3D 翻入
  c.chars = (s, size, x, y, t0, opt = {}) => {
    const font = opt.font || "cn";
    const g = c.add(`<div class="${font}" style="font-size:${size}px;${opt.css || ""}"></div>`, { x, y, z: opt.z || 0, rx: opt.rx || 0, ry: opt.ry || 0, o: opt.o == null ? 1 : opt.o }, opt.parent, { center: opt.center !== false });
    const box = g.firstChild;
    const st = opt.stagger == null ? .035 : opt.stagger, dur = opt.dur || .6, mode = opt.mode || "flip";
    let i = 0;
    for (const [ch, cls] of tokens(s)) {
      const sp = document.createElement("span");
      sp.className = "word " + cls; sp.textContent = ch;
      if (ch === " ") sp.style.width = ".28em";
      box.appendChild(sp);
      const a = t0 + i * st, b = a + dur;
      let k;
      if (mode === "flip") k = { y: [[a, size * .55], [b, 0]], rx: [[a, -95], [b, 0]], o: [[a, 0], [a + dur * .35, 1, "out"]] };
      else if (mode === "z") k = { z: [[a, 900], [b, 0]], o: [[a, 0], [a + dur * .3, 1, "out"]], blur: [[a, 18], [b, 0]] };
      else if (mode === "up") k = { y: [[a, size * .9], [b, 0]], o: [[a, 0], [a + dur * .4, 1, "out"]] };
      else if (mode === "slam") k = { s: [[a, 2.6], [a + .32, 1, "snap"]], o: [[a, 0], [a + .06, 1, "lin"]], blur: [[a, 10], [a + .2, 0]] };
      else k = { y: [[a, -size * .5], [b, 0]], ry: [[a, 90], [b, 0]], o: [[a, 0], [a + dur * .3, 1, "out"]] };
      if (opt.out != null) {
        const oa = opt.out + i * (opt.outStagger ?? .015);
        k.o = [...k.o, [oa, 1], [oa + .25, 0, "in"]];
        k.y = [...(k.y || [[0, 0]]), [oa, 0], [oa + .3, -size * .6, "in"]];
      }
      c.nodes.push({ el: sp, k, center: false });
      i++;
    }
    return g;
  };
  c.camera = (k) => { c.cam = k; };
  // 口播层：k = {x,y,w,h,r,z,ix,iy,o} 轨道；opt.img = 0/2/4
  c.talk = (k, opt = {}) => { c.tk = { k, img: opt.img ?? 0, border: !!opt.border, top: !!opt.top }; };
  c.shake = (t0, dur = .35, amp = 14) => c.shakes.push([t0, dur, amp]);
  c.flash = (t0, a = .7, dur = .22) => c.flashes.push([t0, a, dur]);
  c.leak = (t0, t1, color = "229,103,63") => c.leaks.push([t0, t1, color]);
  c.on = (f) => c.fns.push(f);
  return c;
}
// *x* → coral；_x_ → 高亮块；~x~ → cool
function tokens(s) {
  const out = []; let cls = "";
  for (const ch of [...s]) {
    if (ch === "*") { cls = cls === "co" ? "" : "co"; continue; }
    if (ch === "_") { cls = cls === "hl" ? "" : "hl"; continue; }
    if (ch === "~") { cls = cls === "cl" ? "" : "cl"; continue; }
    out.push([ch, cls]);
  }
  return out;
}
function fmt(s) {
  return s.replace(/\*([^*]+)\*/g, '<span class="co">$1</span>')
          .replace(/_([^_]+)_/g, '<span class="hl">$1</span>')
          .replace(/~([^~]+)~/g, '<span class="cl">$1</span>')
          .replace(/\n/g, "<br>");
}

function apply(n, t) {
  const k = n.k, g = (p, d) => k[p] == null ? d : ev(k[p], t);
  const x = g("x", 0), y = g("y", 0), z = g("z", 0), rx = g("rx", 0), ry = g("ry", 0), rz = g("rz", 0),
    s = g("s", 1), sx = g("sx", 1), sy = g("sy", 1), o = g("o", 1), bl = g("blur", 0);
  n.el.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale3d(${s * sx},${s * sy},1)` + (n.center ? " translate(-50%,-50%)" : "");
  n.el.style.opacity = o;
  if (k.blur != null) n.el.style.filter = bl > .05 ? `blur(${bl}px)` : "none";
  if (k.w != null) n.el.style.width = g("w", 0) + "px";
  if (k.clip != null) n.el.style.clipPath = `inset(0 ${100 - g("clip", 100)}% 0 0)`;
}

function mount(i) {
  world.innerHTML = ""; bworld.innerHTML = "";
    ctx = mkCtx(world);
  SHOTS[i].build(ctx);
  stage.style.background = SHOTS[i].bgc || "";
  const tk = ctx.tk;
  TK.plate.style.display = TK.cut.style.display = tk ? "block" : "none";
  if (tk) {
    TK.pi.src = `talk/f${tk.img}.jpg`; TK.ci.src = `talk/cut${tk.img}.png`;
    TK.plate.classList.toggle("bd", tk.border);
  }
  cur = i;
  hud.ch.textContent = SHOTS[i].ch || "";
  const vo = SHOTS[i].vo || ""; hud.sub.textContent = vo.startsWith("（") ? "" : vo; hud.sub.style.display = vo.startsWith("（") || SHOTS[i].nosub || window.NOSUB ? "none" : "block";
  hud.ch.dataset.l = hud.id.dataset.l = SHOTS[i].mode || "";
  hud.id.textContent = `${SHOTS[i].mode || ""} · ${String(i + 1).padStart(2, "0")} / ${SHOTS.length}`;
}

const T0 = [];
function layout() { let a = 0; SHOTS.forEach(s => { T0.push(a); a += s.dur; }); window.__total = a; }

window.__seek = (T) => {
  let i = 0;
  while (i < SHOTS.length - 1 && T >= T0[i + 1]) i++;
  if (i !== cur) mount(i);
  const sh = SHOTS[i], t = T - T0[i], d = sh.dur;
  for (const n of ctx.nodes) apply(n, t);
  for (const im of ctx.imgs) { const src = im.f(t); if (im.img.getAttribute("src") !== src) im.img.setAttribute("src", src); }
  for (const f of ctx.fns) f(t);
  if (ctx.tk) {
    const K = ctx.tk.k, q = (p, dv) => K[p] == null ? dv : ev(K[p], t);
    const x = q("x", 0), y = q("y", 0), w = q("w", 1920), h = q("h", 1080), r = q("r", 0), z = q("z", 1), o = q("o", 1), po = q("po", 1), co = q("co", 0);
    const fx = q("fx", 960), fy = q("fy", 540), px = q("px", w / 2), py = q("py", h / 2);
    const sc = Math.max(w / 1920, h / 1080) * z, IW = 1920 * sc, IH = 1080 * sc;
    let L = px - fx * sc, Tp = py - fy * sc;
    if (po > .02) { L = Math.min(0, Math.max(w - IW, L)); Tp = Math.min(0, Math.max(h - IH, Tp)); }
    for (const [box, im, a] of [[TK.plate, TK.pi, po], [TK.cut, TK.ci, co]]) {
      box.style.cssText = `display:block;left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${r}px;opacity:${o * a};${ctx.tk.top ? "z-index:6;" : ""}`;
      im.style.cssText = `left:${L}px;top:${Tp}px;width:${IW}px;height:${IH}px`;
    }
    const dm = q("dim", 0); TK.pi.style.filter = dm > .01 ? `brightness(${1 - dm * .62}) saturate(${1 - dm * .5}) blur(${dm * 5}px)` : "none";
  }
  // 相机
  const C = ctx.cam, g = (p, dv = 0) => C[p] == null ? dv : ev(C[p], t);
  let cx = g("x"), cy = g("y"), cz = g("z"), crx = g("rx"), cry = g("ry"), crz = g("rz");
  const k3 = sh.k3 ?? .25, kz = sh.kz ?? .6; crx *= k3; cry *= k3; crz *= k3; cz *= kz;
  // 手持呼吸
  const br = sh.breathe == null ? 0 : sh.breathe;
  cx += noise(T * .35, 2) * 6 * br; cy += noise(T * .3, 5) * 4 * br; crz += noise(T * .2, 9) * .25 * br;
  for (const [a, du, amp] of ctx.shakes) if (t >= a && t < a + du) {
    const p = 1 - (t - a) / du; cx += noise(t * 9, 3) * amp * p; cy += noise(t * 9, 7) * amp * p; crz += noise(t * 9, 1) * amp * .06 * p;
  }
  // 转场（v4 克制版）：cut / fade / slide / push(轻)
  let blur = 0, fade = 1;
  const tin = sh.tin || "cut", tout = sh.tout || "cut", TD = .22;
  if (t < TD && i > 0) {
    const p = 1 - E.expo(t / TD);
    if (tin === "slide") { cx -= p * 140 * (sh.dir || 1); blur = Math.max(blur, p * 8); fade = Math.min(fade, 1 - p * .6); }
    if (tin === "push") { cz -= p * 240; blur = Math.max(blur, p * 6); fade = Math.min(fade, 1 - p * .5); }
    if (tin === "fade") fade = Math.min(fade, 1 - p);
  }
  if (t > d - .12 && i < SHOTS.length - 1) {
    const p = E.in((t - (d - .12)) / .12);
    if (tout === "slide") { cx += p * 140 * ((SHOTS[i + 1].dir) || 1); blur = Math.max(blur, p * 8); }
    if (tout === "fade") fade = Math.min(fade, 1 - p);
  }
  if (sh.end && t > d - sh.end) fade = Math.min(fade, 1 - (t - (d - sh.end)) / sh.end);
  scene.style.opacity = fade; hud.sub.style.opacity = fade;
  const WS = sh.ws || {}, wpre = `translate3d(${WS.x || 0}px,${WS.y || 0}px,0) scale(${WS.s || 1}) `;
  bworld.style.transform = world.style.transform = wpre + `translateZ(${cz}px) rotateX(${-crx}deg) rotateY(${-cry}deg) rotateZ(${-crz}deg) translate3d(${-cx}px,${-cy}px,0)`;
  scene.style.filter = blur > .4 ? `blur(${blur.toFixed(1)}px)` : "none";
  // 闪白 / 光晕
  let fl = 0; for (const [a, amp, du] of ctx.flashes) if (t >= a && t < a + du) fl = Math.max(fl, amp * (1 - (t - a) / du));
  hud.flash.style.opacity = fl;
  let lk = 0, lc = "229,103,63";
  for (const [a, b, col] of ctx.leaks) if (t >= a && t <= b) { lk = Math.sin(Math.PI * (t - a) / (b - a)); lc = col; }
  hud.leak.style.opacity = lk * .55;
  hud.leak.style.background = `radial-gradient(circle at ${30 + 40 * ((t / d))}% ${40 + 10 * noise(t, 4)}%, rgba(${lc},.9), rgba(${lc},0) 46%)`;
  hud.grain.style.backgroundImage = `url(fx/grain${Math.floor(T * FPS) % 6}.png)`;
  const s = Math.floor(T), f = Math.floor((T - s) * FPS);
  hud.tc.textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
};

window.__ready = async () => {
  if (!ctx) return;
  const all = [...ctx.imgs]; if (ctx.tk) all.push({ img: TK.pi }, { img: TK.ci });
  await Promise.all(all.map(o => o.img.complete && o.img.naturalWidth ? 0 : new Promise(r => { o.img.onload = o.img.onerror = r; })));
  await document.fonts.ready;
};

window.__init = () => {
  stage = document.getElementById("stage");
  stage.innerHTML = `<div class="scene"><div class="talk plate"><img></div><div class="persp pb"><div class="world" id="bw"></div></div><div class="talk cut"><img></div><div class="persp pf"><div class="world" id="fw"></div></div></div>
    <div class="sub" id="h_sub"></div>
    <div class="post leak"></div><div class="post grain"></div><div class="post vign"></div><div class="post flash"></div>
    <div class="hud mono" id="h_ch"></div><div class="hud2 mono" id="h_id"></div><div class="tc mono" id="h_tc"></div>`;
  persp = stage.querySelector(".pf"); world = stage.querySelector("#fw"); bworld = stage.querySelector("#bw"); scene = stage.querySelector(".scene");
  TK.plate = stage.querySelector(".plate"); TK.cut = stage.querySelector(".cut"); TK.pi = TK.plate.firstChild; TK.ci = TK.cut.firstChild; hud.sub = stage.querySelector("#h_sub");
  hud.flash = stage.querySelector(".flash"); hud.leak = stage.querySelector(".leak"); hud.grain = stage.querySelector(".grain");
  hud.ch = stage.querySelector("#h_ch"); hud.id = stage.querySelector("#h_id"); hud.tc = stage.querySelector("#h_tc");
  layout();
  window.__shots = SHOTS.map((s, i) => ({ i, t0: T0[i], dur: s.dur, vo: s.vo || "", ch: s.ch || "", mode: s.mode || "", D: s.D || [] }));
};
window.E = E; window.ev = ev; window.noise = noise;
})();
