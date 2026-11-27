# FDE 第一课 · 口播 + 动画合成 —— 源代码

成片页：https://evenna.github.io/evans-home/fde-talk/
在线实时预览（直接跑源码，不是视频）：https://evenna.github.io/evans-home/fde-talk/src/player.html
（空格键播放/暂停，拖进度条可以跳到任意时间；网址加 `?t=秒数` 能直接定位，比如 `player.html?t=42`）

## 这套东西是怎么做的

整条片子都是网页（HTML + CSS3D + JS）。引擎是「确定性」的：给它任意时间 t，画面都唯一确定。所以渲染时用 puppeteer 一帧一帧截图（25fps），再用 ffmpeg 合成 mp4。

| 文件 | 作用 |
|---|---|
| `engine.js` | 动画引擎：关键帧插值、缓动曲线、3D 相机（旋转统一阻尼到 25%）、转场、口播层（全屏/分屏/画中画/抠像）、字幕切句、颗粒与暗角 |
| `engine.css` | 视觉规范：配色、字体、玻璃卡、纸片、字幕样式 |
| `v3lib.js` | 从 3D 版（fde-3d）继承的 29 个动画镜头库 |
| `shots.js` | **本片分镜**：每一镜的时长、口播、版式（TALK/DEPTH/SPLIT/PIP/FULL）、每个元素的关键帧 |
| `stage.html` | 渲染用舞台（1920×1080），`?t=秒` 定位 |
| `player.html` | 浏览器里直接播放的预览器 |
| `frames.js` | 实拍素材序列帧的帧数表 |
| `render.js` | 逐帧截图渲染：`node render.js frames 0 10` … `node render.js frames 9 10`（10 路并行） |
| `qa.js` / `qa2.js` | 自动检查：字出安全区、字与字重叠 |
| `page.py` | 生成成片页（逐镜分镜表 + 缩略图） |
| `dl.py` / `ext.sh` / `clips.json` | 实拍素材下载（mixkit 免费素材，链接在 clips.json）和抽帧 |
| `talk/` | 口播占位截图 `f*.jpg` 与抠像 `cut*.png` |
| `seq/` | 本片用到的 19 段实拍素材序列帧（为控制仓库体积，这里压到 800px 宽；本地渲染用的是 1440px 原版） |
| `fonts/` `fx/` | Bebas / Anton / JetBrains Mono 字体，胶片颗粒贴图 |

## 本地跑起来

```bash
# 预览：任意静态服务器
python3 -m http.server 8000   # 打开 http://localhost:8000/player.html

# 渲染整片
npm i puppeteer
for i in $(seq 0 9); do node render.js frames $i 10 & done; wait
ffmpeg -framerate 25 -i frames/%05d.jpg -c:v libx264 -b:v 20M -pix_fmt yuv420p fde_talk.mp4
```

中文字体用的是系统里的「思源黑体 / Noto Sans CJK SC」，没装的话中文会退回系统默认字体。

## 换成真口播

把真口播视频抽帧放进 `talk/`（或在 `engine.js` 里把口播层的 `<img>` 换成 `<video>` 并按 t 设置 currentTime），`shots.js` 里每镜的版式与关键帧不用动。
