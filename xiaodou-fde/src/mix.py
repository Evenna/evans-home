# 小豆 v6 混音：BGM（mixkit Deep Urban）按分镜段落自动化 + SFX 按 c.sfx 打点 → audio/mix.wav
# 电平为「留给口播」的设计：BGM 约 -22 dBFS RMS，SFX 峰值约 -12 dBFS；接入真口播时整体 BGM 再压 4dB 即可
import json, subprocess, numpy as np
FF = "/root/yiwen/.venv/lib/python3.13/site-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v9.0.2"
SR = 48000
def load(f):
    raw = subprocess.run([FF, "-v", "error", "-i", f, "-f", "f32le", "-ac", "2", "-ar", str(SR), "-"], capture_output=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2).copy()
db = lambda x: 10 ** (x / 20)
S = json.load(open("shots.json")); TOT = S[-1]["t0"] + S[-1]["dur"]; N = int(TOT * SR) + SR
# ---------- BGM ----------
bgm = load("audio/raw/m623.mp3")
if len(bgm) < N: bgm = np.concatenate([bgm] * (N // len(bgm) + 1))
bgm = bgm[:N]; bgm /= (np.sqrt((bgm ** 2).mean()) + 1e-9)          # 归一到 RMS=1
g = np.full(N, db(-22.0), np.float32)
def seg(a, b, v):
    g[int(a * SR):int(b * SR)] = db(v) if v is not None else 0
SH = {s["i"] + 1: s for s in S}
t = lambda i, o=0: SH[i]["t0"] + o
seg(0, t(2), -26)                       # 冷开场低铺
seg(t(2), t(5, 1.5), None)              # 全停
seg(t(8, 3.2), t(8, 3.9), None)         # 留白 1s
seg(t(12, 2.2), t(14), -26)             # 锁屏后压低
seg(t(14), t(16), -20)
seg(t(16), t(17), -27)
seg(t(25), t(26), None)                 # 全停
seg(t(33), t(34), -28)
seg(t(39), t(40), None)
seg(t(40), t(41), -28)
seg(t(41, 3.0), t(42), None)
seg(t(43), t(44), None)
seg(t(47), t(48), -25)
seg(t(48), TOT, -20)
# 平滑包络（0.35s），首尾淡入淡出
k = int(.35 * SR); ker = np.ones(k, np.float32) / k
g = np.convolve(g, ker, "same")
g[:int(1.5 * SR)] *= np.linspace(0, 1, int(1.5 * SR))
fo = int(2.5 * SR); end = int(TOT * SR); g[end - fo:end] *= np.linspace(1, 0, fo); g[end:] = 0
out = bgm * g[:, None]
# ---------- SFX ----------
MAP = {"tick": "s1125", "轻点": "s2568", "盖章": "s2182", "卡入": "s2857", "咔哒": "s1120", "提示音": "s2354", "骰子": "s1120",
       "木头": "s2182", "杂音": "s2595", "错误音": "s946", "ding": "s2867", "闷鼓": "s2299", "轻碰": "s2568", "撕裂": "s2946", "glitch": "s2946",
       "锁屏咔哒": "s2859", "纸张": "s166", "数据面板": "s166", "铃": "s933", "马克笔": "s1464", "拨号音": "s333", "成功音": "s2870", "落地": "s2300",
       "闷响": "s2303", "buzz": "s1031", "钥匙滑动": "s166", "闷扣": "s2299", "锁扣": "s2852", "开关": "s2585"}
VOL = {"s2303": -9, "s2299": -10, "s2300": -10, "s2946": -14, "s946": -16, "s933": -16, "s2870": -14, "s2867": -14}
cache = {}
def sfx(key, at, vol=None, rate=1.0):
    if key not in cache:
        a = load(f"audio/raw/{key}.mp3"); a /= (np.abs(a).max() + 1e-9); cache[key] = a
    a = cache[key]
    if rate != 1.0:                       # 简单变调（逐级升高的连续音效）
        idx = np.arange(0, len(a) - 1, rate); a = a[idx.astype(int)]
    a = a[:int(2.5 * SR)]
    if len(a) > SR: a = a * np.r_[np.ones(len(a) - int(.3 * SR)), np.linspace(1, 0, int(.3 * SR))][:, None]
    i = int(at * SR); j = min(N, i + len(a)); out[i:j] += a[:j - i] * db(vol if vol is not None else VOL.get(key, -12))
log = []
for s in S:
    seen = {}
    for at, name in s["U"]["sfx"]:
        key = next((v for k, v in MAP.items() if k in name), None)
        if not key: continue
        n = seen.get(name, 0); seen[name] = n + 1
        rate = 2 ** (n / 12) if name in ("开关", "提示音", "轻点", "tick") else 1.0
        if name == "tick 串":
            for r in range(8): sfx("s1125", s["t0"] + at + r * .07, -14, 2 ** (r / 12))
        else: sfx(key, s["t0"] + at, rate=rate)
        log.append(f'{s["i"]+1:02d}\t{s["t0"]+at:7.2f}s\t{name}\t{key}')
    if s["tin"] not in ("cut",) and s["i"] > 0:        # 非硬切转场：一声轻 swoosh
        sfx("s1464", s["t0"] - .12, -22); log.append(f'{s["i"]+1:02d}\t{s["t0"]-.12:7.2f}s\t转场 swoosh\ts1464')
# 软限幅 + 归一
out = np.tanh(out * 1.1) / np.tanh(1.1)
out *= db(-1.0) / (np.abs(out).max() + 1e-9)
out = out[:end]
subprocess.run([FF, "-y", "-v", "error", "-f", "f32le", "-ac", "2", "-ar", str(SR), "-i", "-", "audio/mix.wav"], input=out.astype(np.float32).tobytes())
open("audio/cue.tsv", "w").write("镜\t时间\t分镜音效\t文件\n" + "\n".join(log))
print("mix ok", len(log), "cues", TOT, "s")
